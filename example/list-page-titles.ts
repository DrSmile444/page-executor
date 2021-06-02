import { PageExecutor } from '../src';

const executor = new PageExecutor(({ document }) => document.title);

const pageLinks = [
  'https://smile-track.web.app',
  'https://npmjs.com',
  'https://www.youtube.com/watch?v=9d4ui9q7eDM',
];

executor
  .perPage(pageLinks)
  .then((titles) => console.log(titles));

// Result is:
//
// [
//   'Smile Track - Best Way to Track Tickets!',
//   'npm',
//   'Megadeth - Holy Wars...The Punishment Due - YouTube'
// ]
