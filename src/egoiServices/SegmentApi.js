function SegmentApi(egoiSdk, callback, offset) {
    var api = new egoiSdk.SegmentsApi()
    // console.log(api);
    var opts = { offset, limit: 100 }
    api.getAllSegments(1, opts, callback)
}

module.exports = { SegmentApi }