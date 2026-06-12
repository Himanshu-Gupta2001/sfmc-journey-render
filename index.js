const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const CLOUD_PAGE_2_URL = 'https://cloud.email.kpmgus.com/CentralizedFormProcessorBackendCopy';

// Journey Builder calls this when a contact hits this activity
app.post('/execute', async (req, res) => {
  try {
    const inArguments = req.body.inArguments[0];

    await fetch(CLOUD_PAGE_2_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        CFP_PK: inArguments.CFP_PK || '',
        PrimaryKey: inArguments.PrimaryKey || '',
        EmailAddress: inArguments.EmailAddress || '',
        FirstName: inArguments.FirstName || '',
        LastName: inArguments.LastName || '',
        Company: inArguments.Company || '',
        JobTitle: inArguments.JobTitle || '',
        Country: inArguments.Country || '',
        Phone: inArguments.Phone || '',
        CID: inArguments.CID || '',
        medium: inArguments.medium || '',
        MID: inArguments.MID || '',
        term: inArguments.term || '',
        Campaign: inArguments.Campaign || '',
        Source: inArguments.Source || '',
        content: inArguments.content || '',
        Full_Page_URL: inArguments.Full_Page_URL || '',
        db_annual_sales: inArguments.db_annual_sales || '0',
        db_city: inArguments.db_city || '',
        db_company_name: inArguments.db_company_name || '',
        db_country_name: inArguments.db_country_name || '',
        db_employee_count: inArguments.db_employee_count || '0',
        db_industry: inArguments.db_industry || '',
        db_primary_naics: inArguments.db_primary_naics || '',
        db_primary_sic: inArguments.db_primary_sic || '',
        db_state: inArguments.db_state || '',
        db_street_address: inArguments.db_street_address || '',
        db_sub_industry: inArguments.db_sub_industry || '',
        db_web_site: inArguments.db_web_site || '',
        db_zip: inArguments.db_zip || '',
        confirmationPage: inArguments.confirmationPage || '',
        formName: inArguments.formName || '',
        pageURL: inArguments.pageURL || '',
        conditionalProcessing: inArguments.conditionalProcessing || '',
        Preference1: inArguments.Preference1 || '',
        Preference2: inArguments.Preference2 || '',
        Preference3: inArguments.Preference3 || '',
        Preference4: inArguments.Preference4 || '',
        Preference5: inArguments.Preference5 || '',
        Preference6: inArguments.Preference6 || '',
        Preference7: inArguments.Preference7 || '',
        Preference8: inArguments.Preference8 || '',
        Preference9: inArguments.Preference9 || '',
        Preference10: inArguments.Preference10 || '',
        Tactic_ID: inArguments.Tactic_ID || '',
        Lead_Source: inArguments.Lead_Source || '',
        Inquiry_Type: inArguments.Inquiry_Type || '',
        Message: inArguments.Message || '',
        Department: inArguments.Department || '',
        Level: inArguments.Level || '',
        Function: inArguments.Function || '',
        Lead_Source_Detail: inArguments.Lead_Source_Detail || '',
        marketingTheme: inArguments.marketingTheme || '',
        marketingCampaign: inArguments.marketingCampaign || '',
        marketingSubCampaign: inArguments.marketingSubCampaign || '',
        RFP_Attachments: inArguments.RFP_Attachments || ''
      })
    });

    res.status(200).json({ status: 'ok' });

  } catch (err) {
    console.error('Execute error:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Required Journey Builder lifecycle endpoints
app.post('/publish',  (req, res) => res.status(200).json({}));
app.post('/validate', (req, res) => res.status(200).json({}));
app.post('/stop',     (req, res) => res.status(200).json({}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
