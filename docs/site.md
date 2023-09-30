# Site

The properties of a site.

```ts
interface Site {
	name: string;
	domainName: string;
	titleFormat?: string;
}
```

## Options

### Site.name: `string`

The name of the site.

### Site.domainName: `string`

The domain name of the site, e.g. `example.com` or `www.w3.org`.

### Site.titleFormat: `string` (Optional)

The format used to generate page titles. Defaults to `PAGE_NAME - SITE_NAME`.

::: details
Page titles are automatically generated based on the page name and site name. You can customize the format by creating a custom string representing the title format using `PAGE_NAME` and `SITE_NAME` as placeholders.

For example, if your title format was `PAGE_NAME % (SITE_NAME)`, the site name was `Example Site`, and the page name was `Home`, the generated page title would be `Home % (Example Site)`.

It is recommended to put the page name before the site name in the title format to prevent page names from being cut off when possible.
:::
