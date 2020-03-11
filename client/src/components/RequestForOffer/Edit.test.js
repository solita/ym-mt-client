import React from 'react';
import { shallow } from 'enzyme';
import { EditRfo, promptMessageFn } from './Edit';

describe('RFO: Edit component', function() {
  const defaultInitialState = {
    materials: [],
    attachments: []
  };

  it('should render without crashing', function() {
    const props = {
      t: value => value,
      rfo: defaultInitialState,
      handleChange: () => {},
      clearForm: () => {},
      addMaterial: () => {},
      match: {
        path: '/ilmoitukset/muokkaa/:id'
      },
      fetchRfoForEdit: rfoId => {
        return {
          id: rfoId
        };
      }
    };

    const wrapper = shallow(<EditRfo {...props} />);
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it.skip('should have submit button disabled when no title is in the props', () => {
    const props = {
      t: () => {},
      rfo: defaultInitialState,
      handleChange: () => {},
      clearForm: () => {},
      addMaterial: () => {},
      match: {
        path: '',
        params: {
          id: null
        }
      }
    };

    const wrapper = shallow(<EditRfo {...props} />);
    const submitButton = wrapper.find('.submit-form');
    expect(submitButton.prop('disabled')).toBe(true);
  });

  it.skip('should have submit button enabled when title is set in form props', () => {
    const props = {
      t: () => {},
      rfo: {
        materials: [{}],
        attachments: [],
        title: 'Title'
      },
      handleChange: () => {},
      clearForm: () => {},
      addMaterial: () => {},
      match: {
        path: '',
        params: {
          id: null
        }
      }
    };

    const wrapper = shallow(<EditRfo {...props} />);
    const submitButton = wrapper.find('.submit-form');
    expect(submitButton.prop('disabled')).toBe(false);
  });

  describe('prompt logic', () => {
    const promptMessageFnWithT = promptMessageFn(a => 'test');

    it('should not allow direct navigation to ilmoitukset page', () => {
      const location = {
        pathname: '/ilmoitukset'
      };

      expect(promptMessageFnWithT(location)).toEqual('test');
    });

    it('should not allow direct navigation to lisää ilmoitus -page', () => {
      const location = {
        pathname: '/ilmoitukset/lisaa'
      };

      expect(promptMessageFnWithT(location)).toEqual('test');
    });

    it('should allow direct navigation to ilmoitus page', () => {
      const location = {
        pathname: '/ilmoitukset/99caee4c-bb97-46c9-bbdd-efc19ab1a278'
      };

      expect(promptMessageFnWithT(location)).toEqual(true);
    });
  });
});
