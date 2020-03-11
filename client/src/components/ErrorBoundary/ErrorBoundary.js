import React, { Component } from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import { Container, Row, Col } from '../Layout/Layout';
import Footer from '../Footer/Footer';
import { withNamespaces } from 'react-i18next';
import { logError } from '../Logger/Log';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error) {
    logError(error.message, window.location.toString(), error.stack);
  }

  render() {
    const { t } = this.props;
    if (this.state.hasError) {
      return (
        <>
          <Header />
          <Navigation />
          <Container className="flex-grow-1">
            <Row>
              <Col span={10}>
                <h1>{t('Jotain meni vikaan')}</h1>
              </Col>
            </Row>
          </Container>
          <Footer />
        </>
      );
    }

    return this.props.children;
  }
}

export default withNamespaces()(ErrorBoundary);
