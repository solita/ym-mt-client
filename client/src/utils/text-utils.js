import React from 'react';

export const splitTextToParagraphsOnLinebreak = text =>
  (text ? text : '').split('\n').map((textFragment, i) => <p key={i}>{textFragment}</p>);

// Regexps for numbers that accept both comma (,) and dot (.) as decimal separators:
export const regExpForNumberWithUnlimitedDecimals = '[\\d]+([,\\.]{1}[\\d]*)?';
export const regExpForNumberWithThreeDecimals = '[\\d]+([,\\.]{1}[\\d]{0,3})?';
