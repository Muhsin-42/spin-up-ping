import axios from "axios";
import debug from "debug";
import {PingKeeperOptions} from "./types";

const log = debug("server-ping-keeper");

export class ServerPingKeeper {
  // Changed the timer type to NodeJS.Timeout
  private timer: NodeJS.Timeout | null = null;
  private readonly options: PingKeeperOptions;

  /**
   * Creates a new ServerPingKeeper instance
   * @param options Configuration options for the ping keeper
   * @throws {Error} If interval is less than 10 minutes
   */
  constructor(options: PingKeeperOptions) {
    if (options.intervalMinutes < 5) {
      throw new Error(
        "Interval must be at least 5 minutes to prevent server abuse"
      );
    }

    this.options = options;
    log(
      "ServerPingKeeper initialized with interval of %d minutes",
      options.intervalMinutes
    );
  }

  /**
   * Starts the periodic ping service
   * @returns void
   */
  public start(): void {
    if (this.timer) {
      log("Ping service is already running");
      return;
    }

    const intervalMs = this.options.intervalMinutes * 60 * 1000;

    this.timer = setInterval(async () => {
      try {
        const response = await axios.get(this.options.url);
        log("Ping successful");
        this.options.onSuccess?.(response.data);
      } catch (error) {
        log("Ping failed:", error);
        if (error instanceof Error) {
          this.options.onError?.(error);
        }
      }
    }, intervalMs);

    log("Ping service started");
  }

  /**
   * Stops the periodic ping service
   * @returns void
   */
  public stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      log("Ping service stopped");
    }
  }
}

export type {PingKeeperOptions} from "./types";
