import {PingKeeperOptions, ServerPingKeeper} from "..";

describe("ServerPingKeeper", () => {
  test("should throw error for interval less than 5 minutes", () => {
    const options: PingKeeperOptions = {
      url: "http://localhost:3000",
      intervalMinutes: 4,
    };

    expect(() => new ServerPingKeeper(options)).toThrow();
  });

  test("should create instance with valid interval", () => {
    const options: PingKeeperOptions = {
      url: "http://localhost:3000",
      intervalMinutes: 15,
    };

    const keeper = new ServerPingKeeper(options);
    expect(keeper).toBeInstanceOf(ServerPingKeeper);
  });
});
