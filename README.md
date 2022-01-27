<h3 align='center' >Telemetry Profiler</h3>

<h3 align='center'> Telemetry Profiler is an open-source library built on Next.js which enables developers to acquire real time performance measurements. </h3>


### Install via npm

 `$npm install @oslabs-beta/telemetry-profiler@1.0.0`

### Install via package.json:

 `"@oslabs-beta/telemetry-profiler": "1.0.0"`

### Features
- Measurement of data via duration time
- EventLoop usage metrics
- Log history of previous runtimes
- Custom runtime intervals for throttling to match site limits
- Lightweight with no large required dependencies


### Usage
Utilize async functions to measure performance in each interval! 

  ```
  const coolFunc = async (args) => {
      setTimeout(() => {
        let count = 0;
        for (let i = 0; i < 9999999; i++) {
          count++
        }
      }, 1999)
    }
    
    profiler.measure(coolFunc)
  ```
    
### Testing input functions

Simply run "npm test" in your terminal to execute all tests!

 - `jest` test runner







