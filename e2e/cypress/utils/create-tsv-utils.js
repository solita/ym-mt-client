const { addDays, getDateString } = require("../utils/form-utils");

export const createTsvData = () => {
  return {
    facility: "7cd518c1-5773-4b1e-a598-1f1e94353340",
    facilityName: "Vestia Oy",
    requestText: "qa test creates a tsv request",
    contact_name: "qa Solita user name",
    contact_title: "qa Solita user title",
    contact_phone: "qa Solita user phone",
    contact_email: "ym-tori-test.Solita@solita.fi"
  };
};

export const createContractDraftData = () => {
  let tsvDraft = {
    ContractName: "qa testing contract name",
    ContractNumber: "qa testing contract number",
    ContractReference: "qa testing contract reference",
    WasteDescription: "qa testing waste description",
    ServicePriceEurPerTonne: "2",
    ServiceStartDate: getDateString(addDays(new Date(), 2)),
    ServiceEndDate: getDateString(addDays(new Date(), 20)),
    ServiceDescription: "qa testing service description",
    ContractEndDate: getDateString(addDays(new Date(), 20)),
    ContractTerms: "qa testing contract terms",
    ContractTerminationTerms: "qa testing contract termination terms",
    serviceName: "kuljetus",
    serviceNameValue: "Kuljetus"
  };
  return tsvDraft;
};
