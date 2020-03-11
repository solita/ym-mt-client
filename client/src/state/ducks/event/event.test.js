import reducer from './reducers';
import * as actions from './actions';

describe('Duck: EVENT', function() {
  const defaultInitialState = {
    view: {
      single: {},
      list: []
    },
    status: {
      loadingEvents: false
    }
  };

  describe('State transfers', function() {
    it('should add events list to view', () => {
      const action = actions.updateEventList([{ eventKey: 'eventValue' }]);

      const result = reducer(defaultInitialState, action);

      const expected = {
        view: {
          single: {},
          list: [{ eventKey: 'eventValue' }]
        }
      };

      expect(result.view).toEqual(expected.view);
    });

    it('should update status', () => {
      const action = actions.setLoadingEvents(true);

      const result = reducer(defaultInitialState, action);

      const expected = {
        status: {
          loadingEvents: true
        }
      };

      expect(result.status).toEqual(expected.status);
    });
  });
});
