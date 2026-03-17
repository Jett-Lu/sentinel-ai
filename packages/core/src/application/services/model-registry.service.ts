/**
 * Application service placeholder for provider/model discovery logic.
 */
import type { ModelRegistryPort } from "../ports/model-registry.port.js";

export class ModelRegistryService {
  constructor(private readonly registry: ModelRegistryPort) {}

  listProviders() {
    return this.registry.listProviders();
  }
}
