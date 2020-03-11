import { listLengthWithUndefinedCheck, countByProp, getDomainFromHostname } from './common-utils';

describe('Utils: common', () => {
  describe('lengthWithUndefinedCheck', () => {
    it('returns undefined for undefined list without error', () => {
      const offers = undefined;
      const result = listLengthWithUndefinedCheck(offers);

      const expected = undefined;

      expect(result).toEqual(expected);
    });

    it('calculates right for list of two', () => {
      const offers = [{}, {}];
      const result = listLengthWithUndefinedCheck(offers);

      const expected = 2;

      expect(result).toEqual(expected);
    });
  });

  describe('countByProp', () => {
    it('should count two same kind of list items together', () => {
      const list = [
        {
          code: 30,
          text: ''
        },
        {
          code: 30,
          text: ''
        }
      ];

      const result = countByProp('code', list);

      const expected = { '30': 2 };

      expect(result).toEqual(expected);
    });

    it('should not care about other props', () => {
      const list = [
        {
          code: 0,
          text: 'text 1'
        },
        {
          code: 0,
          text: 'text 2'
        }
      ];

      const result = countByProp('code', list);

      const expected = { '0': 2 };

      expect(result).toEqual(expected);
    });

    it('should count two same kind of list items together, and one different kind separately', () => {
      const list = [
        {
          code: 10,
          text: ''
        },
        {
          code: 30,
          text: ''
        },
        {
          code: 30,
          text: ''
        }
      ];

      const result = countByProp('code', list);

      const expected = { '10': 1, '30': 2 };

      expect(result).toEqual(expected);
    });
  });

  describe('getDomainFromHostname', () => {
    it('should return domain if no subdomain', () => {
      const hostname = 'domain.com';
      const expected = 'domain.com';
      const result = getDomainFromHostname(hostname);
      expect(result).toEqual(expected);
    });

    it('should return domain without subdomain if subdomain', () => {
      const hostname = 'sub.domain.com';
      const expected = 'domain.com';
      const result = getDomainFromHostname(hostname);
      expect(result).toEqual(expected);
    });

    it('should return domain without subdomain if multiple subdomains', () => {
      const hostname = 'yet.another.sub.domain.com';
      const expected = 'domain.com';
      const result = getDomainFromHostname(hostname);
      expect(result).toEqual(expected);
    });

    it('should return hostname if not able to parse', () => {
      const hostname = 'subdomaincom';
      const expected = 'subdomaincom';
      const result = getDomainFromHostname(hostname);
      expect(result).toEqual(expected);
    });
  });
});
