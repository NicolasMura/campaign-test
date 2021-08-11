// Environment variables loaded at runtime (no need to rebuild the app)
// Useful to deploy our Angular application in different environments (staging, production, etc.) with different configurations
// without changing the the application code and without even rebuilding the application
(function(window) {
  window.__env = window.__env || {};

  // Environment variables
  window.__env.production = false;

  window.__env.backendApi = {};
  window.__env.backendApi.baseUrlCampaign = 'http://localhost:3000';
})(this);
