import { Telemetry } from './Telemetry.mjs';
import { PerformanceObserver, performance } from 'perf_hooks';

export class Profiler {
  profile = {
    performance: [],
    eventUtilization: null,
  };

  /*
  Additional features:
  1.  Two options:
      A) Send data as it occurs
      B) Send data as single batch profile at end of process

  */
  emit = false;


  /*

  interface ProfilerOptions {
    eventLoopData: boolean
    batch: boolean
  }

  */

  constructor(options /* ProfilerOptions */) {
    const { eventLoopData, batch, ...httpOptions } = options;
    /*
    AS DEFAULT OPTIONS
    1. Add optional event loop data
    2. Add optional nodeTiming
    3. Add optional timeOrigin
    4. Optional Performance.toJSON (might be better in constructor)
    */
      this.options = options;
      this.obs = new PerformanceObserver((items) => {
        console.log(items)
        const entries = items.getEntries()
        // if options.bundle = true, then change behavior
        this.profile.performance.push(...entries)
        // else, axios call using Telemetry module
        performance.clearMarks();
        if (this.batch) {
          if (this.emit) this.telemetry.send(this.profile);
        } else {
          this.profile.performance = items;
          this.telemetry.send(this.profile); // maybe wrapper object for consistency to send the same type every time
        }
      });
      this.telemetry = new Telemetry({
        ...httpOptions
      })
    
  }

  /*
  interface MeasureOptions {
    emit: boolean
    eventLoopData: boolean
  }
  
  */

    measure(func, options /* MeasureOptions */) {
      /*
      AS OVERRIDES
      1. Add optional event loop data
      2. Add optional nodeTiming
      3. Add optional timeOrigin
      4. Optional Performance.toJSON (might be better in constructor)
      */
      //  toJSon() {
      // if (options.emit) { // erroring out for some reason || RECHECK LOGIC
      //   this.emit = true;
      // }
      if (!options) options = {};
      if (process.env.TELEMETRY) { // conditional to check for env var
        return (...args) => {
          this.obs.observe({ type: 'measure' });
          performance.mark('A', { detail: func.name });

          if (func.constructor.name === "AsyncFunction") {
            return new Promise((resolve, reject) => {
              return func(...args).then((res) => {
                console.log("is async")
                if (this.options.eventLoopData || options.eventLoopData) { // put back in || options.eventLoopData
                  this.profile.eventUtilization = performance.eventLoopUtilization(this.profile.eventUtilization);
                  console.log("profile.eventUtilization for async", this.profile.eventUtilization)
                }
                performance.measure('Function execution terminated', {
                  start: 'A',
                  detail: { name: func.name, type: func.constructor.name } // TODO: remove stringify || check again later
                });
                return res;
              })
            })
          }

          if (this.options.eventLoopData || options.eventLoopData) { // put back in || options.eventLoopData
            this.profile.eventUtilization = performance.eventLoopUtilization(this.profile.eventUtilization)
            console.log("profile.eventUtilization for non async", this.profile.eventUtilization)
          }
      
          func(...args)
          performance.measure('Function execution terminated', {
            start: 'A',
            detail: { name: func.name, type: func.constructor.name }
          });
        }
      } else {
        return func
      }
    
    }
  
report() {
  // TODO: establish longest running functions
  // by parsing runtime
  // then write to file or send analysis 
  // (output in desc order by duration) to
  // endpoint for reporting purposes
}

async emit() {
  // IF building profile instead of sending at each measurement
  // THEN you need an emit function to send the build profile
  // You may need this if building the profile, and an exception 
  // occurs.
  this.telemetry.send()
  console.log('emitting profile')
  console.log(this.profile)
}
}
