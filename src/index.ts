import axios, { AxiosError, AxiosResponse } from "axios";
import debug from "debug";
import { SpinUpOptions } from "./types";

const log = debug("server-ping-keeper");

/**
 * Class responsible for periodically pinging a server and dynamically adjusting the interval.
 */
export class SpinUp {
  // Changed the timer type to NodeJS.Timeout
  private timer: NodeJS.Timeout | null = null;
  private readonly options: SpinUpOptions;
  private previousResponseTime: number = 0;

  /**
   * Creates a new ServerPingKeeper instance
   * @param options Configuration options for the ping keeper
   * @throws {Error} If interval is less than 10 minutes
   */
  constructor(options: SpinUpOptions) {
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

    this.ping();
  }

  /**
   * Sends a ping request to the server and handles the response.
   */
  private ping(): void {
    const startTime = Date.now();

    axios
      .get(this.options.url)
      .then((response: AxiosResponse) => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        log("Ping successful");
        this.options.onSuccess?.(response.data);

        // Dynamically adjust interval
        this.adjustInterval(responseTime);

        // Schedule next ping
        this.timer = setTimeout(() => this.ping(), this.getInterval());
      })
      .catch((error: AxiosError | Error) => {
        log("Ping failed:", error);
        if (error instanceof Error) {
          this.options.onError?.(error);
        }

        // On error, increase interval to avoid overloading the server
        this.adjustInterval(this.previousResponseTime * 2); // Double the previous response time

        // Schedule next ping
        this.timer = setTimeout(() => this.ping(), this.getInterval());
      });
  }

  /**
   * Dynamically adjusts the ping interval based on the previous response time.
   * @param responseTime - The time taken for the previous ping request.
   */
  private adjustInterval(responseTime: number): void {
    this.previousResponseTime = responseTime;

    if (responseTime > 1000) {

      log("High traffic detected, increasing interval to %d minutes", this.options.intervalMinutes);

      // If response time is greater than 1 second, increase interval up to intervalMinutesOnTraffic
      this.options.intervalMinutes = Math.min(
        this.options.intervalMinutes + 1,
        this.options.intervalMinutesOnTraffic || 10
      );
    } else if (responseTime < 500 && this.options.intervalMinutes > 5) {

      log("Low traffic detected, decreasing interval to %d minutes", this.options.intervalMinutes);

      // If response time is less than 0.5 seconds and interval is greater than the minimum, decrease interval
      this.options.intervalMinutes = Math.max(
        this.options.intervalMinutes - 1,
        5
      );
    }
  }

  /**
   * Gets the current ping interval in milliseconds.
   * @returns The ping interval in milliseconds.
   */
  private getInterval(): number {
    return this.options.intervalMinutes * 60 * 1000;
  }

  public stop(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
      log("Ping service stopped");
    }
  }
}

export type { SpinUpOptions } from "./types";
