import { CoreConstants } from '@campaign-test/frontend-tools';
import { getCampaignMock } from '@campaign-test/models';
import { getCampaignsList } from '../../support/app.po';


describe('Campaigns list', () => {
  const campaignsListUrl = CoreConstants.routePath.campaigns.root;
  const campaignsListMockUrl = '/assets/json-mocks/payload-rmp.json';
  const campaignsListApiUrl = `${Cypress.env('backApi').baseUrlCampaign}`;
  const mockedCampaigns = {
    requests: [
      getCampaignMock({
        requestId: 1,
        campaignName: 'Fake Campaign 1',
      }),
      getCampaignMock({
        requestId: 2,
        campaignName: 'Fake Campaign 2',
      })
    ]};

  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        // url: campaignsListApiUrl, // if we use real API
        url: campaignsListMockUrl, // if we use static JSON mock
      },
      mockedCampaigns
    )
    .as('getCampaigns')
    cy.visit(campaignsListUrl)
  })

  it('Display campaigns', () => {
    getCampaignsList().should((t) => {
      expect(t.length).equal(2)
    })
    expect(cy.get('.campaignName').first()).to.contains(mockedCampaigns.requests[1].campaignName)
    // getCampaignsList().within(() => {
    //   expect(cy.get('.campaignName')).to.contains(mockedCampaigns.requests[1].campaignName)
    // })
  });

  it('Filter campaigns by free search and brand name', () => {
    // @TODO...
  });
});
