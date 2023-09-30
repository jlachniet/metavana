# Configuration Reference

This section of the documentation describes the various options that can be set in a configuration file.

The structure of a configuration file is as follows:

```ts
interface Config {
	site: Site;
	pages: Page[];
}
```

## Options

### Config.site: `Site`

The properties of the site. See [Site](/site) for more information.

### Config.pages: `Page[]`

The properties of the pages on the site. See [Page](/page) for more information.
