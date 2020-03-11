import reducer from './reducers';
import * as actions from './actions';

describe('Duck: Offer', function() {
  const defaultInitialState = {
    form: {
      attachments: [],
      subService: []
    },
    view: { form: {} },
    status: {
      loadingOffer: false,
      offerNotFound: false,
      formHasChanges: false
    }
  };

  describe('Form basic actions and state transfers', function() {
    it('should add new key, if the key is not yet set', function() {
      const action = actions.handleOfferFormChange('key', 'value');

      const result = reducer(defaultInitialState, action);
      const expected = {
        key: 'value',
        attachments: [],
        subService: []
      };
      expect(result.form).toEqual(expected);
    });

    it('should update the form key', function() {
      const initialState = {
        form: {
          key: 'some_value',
          attachments: [],
          subService: []
        }
      };
      const action = actions.handleOfferFormChange('key', 'value');

      const result = reducer(initialState, action);
      const expected = {
        key: 'value',
        attachments: [],
        subService: []
      };
      expect(result.form).toEqual(expected);
    });

    it('should clear form state', function() {
      const initialState = {
        form: {
          key: 'value',
          attachments: [{ id: 'id1' }],
          subService: ['id1']
        }
      };

      const action = actions.clearOfferForm();

      const result = reducer(initialState, action);
      const expected = defaultInitialState;
      expect(result).toEqual(expected);
    });
  });

  describe('Subservice handling', () => {
    it('should add subservice to empty list', () => {
      const action = actions.addSubService({ id: 'id1' });

      const result = reducer(defaultInitialState, action);
      const expected = {
        attachments: [],
        subService: ['id1']
      };
      expect(result.form).toEqual(expected);
    });

    it('should remove subservice from list', () => {
      const initialState = {
        form: {
          attachments: [],
          subService: ['id2']
        }
      };
      const action = actions.deleteSubService({ id: 'id2' });

      const result = reducer(initialState, action);
      const expected = {
        attachments: [],
        subService: []
      };
      expect(result.form).toEqual(expected);
    });

    it('should delete all subservices ', () => {
      const initialState = {
        form: {
          attachments: [],
          subService: ['foo', 'bar', 'void']
        }
      };
      const action = actions.deleteAllSubServices();

      const result = reducer(initialState, action);
      const expected = {
        attachments: [],
        subService: []
      };
      expect(result.form).toEqual(expected);
    });
  });

  describe('Attachment handling', () => {
    it('should add files to empty files list', () => {
      const action = actions.addFiles([{ id: 'id1' }]);

      const result = reducer(defaultInitialState, action);
      const expected = {
        attachments: [{ id: 'id1' }],
        subService: []
      };
      expect(result.form).toEqual(expected);
    });

    it('should add files to files list when there are files present', () => {
      const state = {
        form: {
          attachments: [{ id: 'id1' }],
          subService: []
        }
      };
      const action = actions.addFiles([{ id: 'id2' }]);

      const result = reducer(state, action);
      const expected = {
        attachments: [{ id: 'id1' }, { id: 'id2' }],
        subService: []
      };
      expect(result.form).toEqual(expected);
    });

    it('should delete file by id', () => {
      const state = {
        form: {
          attachments: [{ id: 'id1' }, { id: 'id2' }],
          subService: []
        }
      };
      const action = actions.deleteFile('id1');

      const result = reducer(state, action);
      const expected = {
        attachments: [{ id: 'id2' }],
        subService: []
      };
      expect(result.form).toEqual(expected);
    });
  });

  describe('View actions and state transfers', function() {
    it('should add offer to view', function() {
      const action = actions.addOfferToView({ id: 'id1' });

      const result = reducer(defaultInitialState, action);
      const expected = {
        form: {},
        payload: {
          id: 'id1'
        }
      };
      expect(result.view).toEqual(expected);
    });

    it('should clear offer from view', function() {
      const initialState = {
        view: {
          form: {},
          payload: {
            id: 'id1'
          }
        }
      };
      const action = actions.clearOfferView();

      const result = reducer(initialState, action);
      const expected = defaultInitialState.view;
      expect(result.view).toEqual(expected);
    });

    it('should add new key, if the key is not yet set', function() {
      const action = actions.handleViewFormChange('key', 'value');

      const result = reducer(defaultInitialState, action);
      const expected = {
        form: {
          key: 'value'
        }
      };
      expect(result.view).toEqual(expected);
    });

    it('should update the form key', function() {
      const initialState = {
        view: {
          form: {
            key: 'some_value'
          }
        }
      };
      const action = actions.handleViewFormChange('key', 'value');

      const result = reducer(initialState, action);
      const expected = {
        key: 'value'
      };
      expect(result.view.form).toEqual(expected);
    });
  });

  describe('Status actions and state transfers', function() {
    it('should set loading offer to true', function() {
      const action = actions.setLoadingOffer(true);

      const result = reducer(defaultInitialState, action);
      const expected = {
        loadingOffer: true,
        offerNotFound: false,
        formHasChanges: false
      };
      expect(result.status).toEqual(expected);
    });

    it('should set offer not found to true', function() {
      const action = actions.offerNotFound(true);

      const result = reducer(defaultInitialState, action);
      const expected = {
        loadingOffer: false,
        offerNotFound: true,
        formHasChanges: false
      };
      expect(result.status).toEqual(expected);
    });

    it('should set form has changes to true', function() {
      const action = actions.setOfferHasChanges(true);

      const result = reducer(defaultInitialState, action);
      const expected = {
        loadingOffer: false,
        offerNotFound: false,
        formHasChanges: true
      };
      expect(result.status).toEqual(expected);
    });
  });
});
