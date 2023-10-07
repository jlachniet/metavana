import { generatePageTitle } from '../../generation/page-title.js';
import { describe, expect, it } from '@jest/globals';

describe('generatePageTitle', () => {
	it('should use the override title if present', () => {
		expect(
			generatePageTitle(
				{
					name: 'Example Domain',
					domainName: 'example.com',
					titleFormat: 'PAGE_NAME - SITE_NAME',
					authors: [],
				},
				{
					url: '/',
					overrideTitle: 'example',
					isHomePage: true,
					authors: [],
				},
			),
		).toBe('example');
	});

	it('should use the site name if the page is the home page', () => {
		expect(
			generatePageTitle(
				{
					name: 'Example Domain',
					domainName: 'example.com',
					titleFormat: 'PAGE_NAME - SITE_NAME',
					authors: [],
				},
				{
					url: '/',
					isHomePage: true,
					authors: [],
				},
			),
		).toBe('Example Domain');
	});

	it('should generate the page title for a non-home page', () => {
		expect(
			generatePageTitle(
				{
					name: 'Example Domain',
					domainName: 'example.com',
					titleFormat: 'PAGE_NAME - SITE_NAME',
					authors: [],
				},
				{
					url: '/example',
					name: 'Example',
					isHomePage: false,
					authors: [],
				},
			),
		).toBe('Example - Example Domain');
	});

	it('should handle custom title formats', () => {
		expect(
			generatePageTitle(
				{
					name: 'Example Domain',
					domainName: 'example.com',
					titleFormat: 'PAGE_NAME | SITE_NAME',
					authors: [],
				},
				{
					url: '/example',
					name: 'Example',
					isHomePage: false,
					authors: [],
				},
			),
		).toBe('Example | Example Domain');
	});
});
