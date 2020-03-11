import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { curry, forEach, compose, path } from 'ramda';
import styles from './Attachment.module.css';
import { postJson } from '../../services/ApiService';
import Loader from '../Loader/Loader';
import { uuid } from '../../utils/common-utils';

export class Attachment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attachments: [],
      uploadingFiles: false
    };
  }

  uploadFormData = formData => {
    const postUrl = '/api/upload';
    return postJson(postUrl, formData)
      .then(res => {
        const { data } = res;
        return this.props.addFiles(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleFiles = event => {
    this.setState({ uploadingFiles: true });
    if (this.props.uploadingStatusChanged) {
      this.props.uploadingStatusChanged(true);
    }
    const appendFilesToFormData = curry(files => {
      let formData = new FormData();
      forEach(file => formData.append('file', file))(files);
      return formData;
    });

    const formDataToUpload = compose(
      appendFilesToFormData,
      path(['target', 'files'])
    )(event);

    this.uploadFormData(formDataToUpload).finally(() => {
      this.setState({ uploadingFiles: false });
      if (this.props.uploadingStatusChanged) {
        this.props.uploadingStatusChanged(false);
      }
    });
  };

  deleteFile = fileId => () => this.props.deleteFile(fileId);

  render() {
    const { uploadingFiles } = this.state;
    const { t, attachments, accept } = this.props;
    const id = 'file-' + uuid();
    return (
      <div className={this.props.className}>
        <Loader loading={uploadingFiles}>
          <input
            className={styles.attachmentInput__input}
            type="file"
            id={id}
            onChange={this.handleFiles}
            accept={accept || '.doc,.docx,.png,.jpg,.jpeg,.gif,.pdf,.ppt,.pptx,.xls,.xlsx'}
            multiple={this.props.multiple}
          />
          <label className={styles.attachmentInput__label} htmlFor={id}>
            {t(this.props.buttonLabel || 'Lataa tiedosto')}
          </label>
          {Array.isArray(attachments) && attachments.length > 0 && (
            <div className={styles.attachmentListing}>
              {attachments.map(attachment => (
                <div className={styles.attachmentListing__item} key={attachment.id}>
                  <span className={styles.attachmentListing__item__fileName}>
                    {attachment.filename}
                  </span>
                  <button onClick={this.deleteFile(attachment.id)} type="button">
                    {t('Poista')}
                  </button>
                </div>
              ))}
            </div>
          )}
        </Loader>
      </div>
    );
  }
}

export default withNamespaces()(Attachment);
