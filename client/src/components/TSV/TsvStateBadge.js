import cx from 'classnames';
import React from 'react';
import { importedContractStateTranslated, tsvStateTranslated } from './tsv-utils';
import styles from './Tsv.module.css';

export const TsvStateBadge = ({ tsvStateColor, tsv, t, isImported }) => {
  return (
    <h2
      className={cx(
        styles.tag,
        { [styles.tagGreen]: tsvStateColor === 'green' },
        { [styles.tagYellow]: tsvStateColor === 'yellow' },
        { [styles.tagRed]: tsvStateColor === 'red' }
      )}
    >
      {isImported ? importedContractStateTranslated(t) : tsvStateTranslated(t, tsv)}
    </h2>
  );
};
