import React from 'react';
import { withNamespaces } from 'react-i18next';
import { Col, Row } from '../Layout/Layout';
import styles from './InfoBanner.module.css';

const InfoBanner = ({ content, heading, small }) => {
  const containerClassName = small ? styles.bannerContainerSmall : styles.bannerContainer;
  return (
    <div className={containerClassName}>
      <Row>
        <Col span={1} sm={1} xs={1}>
          <div className={styles.bannerIconContainer}>
            <span className={styles.banner__infoIcon}>i</span>
          </div>
        </Col>
        <Col span={11} sm={11} xs={11}>
          {heading && <h2 className={styles.banner__heading}>{heading}</h2>}
          {content}
        </Col>
      </Row>
    </div>
  );
};

export default withNamespaces()(InfoBanner);
