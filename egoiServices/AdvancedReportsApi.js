function AdvancedReportsApi(egoiSdk, callback) {
    var api = new egoiSdk.AdvancedReportsApi()
    var generateEmailBouncesReport = new egoiSdk.GenerateEmailBouncesReport();
    api.generateEmailBouncesReport(generateEmailBouncesReport, callback);
}

module.exports = { AdvancedReportsApi }