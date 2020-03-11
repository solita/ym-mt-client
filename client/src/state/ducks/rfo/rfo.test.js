import reducer from './reducers';
import * as actions from './actions';
import * as selectors from './selectors';

describe('Duck: RFO', function() {
  const defaultInitialState = {
    form: {
      materials: [],
      attachments: [],
      regions: [],
      subService: []
    },
    view: {
      single: {},
      list: [],
      mapList: []
    },
    status: {
      loadingRfos: false,
      loadingMapRfos: false,
      loadingRfo: false,
      rfoNotFound: false,
      formHasChanges: false
    }
  };

  describe('Form actions and state transfers', function() {
    it('should add new key, if the key is not yet set', function() {
      const action = actions.handleRfoFormChange('key', 'value');

      const result = reducer(defaultInitialState, action);
      const expected = {
        key: 'value',
        materials: [],
        attachments: [],
        regions: [],
        subService: []
      };
      expect(result.form).toEqual(expected);
    });

    it('should update the form key', function() {
      const initialState = {
        form: {
          key: 'some_value',
          materials: [],
          attachments: [],
          regions: [],
          subService: []
        },
        view: {}
      };

      const action = actions.handleRfoFormChange('key', 'value');

      const result = reducer(initialState, action);
      const expected = {
        key: 'value',
        materials: [],
        attachments: [],
        regions: [],
        subService: []
      };
      expect(result.form).toEqual(expected);
    });

    it('should clear form state', function() {
      const initialState = {
        form: {
          key: 'value',
          materials: [],
          attachments: [],
          regions: [],
          subService: []
        }
      };

      const action = actions.clearRfoForm();

      const result = reducer(initialState, action);
      const expected = defaultInitialState;
      expect(result).toEqual(expected);
    });
  });

  describe('Material actions and state transfers', function() {
    const oneMaterialInitialState = {
      form: {
        materials: [
          {
            useTsv: true,
            key: 'val'
          }
        ],
        attachments: [],
        regions: [],
        subService: []
      },
      view: {}
    };

    const twoMaterialsInitialState = {
      form: {
        materials: [
          {
            useTsv: true,
            key1: 'val1'
          },
          {
            useTsv: true,
            key2: 'val2'
          }
        ],
        attachments: [],
        regions: [],
        subService: []
      },
      view: {}
    };

    it('should delete first material of two materials', function() {
      const action = actions.deleteMaterial(0);

      const result = reducer(twoMaterialsInitialState, action);
      const expected = {
        materials: [
          {
            useTsv: true,
            key2: 'val2'
          }
        ],
        attachments: [],
        regions: [],
        subService: []
      };
      expect(result.form).toEqual(expected);
    });

    it('should delete second material of two materials', function() {
      const action = actions.deleteMaterial(1);

      const result = reducer(twoMaterialsInitialState, action);
      const expected = {
        materials: [
          {
            useTsv: true,
            key1: 'val1'
          }
        ],
        attachments: [],
        regions: [],
        subService: []
      };
      expect(result.form).toEqual(expected);
    });

    it('should add a material to materials', function() {
      const action = actions.addMaterial();

      const result = reducer(defaultInitialState, action);
      const expected = {
        materials: [{ useTsv: true }],
        attachments: [],
        regions: [],
        subService: []
      };
      expect(result.form).toEqual(expected);
    });

    it('should add new material key, if the key is not yet set', function() {
      const stateWithOneMatrial = {
        form: {
          materials: [{ useTsv: true }],
          attachments: [],
          regions: [],
          subService: []
        }
      };
      const action = actions.handleMaterialFormChange(0, 'key', 'value');

      const result = reducer(stateWithOneMatrial, action);
      const expected = {
        materials: [
          {
            useTsv: true,
            key: 'value'
          }
        ],
        attachments: [],
        regions: [],
        subService: []
      };
      expect(result.form).toEqual(expected);
    });

    it('should update the material key', function() {
      const action = actions.handleMaterialFormChange(0, 'key', 'newValue');

      const result = reducer(oneMaterialInitialState, action);
      const expected = {
        materials: [
          {
            useTsv: true,
            key: 'newValue'
          }
        ],
        attachments: [],
        regions: [],
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
        materials: [],
        attachments: [{ id: 'id1' }],
        regions: [],
        subService: []
      };
      expect(result.form).toEqual(expected);
    });

    it('should add files to files list when there are files present', () => {
      const state = {
        form: {
          materials: [],
          attachments: [{ id: 'id1' }],
          regions: [],
          subService: []
        },
        view: {}
      };
      const action = actions.addFiles([{ id: 'id2' }]);
      const result = reducer(state, action);
      const expected = {
        materials: [],
        attachments: [{ id: 'id1' }, { id: 'id2' }],
        regions: [],
        subService: []
      };
      expect(result.form).toEqual(expected);
    });

    it('should delete file by id', () => {
      const state = {
        form: {
          materials: [],
          attachments: [{ id: 'id1' }, { id: 'id2' }],
          regions: [],
          subService: []
        }
      };
      const action = actions.deleteFile('id1');
      const result = reducer(state, action);
      const expected = {
        materials: [],
        attachments: [{ id: 'id2' }],
        regions: [],
        subService: []
      };
      expect(result.form).toEqual(expected);
    });

    it('should delete all files from state', () => {
      const state = {
        form: {
          materials: [],
          attachments: [{ id: 'id1' }, { id: 'id2' }],
          regions: [],
          subService: []
        }
      };
      const action = actions.deleteFiles();
      const result = reducer(state, action);
      const expected = {
        materials: [],
        attachments: [],
        regions: [],
        subService: []
      };
      expect(result.form).toEqual(expected);
    });
  });

  describe('Request for offer to view', () => {
    it('should add rfo to view', () => {
      const action = actions.addRfoToView({ key: 'value' });

      const result = reducer(defaultInitialState, action);

      const expected = {
        form: {
          materials: [],
          attachments: [],
          regions: [],
          subService: []
        },
        view: { single: { key: 'value' }, list: [], mapList: [] }
      };

      expect(result.view).toEqual(expected.view);
    });

    it('should remove rfo from view', () => {
      const state = {
        form: {
          materials: [],
          attachments: [],
          regions: [],
          subService: []
        },
        view: { single: { key: 'value' }, list: [] }
      };
      const action = actions.clearRfoView();
      const result = reducer(state, action);
      const expected = {
        form: {
          materials: [],
          attachments: [],
          regions: [],
          subService: []
        },
        view: { single: {}, list: [] }
      };
      expect(result.view).toEqual(expected.view);
    });
  });

  describe('Subservice handling', () => {
    it('should add subservice to empty  list', () => {
      const action = actions.addSubService({ id: 'id1' });
      const result = reducer(defaultInitialState, action);
      const expected = {
        materials: [],
        attachments: [],
        regions: [],
        subService: ['id1']
      };
      expect(result.form).toEqual(expected);
    });

    it('should remove sub service from list', () => {
      const state = {
        form: {
          materials: [],
          attachments: [],
          regions: [],
          subService: ['id2']
        },
        view: {}
      };
      const action = actions.deleteSubService({ id: 'id2' });
      const result = reducer(state, action);
      const expected = {
        materials: [],
        attachments: [],
        regions: [],
        subService: []
      };
      expect(result.form).toEqual(expected);
    });

    it('should delete all subservices ', () => {
      const state = {
        form: {
          materials: [],
          attachments: [],
          regions: [],
          subService: ['foo', 'bar', 'void']
        }
      };
      const action = actions.deleteAllSubServices();
      const result = reducer(state, action);
      const expected = {
        materials: [],
        attachments: [],
        regions: [],
        subService: []
      };
      expect(result.form).toEqual(expected);
    });
  });

  describe('Selectors', () => {
    it('should notice that rfo is tsv', () => {
      const rfo = {
        materials: [{ useTsv: true }]
      };
      const result = selectors.isTsv(rfo);

      const expected = true;
      expect(result).toEqual(expected);
    });

    it('should notice that rfo is not tsv', () => {
      const rfo = {};
      const result = selectors.isTsv(rfo);

      const expected = false;
      expect(result).toEqual(expected);
    });
  });
});
