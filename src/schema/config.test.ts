import { describeObjectSchema, itShouldNotParse } from '../testing/zod.js';
import { ConfigSchema } from './config.js';
import { PageSchema } from './page.js';
import { SiteSchema } from './site.js';

describeObjectSchema(
	ConfigSchema,
	'ConfigSchema',
	{
		site: SiteSchema.parse({ name: 'Example Site', domainName: 'example.com' }),
		pages: [PageSchema.parse({ url: '/' })],
	},
	{},
	() => {
		itShouldNotParse('a config with duplicate page paths', ConfigSchema, {
			site: { name: 'Example Site', domainName: 'example.com' },
			pages: [{ url: '/page' }, { url: '/page?v=2' }],
		});
	},
);
