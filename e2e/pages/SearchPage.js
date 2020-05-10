const NAME_SEARCH_ID = 'name-search';
const ADDRESS_SEARCH_ID = 'address-search';
const RESULTS_CARD_ID = 'results-card-0';
const NO_RESULTS_TABLE = 'no-results-card';

const EXPECTED_LYTHAM_RESULT = 'Booths Lytham';
const EXPECTTED_BOOTHS_GENERIC_RESULT = 'Booths Penrith';

export default class SearchScreen {
  get nameInput() {
    return element(by.id(NAME_SEARCH_ID));
  }

  get addressInput() {
    return element(by.id(ADDRESS_SEARCH_ID));
  }

  get resultsReturnedCard() {
    return element(by.id(RESULTS_CARD_ID));
  }

  get noResultsReturnedCard() {
    return element(by.id(NO_RESULTS_TABLE));
  }

  get firstResult() {
    return element(by.text(EXPECTED_LYTHAM_RESULT));
  }

  get secondResult() {
    return element(by.text(EXPECTTED_BOOTHS_GENERIC_RESULT));
  }

  typeName(name) {
    return this.nameInput.typeText(name);
  }

  typeAddress(address) {
    return this.addressInput.typeText(address);
  }

  replaceName(name) {
    return this.nameInput.replaceText(name);
  }

  replaceAddress(address) {
    return this.addressInput.replaceText(address);
  }
}
