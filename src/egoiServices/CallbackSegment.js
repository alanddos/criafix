var CallbackSegment = async function (error, data, response) {
    if (error) {
        console.error(error);
    } else {
        console.log(data);
        // if (data.items[0].base.status === "removed") {
        //     offset++;
        //     ContactsApi(egoiSdk, callback, offset)
        // }

        // return

        // if (offset <= data.total_items) {
        //     var dados = response.body
        //     dados.items.map(v => {
        //         const lead = SanitizeData(v);
        //         console.log(lead)
        //         SendLead(lead)                
        //     })
        //     offset++;
        //     ContactsApi(egoiSdk, callback, offset)
        // } else {
        //     offset = 1
        //     ContactsApi(egoiSdk, callback, offset)
        // }
    }
};

module.exports = { CallbackSegment }