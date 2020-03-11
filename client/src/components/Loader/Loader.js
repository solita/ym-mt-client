import React, { PureComponent } from 'react';
import styles from './Loader.module.css';

class Loader extends PureComponent {
  render() {
    const { loading, children, hideWhileLoading } = this.props;

    return (
      <>
        {loading ? (
          <div className={styles.loaderWrapper}>
            {!hideWhileLoading && children}
            <div className={styles.loader}>
              <div className={styles.spinner} />
            </div>
          </div>
        ) : (
          <>{children}</>
        )}
      </>
    );
  }
}

export default Loader;
