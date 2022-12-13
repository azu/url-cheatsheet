# url-cheatsheet

URL manipulation cheatsheet for JavaScript.

## DO NOT

Please DO NOT concat url and parameters as string.

```js
// THIS EXAMPLE IS UNSAGE
const query = "<user input>"
const url = `https://example.com?q=${query}`;
```

This example does not consider that `query` includes `&` or `?` that is required to escape.
Basically, you should not concat url as string.

## Base URL + Path 

Use [`new URL(pathname, base)`](https://developer.mozilla.org/docs/Web/API/URL/URL)).

```js
const base = "https://example.com";
const pathname = "/path/to/page";
const result = new URL(pathname, base);
console.log(result.toString()); // https://example.com/path/to/page
```

## Add parameters to URL

Use [URLSearchParams](https://developer.mozilla.org/docs/Web/API/URLSearchParams)

```js
const q = "query";
const page = 1;
const base = "https://example.com";
const url = new URL(base);
const params = new URLSearchParams({
    q,
    page
});
console.log(url + "?" + params); // https://example.com/?q=query&page=1
```

or 

```js
const q = "query";
const page = 1;
const base = "https://example.com";
const url = new URL(base);
url.search new URLSearchParams({
    q,
    page
});
console.log(url.toString()); // https://example.com/?q=query&page=1
```