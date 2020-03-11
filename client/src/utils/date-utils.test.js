import * as dateUtils from './date-utils';

describe('Utils: date', () => {
  describe('Date and time format functions', () => {
    it('should format sheer date correctly', () => {
      var date = new Date(2019, 2, 5, 9, 25, 59); // month 2 means March, since Javascript counts months starting from 0

      const result = dateUtils.formatDate(date);
      const expected = '5.3.2019';

      expect(result).toEqual(expected);
    });

    it('should format time correctly', () => {
      var date = new Date(2019, 2, 5, 9, 25, 59);

      const result = dateUtils.formatTime(date);
      const expected = '9.25';

      expect(result).toEqual(expected);
    });
  });

  describe('year range', () => {
    it('should return only one year if start year is the same', () => {
      const dateObj = new Date('2019-01-01');
      const startYear = 2019;

      expect(dateUtils.getYearRange(startYear, dateObj)).toEqual([2019]);
    });

    it('should return correct year range', () => {
      const dateObj = new Date('2022-01-01');
      const startYear = 2019;

      expect(dateUtils.getYearRange(startYear, dateObj)).toEqual([2019, 2020, 2021, 2022]);
    });

    it('should return empty object if startYear is in the future', () => {
      const dateObj = new Date('2019-01-01');
      const startYear = 2020;

      expect(dateUtils.getYearRange(startYear, dateObj)).toEqual([]);
    });
  });

  describe('Date comparison', () => {
    it('should recognise a passed date', () => {
      let now = new Date();
      const yesterday = now.setDate(now.getDate() - 1);
      now = new Date();
      const anHourAgo = now.setHours(now.getHours() - 1);

      expect(dateUtils.dateIsInThePast(yesterday)).toEqual(true);
      expect(dateUtils.dateIsInThePast(anHourAgo)).toEqual(true);
    });

    it('should recognise a future date', () => {
      let now = new Date();
      const tomorrow = now.setDate(now.getDate() + 1);
      now = new Date();
      const anHourAhead = now.setHours(now.getHours() + 1);

      expect(dateUtils.dateIsInThePast(tomorrow)).toEqual(false);
      expect(dateUtils.dateIsInThePast(anHourAhead)).toEqual(false);
    });
  });
});
