import { SiteSchema } from '../../schema/site.js';
import { describeObjectSchema } from '../_utils.js';

describeObjectSchema(
	SiteSchema,
	'SiteSchema',
	{
		name: 'Example Domain',
		domainName: 'example.com',
	},
	{
		titleFormat: 'PAGE_NAME - SITE_NAME',
		languageTag: 'en-US',
		textDirection: 'ltr',
	},
);
