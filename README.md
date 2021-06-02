# page-executor

[comment]: <> ([![npm version]&#40;https://img.shields.io/npm/v/page-executor.svg?style=flat-square&#41;]&#40;https://www.npmjs.org/package/page-executor&#41;)
[comment]: <> ([![install size]&#40;https://packagephobia.now.sh/badge?p=page-executor&#41;]&#40;https://packagephobia.now.sh/result?p=page-executor&#41;)
[comment]: <> ([![npm downloads]&#40;https://img.shields.io/npm/dm/page-executor.svg?style=flat-square&#41;]&#40;http://npm-stat.com/charts.html?package=page-executor&#41;)

Promise based pages code executor for Node.js 
## Table of Contents

  - [Features](#features)
  - [Installing](#installing)
  - [Example](#example)
  - [TypeScript](#typescript)
  - [License](#license)

## Features

- Emulates full DOM tree and gives access to elements 

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
  const rootElement = document.querySelector('#appMountPoint, #app-mount');
  return rootElement && rootElement.innerText || 'No root element';
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

pageExecutor
  .perPage('https://www.paypal.com', ({ document }) => document.querySelector('[aria-label="Get Started"]'))
  .then((labelNode) => console.log(labelNode));
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
