# Contributing Guide

## Add new section

Fill next template and Submit PR!

    ## TITLE

    Short Description

    ```js
    // Example Code
    ```

## Tests

[test.mjs](https://github.com/azu/url-cheatsheet/blob/main/test.mjs) execute each examples and check the results.

You can use `expression; => "result"` or `console.log(expression); => "result"` syntax for testing.

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
