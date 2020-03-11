import reducer from './reducers';
import * as actions from './actions';

describe('Duck: Tsv', function() {
  const defaultInitialState = {
    form: {},
    general: {},
    requestView: {
      form: {}
    },
    status: {
      formHasChanges: false
    }
  };

  describe('Form basic actions and state transfers', function() {
    it('should add new key, if the key is not yet set', function() {
      const action = actions.handleTsvFormChange('key', 'value');

      const result = reducer(defaultInitialState, action);
      const expected = {
        key: 'value'
      };
      expect(result.form).toEqual(expected);
    });

    it('should update the form key', function() {
      const initialState = {
        form: {
          key: 'some_value'
        }
      };
      const action = actions.handleTsvFormChange('key', 'value');

      const result = reducer(initialState, action);
      const expected = {
        key: 'value'
      };
      expect(result.form).toEqual(expected);
    });

    it('should clear form state', function() {
      const initialState = {
        form: {
          key: 'value'
        }
      };

      const action = actions.clearTsvForm();

      const result = reducer(initialState, action);
      const expected = defaultInitialState;
      expect(result).toEqual(expected);
    });
  });

  describe('General actions and state transfers', function() {
    it('should populate facilities', function() {
      const action = actions.populateFacilities({ facility1: 'value1' });

      const result = reducer(defaultInitialState, action);
      const expected = {
        facilities: {
          facility1: 'value1'
        }
      };
      expect(result.general).toEqual(expected);
    });

    it('should add tsv needed data to general', function() {
      const action = actions.addTsvNeededDataToTsv({ dataKey: 'dataValue' });

      const result = reducer(defaultInitialState, action);
      const expected = {
        data: {
          dataKey: 'dataValue'
        }
      };
      expect(result.general).toEqual(expected);
    });

    it('should clear tsv needed data from general', function() {
      const action = actions.clearTsvGeneral({ dataKey: 'dataValue' });

      const result = reducer(defaultInitialState, action);
      const expected = {};
      expect(result.general).toEqual(expected);
    });
  });

  describe('Request view actions and state transfers', function() {
    it('should add tsv request to request view', function() {
      const action = actions.addTsvRequestToRequestView({ dataKey: 'dataValue' });

      const result = reducer(defaultInitialState, action);
      const expected = {
        form: {},
        payload: {
          dataKey: 'dataValue'
        }
      };
      expect(result.requestView).toEqual(expected);
    });

    it('should add new key, if the key is not yet set', function() {
      const action = actions.handleTsvViewFormChange('key', 'value');

      const result = reducer(defaultInitialState, action);
      const expected = {
        key: 'value'
      };
      expect(result.requestView.form).toEqual(expected);
    });

    it('should update the form key', function() {
      const initialState = {
        form: {
          key: 'some_value'
        }
      };
      const action = actions.handleTsvViewFormChange('key', 'value');

      const result = reducer(initialState, action);
      const expected = {
        key: 'value'
      };
      expect(result.requestView.form).toEqual(expected);
    });

    it('should clear everything from the request view', function() {
      const action = actions.clearTsvView();

      const result = reducer(defaultInitialState, action);
      const expected = {
        form: {}
      };
      expect(result.requestView).toEqual(expected);
    });
  });

  describe('Status actions and state transfers', function() {
    it('should set form has changes to true', function() {
      const action = actions.setTsvHasChanges(true);

      const result = reducer(defaultInitialState, action);
      const expected = {
        formHasChanges: true
      };
      expect(result.status).toEqual(expected);
    });
  });
});
