import companyReducer, { initialViewState, initialStatusState } from './reducers';
import * as actions from './actions';

describe('Duck: Company', function() {
  describe('state transfers', () => {
    it('should update company list', () => {
      const companies = [{ id: '1' }, { id: '2' }];
      const action = actions.updateCompanyList(companies);
      const result = companyReducer({ view: initialViewState }, action);
      expect(result.view.list).toEqual(companies);
    });

    it('should update company in list', () => {
      const companies = [
        { id: '1', name: 'foo' },
        { id: '2', name: 'bar' },
        { id: '3', name: 'fuz' }
      ];
      const company = { id: '2', name: 'rab' };
      const action = actions.updateCompany(company);
      const result = companyReducer({ view: { list: companies } }, action);
      let expected = Array.from(companies);
      expected[1] = company;
      expect(result.view.list).toEqual(expected);
    });

    it('should add company to list', () => {
      const companies = [
        { id: '1', name: 'foo' },
        { id: '2', name: 'bar' },
        { id: '3', name: 'fuz' }
      ];
      const company = { id: '4', name: 'rab' };
      const action = actions.updateCompany(company);
      const result = companyReducer({ view: { list: companies } }, action);
      let expected = Array.from(companies);
      expected.push(company);
      expect(result.view.list).toEqual(expected);
    });
  });
});
