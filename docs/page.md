# Page

The properties of a page on a site.

```ts
interface Page {
	url: string;
	name?: string;
	isHomePage?: boolean;
	overrideTitle?: string;
	languageTag?: string;
	textDirection?: string;
	authors?: Author[];
	description?: string;
}
```

## Options

### Page.url: `string`

The relative URL of the page, e.g. `/` or `/about`.

::: details
If your URL contains characters that need to be URI-encoded, leave them as the decoded characters.

For example, write your URL like the following:

```json
{ "url": "/hello world" }
```

Instead of writing it like this:

```json
{ "url": "/hello%20world" }
```

:::

### Page.name: `string`

The name of the page. This is optional for the home page and required for all other pages.

### Page.isHomePage: `boolean` (Optional)

Whether or not the page is the home page. Defaults to `true` for the page with a URL of `/` and `false` for all other pages.

### Page.overrideTitle: `string` (Optional)

A custom page title to override the automatically generated title with.

### Page.languageTag: `string` (Optional)

The language tag of the page, e.g. `ja` (Japanese) or `en-US` (American English). Must be a valid [BCP 47 language tag](https://wikipedia.org/wiki/IETF_language_tag). Overrides [Config.site.languageTag](/site#site-languagetag-string-optional).

### Page.textDirection: `string` (Optional)

The text direction of the page. Must be one of `ltr` (left-to-right), `rtl` (right-to-left), or `auto` (automatic). Overrides [Config.site.textDirection](/site#site-textdirection-string-optional).

### Page.authors: `Author[]` (Optional)

The authors of the page. See [Author](/author) for more information. Overrides [Config.site.authors](/site#site-authors-author-optional).

### Page.description: `string` (Optional)

A description of the page. Overrides [Config.site.description](/site#site-description-string-optional).
