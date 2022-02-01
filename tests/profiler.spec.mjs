import { Profiler } from '../Profiler.mjs'

describe('test profiler', () => {

  test('profiler should run function', () => {
    const profiler = new Profiler();

    const testFunction = jest.fn(() => {
      let count = 0;
      for (let i = 0; i < 999999999; i++) {
        count++
      }
    });
    profiler.measure(testFunction);

    expect(testFunction).toHaveBeenCalled();
  });

  test('should be usable', () => {
    const profiler = new profiler({
      /**
       * what do i want to go here?
       * such that it changes the module's behavior
       * and how should the behavior change?
       */
    });

    profiler.measure({
      /**
       * what do i want to go here?
       * such that it changes the function's behavior
       * and how should the behavior change?
       */
    }, () => {}, () => {})

    function callOne() {
      callTwo()
    }

    function callTwo() {
    }

  });

  test('Only runs if env is set', () => {
    process.env.SPECIAL_ENV_VAR='';
    const profiler = new profiler({
    });

    const testFunction = jest.fn()
    profiler.measure({
    }, testFunction)

    expect(testFunction).not.toHaveBeenCalled()
  });
})