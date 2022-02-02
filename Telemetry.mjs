import axios from 'axios';

export class Telemetry {
  constructor(httpOptions) {
    this.options = { url: httpOptions.url }
    // this.axios = axios.create(httpOptions)
  }

  async send(data) {
    console.log("this.options: ", this.options)
    try {
      await axios.post(this.options.url, data); // user should specify 
    } catch (err) {
      console.log('An error occurred sending telemetry data', err)
    }
  }
}











