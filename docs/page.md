# Page

The properties of a page on a site.

```ts
interface Page {
	url: string;
	name?: string;
	isHomePage?: boolean;
	overrideTitle?: string;
}
```

## Options

### Page.url: `string`

The relative URL of the page, e.g. `/` or `/about`.

### Page.name: `string`

The name of the page. This is optional for the home page and required for all other pages.

### Page.isHomePage: `boolean` (Optional)

Whether or not the page is the home page. Defaults to `true` for the page with a URL of `/` and `false` for all other pages.

### Page.overrideTitle: `string` (Optional)

A custom page title to override the automatically generated title with.
