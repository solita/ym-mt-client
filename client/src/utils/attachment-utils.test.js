import * as attachmentUtils from './attachment-utils';

describe('Utils: attachment', () => {
  describe('Attachment filtering', () => {
    it('should filter only images', () => {
      const listOfAttachments = [
        { contentType: 'image/jpeg' },
        { contentType: 'image/png' },
        { contentType: 'application/pdf' }
      ];

      const result = attachmentUtils.filterImageAttachments(listOfAttachments);

      const expected = [{ contentType: 'image/jpeg' }, { contentType: 'image/png' }];

      expect(result).toEqual(expected);
    });

    it('should filter only non-images', () => {
      const listOfAttachments = [
        { contentType: 'image/jpeg' },
        { contentType: 'image/png' },
        { contentType: 'application/pdf' }
      ];

      const result = attachmentUtils.filterNonImageAttachments(listOfAttachments);

      const expected = [{ contentType: 'application/pdf' }];

      expect(result).toEqual(expected);
    });
  });
});
