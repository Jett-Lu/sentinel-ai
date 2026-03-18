/**
 * Shared provider base class for common metadata handling.
 */
import type { ModelProvider } from "@sentinel/core";

export abstract class BaseProvider {
  constructor(protected readonly metadata: ModelProvider) {}

  getProvider() {
    return this.metadata;
  }

  supportsModel(model?: string) {
    if (!model) {
      return true;
    }

    if (!this.metadata.supportedModels || this.metadata.supportedModels.length === 0) {
      return this.metadata.defaultModel === model;
    }

    return this.metadata.supportedModels.includes(model);
  }
}
