import { getCampaignMock } from '@campaign-test/models';

describe('Campaigns API', () => {
  const campaignsListUrl = `${Cypress.env('backApi').baseUrlCampaign}`;
  const initialCampaigns = [
    getCampaignMock({
      requestId: 1,
      campaignName: 'Fake Campaign 1',
    }),
    getCampaignMock({
      requestId: 2,
      campaignName: 'Fake Campaign 2',
    })
  ];

  it('returns JSON', () => {
    cy.request(campaignsListUrl)
      .its('headers')
      .its('content-type')
      .should('include', 'application/json')
  })

  xit('get all campaigns', () => {
    const campaignsListUrl = `${Cypress.env('backApi').baseUrlCampaign}`;

    cy.request({
      method: 'GET',
      url: campaignsListUrl
    })
      .its('body')
      .then(body => {
        expect(body).to.have.property('access_token').and.not.be.empty;
      });
  });
});
