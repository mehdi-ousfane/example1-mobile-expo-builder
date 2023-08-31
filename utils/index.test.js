import { checkImageURL } from './index';

describe('checkImageURL function', () => {
  it('returns false if no input is provided', () => {
    expect(checkImageURL()).toBe(false);
  });

  it('returns true for valid image URLs', () => {
    const validUrls = [
      'http://example.com/image.png',
      'https://example.com/image.jpg',
      'https://example.com/image.jpeg',
      'https://example.com/image.bmp',
      'https://example.com/image.gif',
      'https://example.com/image.webp',
    ];

    validUrls.forEach((url) => {
      expect(checkImageURL(url)).toBe(true);
    });
  });

  it('returns false for invalid URLs or non-image URLs', () => {
    const invalidUrls = [
      'example.com/image.png',
      '/path/to/image.jpg',
      'https://example.com/image.txt',
      'https://example.com/',
      'https://example.com/image.png/redirect',
      'ftp://example.com/image.png',
    ];

    invalidUrls.forEach((url) => {
      expect(checkImageURL(url)).toBe(false);
    });
  });
});
