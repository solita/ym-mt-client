import * as R from 'ramda';

export const columnClassNamesFromProps = (columnModifiers, props) => {
  return R.compose(
    R.values,
    R.mapObjIndexed((val, key) => `col-${key}-${val}`),
    R.pick(columnModifiers)
  )(props);
};
