import { AngularDbPage } from './app.po';

describe('angular-db App', () => {
  let page: AngularDbPage;

  beforeEach(() => {
    page = new AngularDbPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
