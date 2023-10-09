# Author

An author of a site or page.

```ts
interface Author {
	name: string;
	url?: string;
}
```

## Options

### Author.name: `string`

The name of the author.

### Author.url: `string`

A URL representing the author.

::: details
This can be a relative URL or absolute URL. If your URL contains characters that need to be URI-encoded, leave them as the decoded characters.

For example, write your URL like the following:

```json
{ "url": "/about me" }
```

Instead of writing it like this:

```json
{ "url": "/about%20me" }
```

:::
