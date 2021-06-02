import axios from 'axios';
import { DOMWindow, JSDOM } from 'jsdom';

export interface ExecutorOptions {
    window: DOMWindow;
    document: Document;
    location: Location;
}

export type ExecutorCallback<T> = (options: ExecutorOptions) => T;

export class PageExecutor<T> {
  private callback: ExecutorCallback<T> | undefined;

  constructor(callback?: ExecutorCallback<T>) {
    this.callback = callback;
  }

  /**
   * Execute passed callback for each page
   */
  perPage(
    links: string | string[],
    callback: ExecutorCallback<T> | undefined = this.callback,
  ): Promise<T[]> {
    if (!callback) {
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

        return callback({ window, document, location });
      }));
  }
}
