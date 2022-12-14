# Contributing Guide

## Add new section

```
## TITLE

Short Description

```js
// Example Code
```

## Tests

[test.mjs](https://github.com/azu/url-cheatsheet/blob/main/test.mjs) execute each example and check the results.

You can use `express; => "result"` or `console.log(express); => "result"` syntax for testing.

Example:

```js
const a = 1;
console.log(a); // => 1
```

It will be transformed into next.

```js
const a = 1;
assert.strictEqual(a, 1);
```
