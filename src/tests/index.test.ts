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
});
