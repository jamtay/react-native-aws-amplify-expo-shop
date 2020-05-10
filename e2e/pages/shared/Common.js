const EXPECTED_HEADER = 'Quevid 19';

export default class Common {
  get headerComponent() {
    return element(by.text(EXPECTED_HEADER));
  }
}
