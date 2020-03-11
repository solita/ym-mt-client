import searchReducer, { initialState } from './reducers';
import * as actions from './actions';
import { clone } from 'ramda';

describe('Duck: Search', function() {
  describe('state transfers', () => {
    it('should add search term to correct list', () => {
      const action = actions.addSearchTerm('classification', 'value');

      const result = searchReducer(initialState, action);

      const expected = ['value'];

      expect(result['classification']).toEqual(expected);
    });

    it('should add search term to correct list', () => {
      const action = actions.deleteSearchTerm('classification', 'value');
      let modifiedState = clone(initialState);
      modifiedState.classification = ['value2', 'value', 'value3'];

      const result = searchReducer(modifiedState, action);

      const expected = ['value2', 'value3'];

      expect(result['classification']).toEqual(expected);
    });

    it('should toggle search term to correct list', () => {
      const action = actions.toggleSearchTerm('classification', 'value');
      let modifiedState = clone(initialState);
      modifiedState.classification = ['value2', 'value', 'value3'];

      const result = searchReducer(modifiedState, action);

      const expected = ['value2', 'value3'];

      expect(result['classification']).toEqual(expected);

      const action2 = actions.toggleSearchTerm('classification', 'value');
      const result2 = searchReducer(result, action2);
      const expected2 = ['value2', 'value3', 'value'];
      expect(result2['classification']).toEqual(expected2);
    });

    it('should write continuation token', function() {
      const action = actions.updateContinuationToken('thisisthetoken');
      const result = searchReducer(initialState, action);
      const expected = 'thisisthetoken';
      expect(result.continuationToken).toEqual(expected);
    });
  });
});
