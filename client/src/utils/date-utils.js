import { format } from 'date-fns';
import { getYear } from 'date-fns/fp';
import { compose, range, inc } from 'ramda';

export const formatDate = date => {
  return format(date, 'd.M.yyyy');
};

export const formatDateNumber = date => {
  return format(date, 'd');
};

export const formatTime = date => {
  return format(date, 'H.mm');
};

// Formats date for saving purposes: uses UTC format
export const formatDateForSaving = date => {
  return date;
};

export const isNullDate = str => !str || str === '0001-01-01T00:00:00';

export const getYearRange = (startYear, dateObj) =>
  compose(
    range(startYear),
    inc,
    getYear
  )(dateObj);

export const dateIsInThePast = date => {
  return date < Date.now();
};
