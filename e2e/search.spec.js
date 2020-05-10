import SearchScreen from './pages/SearchPage';
import Common from './pages/shared/Common';

describe('Search functionality', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have header element displayed', async () => {
    const commonPage = new Common();
    await expect(commonPage.headerComponent).toBeVisible();
  });

  it('should have search elements displayed', async () => {
    const searchPage = new SearchScreen();
    await expect(searchPage.nameInput).toBeVisible();
    await expect(searchPage.addressInput).toBeVisible();
    await searchPage.typeName('name');
    await searchPage.typeAddress('address');
    await expect(searchPage.nameInput).toHaveText('name');
    await expect(searchPage.addressInput).toHaveText('address');
  });

  it('should return no results when search criteria is empty', async () => {
    const searchPage = new SearchScreen();
    await expect(searchPage.nameInput).toBeVisible();
    await expect(searchPage.addressInput).toBeVisible();

    await expect(searchPage.resultsReturnedCard).toBeNotVisible();
    await expect(searchPage.noResultsReturnedCard).toBeVisible();
  });

  it('should return results when searching by name', async () => {
    const searchPage = new SearchScreen();
    await expect(searchPage.nameInput).toBeVisible();
    await expect(searchPage.addressInput).toBeVisible();

    await searchPage.typeName('booths');

    await expect(searchPage.resultsReturnedCard).toBeVisible();
    await expect(searchPage.noResultsReturnedCard).toBeNotVisible();

    await expect(searchPage.firstResult).toBeVisible();
    await expect(searchPage.secondResult).toBeVisible();
  });

  it('should return results when searching by address', async () => {
    const searchPage = new SearchScreen();
    await expect(searchPage.nameInput).toBeVisible();
    await expect(searchPage.addressInput).toBeVisible();

    await searchPage.typeAddress('lytham');

    await expect(searchPage.resultsReturnedCard).toBeVisible();
    await expect(searchPage.noResultsReturnedCard).toBeNotVisible();

    await expect(searchPage.firstResult).toBeVisible();
    await expect(searchPage.secondResult).toBeNotVisible();
  });

  it('should return results when searching by name and address case insenstive', async () => {
    const searchPage = new SearchScreen();
    await expect(searchPage.nameInput).toBeVisible();
    await expect(searchPage.addressInput).toBeVisible();

    await searchPage.typeName('booths');
    await searchPage.typeAddress('lytham');

    await expect(searchPage.resultsReturnedCard).toBeVisible();
    await expect(searchPage.noResultsReturnedCard).toBeNotVisible();

    await expect(searchPage.firstResult).toBeVisible();
    await expect(searchPage.secondResult).toBeNotVisible();

    await searchPage.replaceName('BoOThs');
    await searchPage.replaceAddress('LyThAM');

    await expect(searchPage.resultsReturnedCard).toBeVisible();
    await expect(searchPage.noResultsReturnedCard).toBeNotVisible();

    await expect(searchPage.firstResult).toBeVisible();
    await expect(searchPage.secondResult).toBeNotVisible();
  });

  it('should return no results when searching by name and address less than 3 chars', async () => {
    const searchPage = new SearchScreen();
    await expect(searchPage.nameInput).toBeVisible();
    await expect(searchPage.addressInput).toBeVisible();

    await searchPage.typeName('bo');
    await searchPage.typeAddress('ly');

    await expect(searchPage.resultsReturnedCard).toBeNotVisible();
    await expect(searchPage.noResultsReturnedCard).toBeVisible();

    await expect(searchPage.firstResult).toBeNotVisible();
    await expect(searchPage.secondResult).toBeNotVisible();

    await searchPage.typeName('o');

    await expect(searchPage.firstResult).toBeVisible();
    await expect(searchPage.secondResult).toBeVisible();

    await searchPage.typeAddress('t');
    await expect(searchPage.firstResult).toBeVisible();
    await expect(searchPage.secondResult).toBeNotVisible();
  });

  it('should return no results when searching by name and address and then removing search criteria', async () => {
    const searchPage = new SearchScreen();
    await expect(searchPage.nameInput).toBeVisible();
    await expect(searchPage.addressInput).toBeVisible();

    await searchPage.typeName('Booths');
    await searchPage.typeAddress('Lytham');

    await expect(searchPage.resultsReturnedCard).toBeVisible();
    await expect(searchPage.noResultsReturnedCard).toBeNotVisible();

    await expect(searchPage.firstResult).toBeVisible();
    await expect(searchPage.secondResult).toBeNotVisible();

    await searchPage.replaceName('');
    await searchPage.replaceAddress('');

    await expect(searchPage.resultsReturnedCard).toBeNotVisible();
    await expect(searchPage.noResultsReturnedCard).toBeVisible();

    await expect(searchPage.firstResult).toBeNotVisible();
    await expect(searchPage.secondResult).toBeNotVisible();
  });
});
