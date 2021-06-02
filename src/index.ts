import axios from 'axios';
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
  ): Promise<D[]> {
    if (!predicate) {
      throw new Error('No callback passed to PageExecutor. Pass it to constructor or to a method directly.');
    }

    const linksArray = Array.isArray(links)
      ? links
      : [links];

    const pagePromises: Promise<string>[] = linksArray.map((link) => axios
      .get(link)
      .then((res) => res.data));

    return Promise.all(pagePromises).then((pages) => pages
      .map((page, linkIndex) => {
        const { window } = new JSDOM(page, { url: linksArray[linkIndex] });
        const { document, location } = window;

        return predicate({ window, document, location });
      }));
  }
}
