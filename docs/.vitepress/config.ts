import { defineConfig } from 'vitepress';

export default defineConfig({
	title: 'metavana',
	titleTemplate: ':title - metavana',
	description: 'A CLI for generating high-quality web metadata and icons.',
	cleanUrls: true,
	head: [
		['meta', { name: 'application-name', content: 'metavana' }],
		['meta', { name: 'author', content: 'Julian Lachniet' }],
		['meta', { name: 'theme-color', content: '#8a59f4' }],
		['meta', { property: 'og:image', content: '/logo-192x192.png' }],
		['meta', { property: 'og:image:alt', content: 'The metavana logo' }],
		['meta', { property: 'og:image:type', content: 'image/png' }],
		['meta', { property: 'og:image:width', content: '192' }],
		['meta', { property: 'og:image:height', content: '192' }],
		['meta', { property: 'og:site_name', content: 'metavana' }],
		['meta', { property: 'og:type', content: 'website' }],
		['link', { rel: 'author', href: 'https://github.com/jlachniet' }],
		['link', { rel: 'help', href: '/get-started' }],
		[
			'link',
			{
				rel: 'license',
				href: 'https://github.com/jlachniet/metavana/blob/main/LICENSE',
			},
		],
		['link', { rel: 'manifest', href: '/metavana.webmanifest' }],
		['link', { rel: 'icon', href: '/favicon.ico', sizes: '48x48' }],
		[
			'link',
			{ rel: 'icon', href: '/logo.svg', sizes: 'any', type: 'image/svg+xml' },
		],
		['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
	],
	themeConfig: {
		logo: { src: '/logo.svg', alt: 'The metavana logo' },
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Guide', link: '/getting-started' },
			{ text: 'Reference', link: '/configuration-reference' },
		],
		sidebar: [
			{ text: 'Getting Started', link: '/getting-started' },
			{
				text: 'Configuration Reference',
				link: '/configuration-reference',
				items: [
					{
						text: 'Site',
						link: '/site',
						items: [
							{
								text: 'SiteI18n',
								link: '/sitei18n',
							},
						],
					},
					{ text: 'Page', link: '/page' },
					{ text: 'Author', link: '/author' },
				],
			},
		],
		outline: [2, 3],
		socialLinks: [
			{ icon: 'github', link: 'https://github.com/jlachniet/metavana' },
		],
		footer: { copyright: 'Released under the MIT License.' },
		darkModeSwitchLabel: 'Site Theme',
		search: { provider: 'local' },
	},
});
