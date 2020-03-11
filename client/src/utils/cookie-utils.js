import { fromPairs } from 'ramda';

export const getFromCookies = (key, cookie = document.cookie) => {
  const cookieArr = cookie.split(';').map(value => value.trim().split('='));
  const cookieObj = fromPairs(cookieArr);
  return cookieObj[key];
};

export const setCookie = (key, value, options = {}) => {
  const optionString = Object.keys(options).reduce((acc, key) => {
    return `${acc};${key}=${options[key]}`;
  }, '');

  document.cookie = `${key}=${value}${optionString}`;
};
