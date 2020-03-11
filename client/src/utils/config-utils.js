import { path } from 'ramda';
import i18n from '../i18n';

const getConfig = (name, defaultValue) => {
  return path(['TietoalustaConfig', name])(window) || defaultValue;
};

export const getAuthServerUrl = defaultValue => {
  return getConfig('AuthServerUrl', defaultValue || 'https://auth.materiaalitori.fi');
};

export const getFeedbackUrlFi = () => {
  return getConfig('FeedbackUrlFi', 'https://link.webropolsurveys.com/S/B11F38015F86EC02');
};

export const getFeedbackUrlSv = () => {
  return getConfig('FeedbackUrlSv', 'https://link.webropolsurveys.com/S/6C3AB1D2B764C7D5');
};

export const getFeedbackUrl = () => {
  const lang = i18n.language;

  switch (lang) {
    case 'sv-FI':
      return getFeedbackUrlSv();

    default: {
      return getFeedbackUrlFi();
    }
  }
};

export const getAdminServerUrl = () => {
  return getConfig('AdminServerUrl', 'https://admin.materiaalitori.fi');
};

export const getMapUrl = () => {
  return getConfig(
    'MapUrl',
    'https://hkp.maanmittauslaitos.fi/hkp/published/fi/d7d3c79c-a50e-4fb9-8b81-be929a28ead3'
  );
};
