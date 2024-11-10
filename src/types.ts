export interface SpinUpOptions {
  /**
   * URL of the server to ping
   */
  url: string;

  /**
   * Interval in minutes between pings (minimum 5 minutes)
   * @minimum 5
   */
  intervalMinutes: number;

   /**
   * Interval in minutes between pings during high demand 
   */
   intervalMinutesOnTraffic?: number;

  /**
   * Optional callback function to handle successful pings
   */
  onSuccess?: (response: any) => void;

  /**
   * Optional callback function to handle ping failures
   */
  onError?: (error: Error) => void;
}
