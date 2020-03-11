import * as C from './cookie-utils';

describe('Utils: cookie', () => {
  it('should parse cookie value from cookie string', () => {
    const cookieStr = 'asdf=1; sdfg=2; wanted=isthis; dfgh=3';

    expect(C.getFromCookies('wanted', cookieStr)).toEqual('isthis');
    expect(C.getFromCookies('asdf', cookieStr)).toEqual('1');
  });

  it('should return undefined if key is not set in cookie string', () => {
    const cookieStr = 'asdf=1; sdfg=2; wanted=isthis; dfgh=3';

    expect(C.getFromCookies('notwanted', cookieStr)).toEqual(undefined);
  });

  it('should return undefined when no cookie string', () => {
    const cookieStr = '';

    expect(C.getFromCookies('any', cookieStr)).toEqual(undefined);
  });
});
