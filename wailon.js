const https = require('https')

// function SendLead(data) {

  const options = {
    hostname: 'hst-api.wialon.com',
    port: 443,
    path: '/wialon/ajax.html?svc=token/login&params={"token":"f5498be8dbe04f3d6a7774d4ea9b8ecd23841E9936C879F1372FFE8DBB2E02BE16F1D50E","fl":1}',
    method: 'GET',    
  }


  const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', (d) => {
      console.log(JSON.parse(d.toString()))
    })
  })

  req.on('error', (error) => {
    console.error(error)
  })

  // req.write(data)
  req.end()
// }

// module.exports = { SendLead }