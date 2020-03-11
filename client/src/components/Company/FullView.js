import React from 'react';
import { withNamespaces } from 'react-i18next';
import styles from './CompanyFullView.module.css';
import { Container, Row, Col } from '../Layout/Layout';
import { formatDate } from '../../utils/date-utils';
import AddRegistration from './AddRegistration';
import RemoveRegistration from './RemoveRegistration';
import DetailsEdit from './DetailsEdit';
import {
  givenName,
  familyName,
  phone,
  email,
  isPublicOfficer,
  publicOfficerFacilities
} from '../../state/ducks/user/selectors';
import { getAuthServerUrl, getAdminServerUrl } from '../../utils/config-utils';

const FullCompanyView = ({ user, company, t, adminMode }) => {
  const userDetails = user && user.user ? user.user.profile : null;
  const changePasswordPath =
    '/Manage/ChangePassword?returnUrl=https://' + window.location.hostname + '/omasivu/omattiedot';
  const authUrl = getAuthServerUrl();
  const changePasswordUrl = authUrl + changePasswordPath;

  if (!userDetails || !company) {
    return <div />;
  }
  return (
    <Container>
      {!adminMode && (
        <>
          <Row>
            <Col span={12} xs={12}>
              <h2 className={styles['heading']}>{t('Käyttäjätiedot')}</h2>
            </Col>
          </Row>

          <Row>
            <Col span={6} sm={10} xs={12} className={styles['details']}>
              <div className={styles.detailRow}>
                <span className={styles.details__label}>{t('Etunimi')}</span>
                <span className={styles.details__value}>{givenName(user)}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.details__label}>{t('Sukunimi')}</span>
                <span className={styles.details__value}>{familyName(user)}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.details__label}>{t('Organisaatio')}</span>
                <span className={styles.details__value}>{company.name}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.details__label}>{t('Puhelin')}</span>
                <span className={styles.details__value}>{phone(user)}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.details__label}>{t('Sähköposti')}</span>
                <span className={styles.details__value}>{email(user)}</span>
              </div>

              <div className={styles.detailRow}>
                <span className={styles.details__label}>{t('Rooli')}</span>
                <span className={styles.details__value}>{t(userDetails.role + '-role-name')}</span>
              </div>

              {isPublicOfficer(user) && (
                <div className={styles.detailRow}>
                  <span className={styles.details__label}>{t('Jätelaitokset')}</span>
                  <div className={styles.details__value}>
                    {publicOfficerFacilities(user).map(facility => (
                      <div key={facility.businessId}>
                        {facility.name + ' (' + facility.businessId + ')'}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <a className={'buttonStyle'} href={changePasswordUrl}>
                  {t('Vaihda salasana')}
                </a>
              </div>
            </Col>
          </Row>
        </>
      )}

      <Row>
        <Col span={12}>
          <h2 className={styles['heading']}>{t('Organisaation tiedot')}</h2>
        </Col>
        <Col span={6} sm={10} xs={12} className={styles['details']}>
          <DetailsEdit company={company} t={t} />
        </Col>
      </Row>

      {!isPublicOfficer(user) && (
        <>
          <Row>
            <Col span={12}>
              <h2 className={styles['heading']}>
                {t('Jätteen vastaanottoon liittyvät luvat ja rekisteritiedot')}
              </h2>
            </Col>
          </Row>
          {Array.isArray(company.registrationDocuments) &&
            company.registrationDocuments.map(doc => (
              <Row key={doc.id}>
                <Col span={6} xs={12} className={styles['details']}>
                  <div className={styles.detailRow}>
                    <span className={styles.details__label}>{t('Tyyppi')}</span>
                    <span>{t('company-registration-type-' + doc.type)}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.details__label}>{t('Tunniste')}</span>
                    <span>{doc.identification}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.details__label}>{t('Myöntävä viranomainen')}</span>
                    <span>{doc.authority}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.details__label}>{t('Rekisteriote')}</span>
                    {Array.isArray(doc.attachments) &&
                      doc.attachments.length > 0 &&
                      doc.attachments.map(attachment => (
                        <span key={attachment.id}>
                          <a
                            href={attachment.url}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {attachment.filename}
                          </a>
                        </span>
                      ))}
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.details__label}>{t('Voimaantulopäivä')}</span>
                    <span>
                      {doc.registrationDate && formatDate(new Date(doc.registrationDate))}
                    </span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.details__label}>{t('Vanhenemispäivä')}</span>
                    <span>{doc.validUntil && formatDate(new Date(doc.validUntil))}</span>
                  </div>
                  <div>
                    <RemoveRegistration t={t} company={company} registration={doc} />
                  </div>
                </Col>
              </Row>
            ))}
          <Row>
            <Col span={6} xs={12}>
              <AddRegistration t={t} isTouchDevice={false} company={company} />
            </Col>
          </Row>
        </>
      )}

      <Row>
        <Col span={12}>
          <h2 className={styles['heading']}>{t('Organisaation käyttäjät')}</h2>
        </Col>
      </Row>
      <Row>
        <Col span={adminMode ? 12 : 6} xs={12}>
          <h5>{t('Organisaatiossa on seuraavat käyttäjät:')}</h5>
          {Array.isArray(company.authorizedUsers) &&
            company.authorizedUsers.map(user => (
              <div key={user.userId} className={styles['users']}>
                <span>{user.name}</span>
                <span>{user.email}</span>
                {adminMode && (
                  <span>
                    <a href={getAdminServerUrl() + '/Identity/UserProfile/' + user.userId}>
                      {t('Muokkaa')}
                    </a>
                  </span>
                )}
              </div>
            ))}
        </Col>
        {Array.isArray(company.authorizationPendingUsers) &&
          company.authorizationPendingUsers.length > 0 && (
            <Col span={adminMode ? 12 : 6} xs={12}>
              <h5>{t('Vahvistusta odottavat käyttäjät')}</h5>
              {company.authorizationPendingUsers.map(user => (
                <div key={user.userId} className={styles['users']}>
                  <span>{user.name}</span>
                  <span>{user.email}</span>
                  {adminMode && (
                    <span>
                      <a href={getAdminServerUrl() + '/Identity/UserProfile/' + user.userId}>
                        {t('Muokkaa')}
                      </a>
                    </span>
                  )}
                  {adminMode && (
                    <>
                      <span>
                        <a
                          href={
                            getAuthServerUrl() +
                            '/Account/AcceptUserAuthorization?userId=' +
                            user.userId
                          }
                        >
                          {t('Auktorisoi')}
                        </a>
                      </span>
                      <span>
                        <a
                          href={
                            getAuthServerUrl() +
                            '/Account/RejectUserAuthorizationWithToken?userId=' +
                            user.userId
                          }
                        >
                          {t('Hylkää')}
                        </a>
                      </span>
                    </>
                  )}
                </div>
              ))}
            </Col>
          )}
      </Row>
    </Container>
  );
};
export default withNamespaces()(FullCompanyView);
