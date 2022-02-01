const axios = require('axios')

class Telemetry {
  constructor(httpOptions) {
    this.options = { url: httpOptions.url }
    this.axios = axios.create(httpOptions)
  }

  async send(data) {
    try {
      await this.axios.post(this.options.url, data); // user should specify 
    } catch (err) {
      console.log('An error occurred sending telemetry data', err)
    }
  }
}

module.exports = { Telemetry }










