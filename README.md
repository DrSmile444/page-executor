# page-executor

[comment]: <> ([![npm version]&#40;https://img.shields.io/npm/v/page-executor.svg?style=flat-square&#41;]&#40;https://www.npmjs.org/package/page-executor&#41;)
[comment]: <> ([![install size]&#40;https://packagephobia.now.sh/badge?p=page-executor&#41;]&#40;https://packagephobia.now.sh/result?p=page-executor&#41;)
[comment]: <> ([![npm downloads]&#40;https://img.shields.io/npm/dm/page-executor.svg?style=flat-square&#41;]&#40;http://npm-stat.com/charts.html?package=page-executor&#41;)

Promise based pages code executor for Node.js 
## Table of Contents

  - [Why](#why)
  - [Features](#features)
  - [Installing](#installing)
  - [Example](#example)
  - [TypeScript](#typescript)
  - [License](#license)

## Why

Imagine you need to run one script across multiple sites (e.g., scrape data). You open site by site, wait until the content is loaded, and execute your script.

It could work unless you have 20+ sites. To solve this problem, you can use this package and run multiple sites immediately to save your time. 

## Features

- [x] Emulates full DOM tree and gives access to elements
- [ ] Add puppeteer to create screenshots and etc

## Installing

Using npm:

```bash
$ npm install page-executor
```

## Example

Create an instance:

```js
const { PageExecutor } = require('page-executor');

// Create a default instance
const pageExecutor = new PageExecutor();
// or create with default predicate
const pageExecutor = new PageExecutor(({ document }) => {
  const rootElement = document.querySelector('button');
  return (rootElement && rootElement.innerHTML) || 'No element';
});
```

Get single link:

```js
// Use with one link
pageExecutor
  .perPage('https://smile-track.web.app')
  .then((nodeTexts) => console.log(nodeTexts));
```

Or get multiple links:

```js
const pageLinks = [
  'https://smile-track.web.app',
  'https://discord.com',
  'https://www.netflix.com/',
];

pageExecutor
  .perPage(pageLinks)
  .then((nodeTexts) => console.log(nodeTexts));
```

Pass custom predicate for each call:

```js
pageExecutor
  .perPage('https://smile-track.web.app', ({ document }) => document.title)
  .then((title) => console.log(title));

executor
  .perPage('https://developer.mozilla.org', ({ document }) => document.querySelector('#skip-main').innerHTML)
  .then((label) => console.log(label));
```

## TypeScript
page-executor includes [TypeScript](http://typescriptlang.org) definitions.
```typescript
import { PageExecutor } from 'page-executor';
const pageExecutor = new PageExecutor();
```

## License

[MIT](LICENSE)

Created with ❤ by Dmytro Vakulenko, 2021.
