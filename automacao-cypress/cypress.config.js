module.exports = {
  projectId: '5evego',
  e2e: {
    baseUrl: 'http://localhost:4200/#/home',
    setupNodeEvents(on, config) {
      // implement node event listeners here\
      {
        "reporter"; "mochawesome",
          "reporterOptions";
        {
          "reportDir"; "cypress/report/mochawesome-report",
            "overwrite"; true,
              "html"; true,
                "json"; false,
                  "timestamp"; "mmddyyyy_HHMMss"
        }
      }
    }
  },
}
