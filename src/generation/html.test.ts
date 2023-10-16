import { escapeHtml } from './html.js';
import { describe, expect, it } from '@jest/globals';

describe('escapeHtml', () => {
	it('should escape HTML', () => {
		expect(escapeHtml('& < >', 'html')).toBe('&amp; &lt; &gt;');
	});

	it('should escape attributes', () => {
		expect(escapeHtml('& "', 'attribute')).toBe('&amp; &quot;');
	});
});
