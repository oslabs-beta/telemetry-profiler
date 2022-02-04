<h3 align='center' >Telemetry Profiler</h3>

<h3 align='center'> Telemetry Profiler is an open-source library that enables developers to acquire real time performance measurements for rapid testing and analytics. </h3>


### Install via npm

 ```bash
 $ npm install @oslabs-beta/telemetry-profiler@latest
 ```
 
 ### Install via yarn

 ```bash
 $ yarn add @oslabs-beta/telemetry-profiler@latest
 ```

### Install via package.json:

 `"@oslabs-beta/telemetry-profiler": "^1.0.15"`

### Features
- Measurement of data via duration time
- EventLoop usage metrics
- Log history of previous runtimes
- Custom runtime intervals for throttling to match site limits
- Lightweight with no large required dependencies

### Disclaimer

Telemetry Profiler is currently in beta and many features are still experimental and may not work as intended. If you have any feature ideas or would like to provide feedback, please put in an Issue. Thanks.

### Usage

To get started, simply import the Profiler module into your application.

```ts
import { Profiler } from '@oslabs-beta/telemetry-profiler'
```

Once imported, simply instantiate a new Profiler as shown below along with any of the relevant options:

```ts
const profiler = new Profiler({ eventloopData: BOOLEAN, batch: BOOLEAN, url: '<YOUR URL HERE>' })
```

Afterwards, you can simply wrap any function you want telemetry data on and will receive immediate feedback.

Note: If batching is set to true, you must pass a { emit: true } object along with your function in the profiler.measure function in order for it to be sent off to the provided URL properly. Otherwise, data will be sent immediately.

The below sample is 

```ts
profiler.measure(myCoolFunction)(/* functionArguments */);
profiler.measure(myCoolFunction2)(/* otherfunctionArguments */);
profiler.measure(myCoolFunction3, { emit: true })(/* someOtherFunctionArguments */);
```

Asynchronous and synchronous functions are wrapped in the same manner and do not need to be differentiated in any way.

Your response should look something like this:

```ts
{
  performance: [
    {
      name: 'Function execution terminated',
      entryType: 'measure',
      startTime: 10724.590511001647,
      duration: 6.71425199508667,
      detail: [Object]
    },
    {
      name: 'Function execution terminated',
      entryType: 'measure',
      startTime: 10731.471342995763,
      duration: 5.994003005325794,
      detail: [Object]
    },
    {
      name: 'Function execution terminated',
      entryType: 'measure',
      startTime: 10737.565986000001,
      duration: 5.963962994515896,
      detail: [Object]
    }
  ],
  eventUtilization: null
}
```

### Testing input functions

Basic testing with Jest is implemented. This feature is still being expanded upon.

 - `jest` test runner




