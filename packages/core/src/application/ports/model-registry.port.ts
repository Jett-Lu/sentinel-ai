/**
 * Registry contract for discovering available providers and models.
 */
import type { ModelProvider } from "../../domain/interfaces/provider.js";

export interface ModelRegistryPort {
  listProviders(): Promise<ModelProvider[]>;
}
