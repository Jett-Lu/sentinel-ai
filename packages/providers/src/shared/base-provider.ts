/**
 * Shared provider base class for common metadata handling.
 */
import type { ModelProvider } from "@sentinel/core";

export abstract class BaseProvider {
  constructor(protected readonly metadata: ModelProvider) {}

  getProvider() {
    return this.metadata;
  }
}
