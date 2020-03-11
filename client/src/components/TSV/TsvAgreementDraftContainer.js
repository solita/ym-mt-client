import React, { Component } from 'react';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import { Container, Row, Col } from '../Layout/Layout';
import Header from '../Header/Header';
import cx from 'classnames';
import { withNamespaces } from 'react-i18next';
import styles from './Tsv.module.css';
import { connect } from 'react-redux';
import { fetchTsvToView } from '../../state/ducks/tsv/operations';
import {
  handleContractChange,
  addContractDraft,
  addFiles,
  deleteFile
} from '../../state/ducks/tsv/actions';
import { default as ViewRfoContainer } from '../RequestForOffer/ViewContainer';
import { Redirect } from 'react-router-dom';
import TsvAgreementDraftCreate from './TsvAgreementDraftCreate';

class TsvAgreementDraftContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tsv: {
        Attachments: []
      },
      redirectTo: false,
      isImport: false
    };
  }

  componentDidMount() {
    const tsvId = this.props.match.params.id;
    const params = new URLSearchParams(this.props.location.search);
    const importcontract = params.get('tuosopimus');
    this.setState({ isImport: importcontract });

    if (this.props.tsvId === undefined) {
      this.props.createNewContractDraft(tsvId, importcontract);
    }
    this.props.fetchTsvToView(tsvId);
  }

  addFiles = data => {
    this.props.addFiles(data);
  };

  deleteFile = fileId => {
    this.props.deleteFile(fileId);
  };

  render() {
    const tsv = this.props.requestView.payload ? this.props.requestView.payload : {};
    const rfo = tsv.rfo;
    const { redirectTo, isImport } = this.state;

    return (
      <>
        <Header />
        <Navigation />
        <Container className={cx('flex-grow-1')}>
          <Row options={{ center: true }}>
            <Col span={8} sm={10} xs={12} className={styles.container}>
              {tsv && tsv.state && tsv.state.state === 'tsv-requested' && (
                <TsvAgreementDraftCreate
                  tsv={tsv}
                  importcontract={isImport}
                  addFiles={this.addFiles}
                  deleteFile={this.deleteFile}
                />
              )}

              {rfo && rfo.id && <ViewRfoContainer rfoToShow={rfo} id={rfo.id} viewOnly={true} />}
            </Col>
          </Row>
        </Container>
        <Footer />
        {redirectTo && <Redirect to={redirectTo} />}
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userState.user,
  requestView: state.tsvState.requestView,
  tsvContract: state.tsvState.form.contract_draft
});

const mapDispatchToProps = dispatch => ({
  fetchTsvToView: id => dispatch(fetchTsvToView(id)),
  createNewContractDraft: (id, isImport) => dispatch(addContractDraft(id, isImport)),
  handleContractChanges: (key, value) => dispatch(handleContractChange(key, value)),
  addFiles: files => dispatch(addFiles(files)),
  deleteFile: fileId => dispatch(deleteFile(fileId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(TsvAgreementDraftContainer));
