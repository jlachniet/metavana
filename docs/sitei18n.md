# SiteI18n

The internationalization properties of a site.

```ts
interface SiteI18n {
	nameTranslations?: Record<string, string>;
}
```

## Options

### SiteI18n.nameTranslations: `Record<string, string>` (Optional)

An object representing the translations of the site name. Keys in this object are [BCP 47 language tags](https://wikipedia.org/wiki/IETF_language_tag) and the values are the translated site names. Do not include the primary language in this object.

::: details Example
Imagine you have a site called "Hello" whose primary language is English, but also supports Spanish and French. Your site configuration would look something like the following:

```json
{
	"site": {
		"name": "Hello",
		"domainName": "example.com",
		"languageTag": "en",
		"i18n": {
			"nameTranslations": {
				"es": "Hola",
				"fr": "Bonjour"
			}
		}
	},
	"pages": [
		{
			"url": "/"
		}
	]
}
```

Note that the key `en` is not included in the `nameTranslations` object because it is the primary language.
:::
