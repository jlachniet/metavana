import { DomainNameSchema, RelativeUrlSchema } from '../../schema/url.js';
import { describeSchema } from '../utils.js';

describeSchema(DomainNameSchema, 'DomainNameSchema', {
	validValues: ['example.com', 'foo.example.com'],
	normalizableValues: [
		['EXAMPLE.COM', 'example.com'],
		['example.com.', 'example.com'],
	],
	invalidValues: ['foo', 'https://example.com/', '😊.com'],
});

describeSchema(RelativeUrlSchema, 'RelativeUrlSchema', {
	validValues: ['/', '/foo'],
	invalidValues: ['foo'],
});
