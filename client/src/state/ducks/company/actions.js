import * as types from './types';

export const setLoadingCompanies = status => ({ type: types.LOADING_COMPANIES, status });

export const updateCompanyList = companies => ({
  type: types.UPDATE_COMPANY_LIST,
  companies: companies
});

export const updateCompany = company => ({
  type: types.UPDATE_COMPANY,
  company: company
});
