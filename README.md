# url-cheatsheet

URL manipulation cheatsheet for JavaScript.

## DO NOT: concat url and user input without escape

Please DO NOT concat url and user input without escape

```js
// DO NOT
const name = "<user input>"
const url = `https://example.com/user/${name}`;
console.log(url); // => "https://example.com/user/<user input>"
```

This code may have directory traversal vulnerbility.
You should escape the `name` by `encodeURIComponent`.

```js
// DO
const name = "<user input>"
const url = `https://example.com/user/${encodeURIComponent(name)}`;
console.log(url); // => "https://example.com/user/%3Cuser%20input%3E"
```

## DO NOT: concat parameter and user input without escape

Please DO NOT concat parameter and user input without escape

```js
// DO NOT
const query = "<user input>"
const url = `https://example.com?q=${query}`;
console.log(url); // => "https://example.com?q=<user input>"
```

This example does not consider that `query` includes `&` or `?` that is required to escape.
You should escape the `query` by `encodeURIComponent`.

```js
// DO
const query = "<user input>"
const url = `https://example.com?q=${encodeURIComponent(query)}`;
console.log(url); // => "https://example.com?q=%3Cuser%20input%3E"
```

Or, You can use [URLSearchParams()](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams) that escape each parameters automatically.

- Related: [Client-side HTTP parameter pollution (reflected) - PortSwigger](https://portswigger.net/kb/issues/00501400_client-side-http-parameter-pollution-reflected)

## Base URL + Path 

Use [`new URL(pathname, base)`](https://developer.mozilla.org/docs/Web/API/URL/URL).

- keywords: url-join, join path

```js
const base = "https://example.com";
const pathname = "/path/to/page";
const result = new URL(pathname, base);
console.log(result.toString()); // => "https://example.com/path/to/page"
```

If the pathname include user input, you should escape it by `encodeURIComponent`.

```js
const base = "https://example.com/";
const name = "<user input>"
const result = new URL(`/user/${encodeURIComponent(name)}`, base);
console.log(result.toString()); // => "https://example.com/user/%3Cuser%20input%3E"
```

## Get parameter from URL

Use [`URL`](https://developer.mozilla.org/docs/Web/API/URL/URL) and [URLSearchParams#get](https://developer.mozilla.org/docs/Web/API/URLSearchParams/get)

```js
const inputURL = "https://example.com/?q=query&page=1";
const url = new URL(inputURL);
const q = url.searchParams.get("q");
console.log(q); // => "query"
```

## Get multiple parameters as array from URL

Use [`URL`](https://developer.mozilla.org/docs/Web/API/URL/URL) and [URLSearchParams#getAll](https://developer.mozilla.org/docs/Web/API/URLSearchParams/getAll)

```js
const inputURL = "https://example.com/?q=query&lang=en_US&lang=ja_JP";
const url = new URL(inputURL);
const langs = url.searchParams.getAll("lang");
console.log(langs); // ["en_US", "ja_JP"]
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
console.log(url + "?" + params); // => "https://example.com/?q=query&page=1"
```

or 

```js
const q = "query";
const page = 1;
const base = "https://example.com";
const url = new URL(base);
url.search = new URLSearchParams({
    q,
    page
});
console.log(url.toString()); // => "https://example.com/?q=query&page=1"
```

:memo: `URLSearchParams` escape each parameter automtically.

```js
const q = "<user input>";
const page = 1;
const base = "https://example.com";
const url = new URL(base);
url.search = new URLSearchParams({
    q,
    page
});
console.log(url.toString()); // => "https://example.com/?q=%3Cuser+input%3E&page=1"
```

## Update parameter of URL

Use [`URL`](https://developer.mozilla.org/docs/Web/API/URL/URL)'s [`searchParams`](https://developer.mozilla.org/docs/Web/API/URL/searchParams) property.

```js
const inputURL = "https://example.com/?q=query&page=1";
const url = new URL(inputURL);
url.searchParams.set("q", "update");
console.log(url.toString()); // => "https://example.com/?q=update&page=1"
```

## Remove parameter from URL

Use [`URL`](https://developer.mozilla.org/docs/Web/API/URL/URL) and [URLSearchParams](https://developer.mozilla.org/docs/Web/API/URLSearchParams)

```js
const inputURL = "https://example.com/?q=query&page=1";
const url = new URL(inputURL);
url.searchParams.delete("q");
console.log(url.toString()); // => "https://example.com/?page=1"
```

## Filter parameters

Allow only `a` and `d` parameters.

- keywords: pick, white list, allow list

```js
const base = "https://example.com/?a=1&b=2&c=3&d=4";
const url = new URL(base);
const allowedParameterNames = ["a", "d"];
url.search = new URLSearchParams(Array.from(url.searchParams).filter(([key, value]) => {
  return allowedParameterNames.includes(key);
}));
console.log(url.toString()); // => "https://example.com/?a=1&d=4"
```

## Validate URL

[`URL`](https://developer.mozilla.org/docs/Web/API/URL/URL) throw an error when parsing invalid url string.

- Related: [Secure JavaScript URL validation | Snyk](https://snyk.io/blog/secure-javascript-url-validation/)

```js
const isValidURL = (urlString) => {
  try {
    new URL(urlString); // if `urlString` is invalid, throw an erorr
    return true;
  } catch {
    return false;
  }
};
console.log(isValidURL("https://example.com")); // => true
console.log(isValidURL("https/example.com")); // => false
```

## Check URL is HTTP

Check [`URL`](https://developer.mozilla.org/docs/Web/API/URL/URL)'s [`protocol`](https://developer.mozilla.org/docs/Web/API/URL/protocol) property.

```js
const isHttpURL = (urlString) => {
  try {
    const url = new URL(urlString); // if `urlString` is invalid, throw an erorr
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};
console.log(isHttpURL("http://example.com")); // => true
console.log(isHttpURL("https://example.com")); // => true
console.log(isHttpURL("ftp://example.com")); // => false
console.log(isHttpURL("https/example.com")); // => false
```
