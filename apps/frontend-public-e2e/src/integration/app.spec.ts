import { getPageTitle } from '../support/app.po';


describe('frontend-public', () => {
  const rootUrl = `${Cypress.env('routes').root}`;

  beforeEach(() => cy.visit(rootUrl));

  it('Display welcome message', () => {
    getPageTitle().contains('All requests');
  });
});
