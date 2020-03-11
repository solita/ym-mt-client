import * as utils from './layout-utils';

it('should return list of column classNames based on column modifiers and props', () => {
  const columnModifiers = ['a', 'b', 'c'];
  const props = { a: 1, c: 2, d: 3 };
  const expected = ['col-a-1', 'col-c-2'];

  expect(utils.columnClassNamesFromProps(columnModifiers, props)).toEqual(
    expected
  );
});
