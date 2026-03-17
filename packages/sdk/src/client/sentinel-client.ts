/**
 * Minimal client placeholder for calling the SentinelAI HTTP API.
 */
export class SentinelClient {
  constructor(private readonly baseUrl: string) {}

  getBaseUrl() {
    return this.baseUrl;
  }
}
