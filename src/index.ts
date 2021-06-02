import axios from 'axios';
import { DOMWindow, JSDOM } from 'jsdom';

export interface ExecutorOptions {
    window: DOMWindow;
    document: Document;
    location: Location;
}

export type ExecutorPredicate<T> = (options: ExecutorOptions) => T;

export class PageExecutor<T> {
  private predicate: ExecutorPredicate<T> | undefined;

  constructor(predicate?: ExecutorPredicate<T>) {
    this.predicate = predicate;
  }

  /**
   * Execute passed callback for each page
   */
  perPage(
    links: string | string[],
    predicate: ExecutorPredicate<T> | undefined = this.predicate,
  ): Promise<T[]> {
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
      .map((page, linkIndex) => new JSDOM(page, { url: links[linkIndex] }))
      .map(({ window }) => {
        const { document } = window;
        const { location } = window;

        return predicate({ window, document, location });
      }));
  }
}
