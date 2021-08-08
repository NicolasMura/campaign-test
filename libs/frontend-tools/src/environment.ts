export const environment = {
  production: (window as any).__env?.production || false,

  backendApi: {
    baseUrlCampaign: (window as any).__env?.backendApi?.baseUrlCampaign || 'undefined'
  },
};
