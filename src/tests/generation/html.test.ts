import { escapeHtml } from '../../generation/html.js';
import { describe, expect, it } from '@jest/globals';

describe('escapeHtml', () => {
	it('should escape HTML', () => {
		expect(escapeHtml('foo & < > bar', 'html')).toBe('foo &amp; &lt; &gt; bar');
	});

	it('should escape HTML attributes', () => {
		expect(escapeHtml('foo & " bar', 'attribute')).toBe('foo &amp; &quot; bar');
	});
});
