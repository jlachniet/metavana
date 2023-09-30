import { ConfigSchema } from '../../schema/config.js';
import { describeObjectSchema, describeSchema } from '../utils.js';

describeObjectSchema(
	ConfigSchema,
	'ConfigSchema',
	{
		site: {
			name: 'Example Domain',
			domainName: 'example.com',
		},
		pages: [
			{
				url: '/',
			},
		],
	},
	{},
);

describeSchema(ConfigSchema, 'ConfigSchema', {
	invalidValues: [
		{
			site: {
				name: 'Example Domain',
				domainName: 'example.com',
			},
			pages: [
				{
					url: '/',
				},
				{
					url: '/',
				},
			],
		},
	],
});
