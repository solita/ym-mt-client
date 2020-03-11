import { path } from 'ramda';
import {
  TSV_STATE_REQUESTED,
  TSV_STATE_PROCESSING,
  TSV_STATE_CANCELED,
  TSV_STATE_CONTRACT_DRAFT,
  TSV_STATE_REJECTED,
  TSV_STATE_CONTRACT,
  TSV_STATE_CONTRACT_TERMINATED
} from './types';

const stateTranslationKey = state => {
  return 'tsv-state-' + state;
};

const importedContractStateTranslationKey = () => {
  return 'tsv-state-imported-contract';
};

const rejectReasonTranslationKey = reason => {
  return 'tsv-reject-reason-' + reason;
};

const searchStateTranslationKey = searchState => {
  return 'tsv-state-search-' + searchState;
};

export const tsvState = tsv => {
  return path(['state', 'state'], tsv);
};

export const tsvStateTranslated = (t, tsv) => {
  return t(stateTranslationKey(tsvState(tsv)));
};

export const importedContractStateTranslated = t => {
  return t(importedContractStateTranslationKey());
};

export const rejectReasonTranslated = (t, reason) => {
  return t(rejectReasonTranslationKey(reason));
};

export const searchStateTranslated = (t, searchState) => {
  return t(searchStateTranslationKey(searchState));
};

export const tsvCanBeCancelled = tsv => {
  const state = tsvState(tsv);
  return (
    state === TSV_STATE_REQUESTED ||
    state === TSV_STATE_PROCESSING ||
    state === TSV_STATE_CONTRACT_DRAFT
  );
};

export const tsvStateIsRejected = tsv => {
  const state = tsvState(tsv);
  return state === TSV_STATE_REJECTED;
};
export const tsvStateIsWaiting = tsv => {
  const state = tsvState(tsv);
  return state === TSV_STATE_REQUESTED || state === TSV_STATE_PROCESSING;
};

export const getStatesBeforeContract = () => [
  TSV_STATE_REQUESTED,
  TSV_STATE_PROCESSING,
  TSV_STATE_CANCELED,
  TSV_STATE_REJECTED,
  TSV_STATE_CONTRACT_DRAFT
];

export const getPublicOfficerStates = () => [TSV_STATE_REJECTED, TSV_STATE_CONTRACT];

export const getContractStates = () => [TSV_STATE_CONTRACT, TSV_STATE_CONTRACT_TERMINATED];

export const showStateByColor = state => {
  switch (state) {
    case TSV_STATE_CONTRACT:
      return 'green';
    case TSV_STATE_PROCESSING:
      return 'yellow';
    case TSV_STATE_CONTRACT_DRAFT:
      return 'yellow';
    case TSV_STATE_REQUESTED:
      return 'yellow';
    case TSV_STATE_CANCELED:
      return 'red';
    case TSV_STATE_REJECTED:
      return 'red';
    case TSV_STATE_CONTRACT_TERMINATED:
      return 'red';
    default:
      return 'yellow';
  }
};
