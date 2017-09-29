import { NorrBlogClientPage } from './app.po';

describe('norr-blog-client App', () => {
  let page: NorrBlogClientPage;

  beforeEach(() => {
    page = new NorrBlogClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
