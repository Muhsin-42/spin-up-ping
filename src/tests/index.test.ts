import {SpinUp, SpinUpOptions} from "..";

describe("ServerPingKeeper", () => {
  test("should throw error for interval less than 5 minutes", () => {
    const options: SpinUpOptions = {
      url: "http://localhost:3000",
      intervalMinutes: 4,
    };

    expect(() => new SpinUp(options)).toThrow();
  });

  test("should create instance with valid interval", () => {
    const options: SpinUpOptions = {
      url: "http://localhost:3000",
      intervalMinutes: 15,
    };

    const keeper = new SpinUp(options);
    expect(keeper).toBeInstanceOf(SpinUp);
  });

  // Adding test case for the dynamic interval adjustment but its private class
  // method so we can't access it directly. We can test it indirectly by testing
  // the public method getInterval().
  it("should adjust interval based on response time", () => {
    const options: SpinUpOptions = {
      url: "http://localhost:3000",
      intervalMinutes: 15, // Initial interval
      intervalMinutesOnTraffic: 5, // Interval during traffic
    };

    const keeper = new SpinUp(options);
    keeper["adjustInterval"](500); 
    expect(keeper["getInterval"]()).toBe(options.intervalMinutes * 60 * 1000); // Expect initial interval (15 minutes)

    keeper["adjustInterval"](1500); // Simulate high response time
    expect(keeper["getInterval"]()).toBe(options.intervalMinutesOnTraffic! * 60 * 1000); // Expect adjusted interval (5 minutes) 
  });

});
