import axios from 'axios';

export class Telemetry {
  constructor(httpOptions) {
    this.options = { url: httpOptions.url }
    this.axios = axios.create(httpOptions)
  }

  async send(data) {
    try {
      console.log("in send")
      await this.axios.post(this.options.url, data); // user should specify 
    } catch (err) {
      console.log('An error occurred sending telemetry data', err)
    }
  }
}











