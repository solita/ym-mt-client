import { configWithAuthHeaders } from './ApiService';

describe('Service: API', () => {
  it('should create config with auth header', () => {
    const config = {};
    const access_token = 'access';
    const result = configWithAuthHeaders(config, access_token);
    const expected = {
      headers: {
        Authorization: 'Bearer access'
      }
    }

    expect(result).toEqual(expected);
  })
})