/**
 * Small client wrapper placeholder for frontend-to-API communication.
 */
export class ApiClient {
  constructor(private readonly baseUrl: string) {}

  getBaseUrl() {
    return this.baseUrl;
  }
}
