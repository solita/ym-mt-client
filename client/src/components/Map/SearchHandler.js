export default class SearchHandler {
  constructor(onSearchResult) {
    this.onSearchResult = onSearchResult || (() => void 0);
    this.lastSearch = '';
  }

  init(channel) {
    channel.handleEvent('SearchResultEvent', searchResult => {
      this.onSearchResult(searchResult);
    });
  }

  synchronize(channel, state) {
    if (!state.searchTerm) {
      this.lastSearch = '';
      return;
    }

    if (this.lastSearch === state.searchTerm) {
      return;
    }

    if (true || state.searchTerm.length > 1) {
      channel.postRequest('SearchRequest', [state.searchTerm]);
    }

    this.lastSearch = state.searchTerm;
  }
}
