import axios, { AxiosError } from 'axios';
import { DOMWindow, JSDOM } from 'jsdom';

export interface ExecutorOptions {
  window: DOMWindow;
  document: Document;
  location: Location;
}

export type ExecutorPredicate<T> = (options: ExecutorOptions) => T;

export class PageExecutor<T> {
  private predicate: ExecutorPredicate<T | any> | undefined;

  constructor(predicate?: ExecutorPredicate<T>) {
    this.predicate = predicate;
  }

  /**
   * Execute passed callback for each page
   */
  perPage<D extends any = T>(
    links: string | string[],
    predicate: ExecutorPredicate<D> | undefined = this.predicate,
  ): Promise<(D | null)[]> {
    if (!predicate) {
      throw new Error('No callback passed to PageExecutor. Pass it to constructor or to a method directly.');
    }

    const linksArray = Array.isArray(links)
      ? links
      : [links];

    const pagePromises: Promise<string>[] = linksArray.map((link) => axios
      .get(link, {
        headers: {
          'Content-Type': 'text/html; charset=UTF-8',
        },
        responseType: 'text',
      })
      .then((res) => res.data)
      .catch((error: AxiosError) => '<title>Invalid URL</title>'));

    return Promise.all(pagePromises).then((pages) => pages
      .map((page, linkIndex) => new JSDOM(page, { url: linksArray[linkIndex] }))
      .map((dom) => {
        if (!dom) {
          return null;
        }

        const { window } = dom;
        const { document, location } = window;

        return predicate({ window, document, location });
      }));
  }
}
