/**
 * Provider metadata used across registry, routing, and observability flows.
 */
import type { ProviderCapability } from "../value-objects/provider-capability.js";

export interface ModelProvider {
  id: string;
  name: string;
  capabilities: ProviderCapability;
}
