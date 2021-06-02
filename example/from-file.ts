import * as fs from 'fs';
import { PageExecutor } from '../src';

const file = fs.readFileSync('./links.txt', { encoding: 'utf8' });
const links = file.split('\n').filter(Boolean);

const executor = new PageExecutor(({ document, location }) => `${document.title} - ${location.href}`);

executor
  .perPage(links)
  .then((titles) => console.log(titles));
