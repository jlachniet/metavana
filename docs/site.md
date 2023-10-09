# Site

The properties of a site.

```ts
interface Site {
	name: string;
	domainName: string;
	titleFormat?: string;
	languageTag?: string;
	textDirection?: string;
	authors?: Author[];
	description?: string;
	i18n?: SiteI18n;
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

### Site.languageTag: `string` (Optional)

The language tag of the site, e.g. `ja` (Japanese) or `en-US` (American English). Must be a valid [BCP 47 language tag](https://wikipedia.org/wiki/IETF_language_tag).

### Site.textDirection: `string` (Optional)

The text direction of the site. Must be one of `ltr` (left-to-right), `rtl` (right-to-left), or `auto` (automatic). Defaults to `auto`.

### Site.authors: `Author[]` (Optional)

The authors of the site. See [Author](/author) for more information.

### Site.description: `string` (Optional)

A description of the site.

### Site.i18n: `SiteI18n` (Optional)

The internationalization properties of the site. See [SiteI18n](/sitei18n) for more information.
