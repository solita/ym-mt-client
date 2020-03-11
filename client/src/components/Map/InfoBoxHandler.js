import { equals } from 'ramda';

export default class InfoBoxHandler {
  constructor(onInfoBoxClose, onInfoBoxAction) {
    this.onInfoBoxClose = onInfoBoxClose || (() => void 0);
    this.onInfoBoxAction = onInfoBoxAction || (() => void 0);
    this.infoBoxOnMap = undefined;
  }

  init(channel) {
    channel.handleEvent('InfoBox.InfoBoxEvent', this.onInfoBoxClose);
    channel.handleEvent('InfoboxActionEvent', this.onInfoBoxAction);
  }

  synchronize(channel, state) {
    const { infoBox } = state;
    if (!infoBox) {
      channel.postRequest('InfoBox.HideInfoBoxRequest');
      this.infoBoxOnMap = undefined;
      return;
    }

    if (!infoBox || equals(this.infoBoxOnMap, infoBox)) {
      return;
    }

    channel.postRequest('InfoBox.ShowInfoBoxRequest', infoBox);

    this.infoBoxOnMap = infoBox;
  }
}
