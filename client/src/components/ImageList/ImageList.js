import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { Col, Container, Row } from '../Layout/Layout';
import Loader from '../Loader/Loader';
import styles from './ImageList.module.css';

const initializeObjectKeysWithValue = (object, keys, value) => {
  keys.forEach(key => {
    object[key] = value;
  });
  return object;
};

class ImageList extends Component {
  constructor(props) {
    super(props);

    const { willNotLoad, images } = this.props;
    const imageIds = images.map(function(image) {
      return image.id;
    });
    const initialImageStatus = willNotLoad ? 'will-not-load' : 'loading';

    this.state = {
      openImageId: null,
      imageStatuses: initializeObjectKeysWithValue({}, imageIds, initialImageStatus)
    };
  }

  handleImageLoaded(imageId) {
    this.setState(prevState => ({
      imageStatuses: {
        ...prevState.imageStatuses,
        [imageId]: 'loaded'
      }
    }));
  }

  handleKeyDown({ keyCode }) {
    if (keyCode !== 27) {
      return null;
    }

    this.toggleImage(null);
  }

  toggleImage(imageId) {
    this.setState({ openImageId: imageId });
  }

  renderModal() {
    const { openImageId } = this.state;
    const { t, images } = this.props;

    if (!openImageId) {
      return null;
    }

    const currentImage = images.find(image => image.id === openImageId);

    return (
      <Container className={styles.dimmer} onClick={() => this.toggleImage(null)}>
        <Row className={styles.container} options={{ center: true }}>
          <Col>
            <img
              alt={currentImage.filename}
              className={styles.image__large}
              key={currentImage.id}
              onClick={e => e.stopPropagation()}
              src={currentImage.url}
            />
          </Col>
        </Row>
        <Row className={styles.container} options={{ center: true }}>
          <Col>
            <a
              className="buttonStyle"
              download
              href={currentImage.url}
              onKeyDown={e => this.handleKeyDown(e)}
            >
              {t('Lataa kuva')}
            </a>
            <button
              autoFocus={true}
              className={styles.dimmerButton}
              onClick={() => this.toggleImage(null)}
              onKeyDown={e => this.handleKeyDown(e)}
            >
              {t('Sulje kuva')}
            </button>
          </Col>
        </Row>
      </Container>
    );
  }

  render() {
    const { images } = this.props;
    const { imageStatuses } = this.state;

    return (
      <>
        {this.renderModal()}
        <div className={styles.wrapper}>
          {images.map(image => (
            <div
              className={styles.container}
              key={image.id}
              onClick={() => this.toggleImage(image.id)}
            >
              <Loader loading={imageStatuses[image.id] === 'loading'}>
                <img
                  alt={image.filename}
                  className={styles.image}
                  src={`${image.url}?preset=tnailmaxheight300`}
                  onLoad={this.handleImageLoaded.bind(this, image.id)}
                />
              </Loader>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default withNamespaces()(ImageList);
