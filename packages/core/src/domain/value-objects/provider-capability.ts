/**
 * Capability metadata used by routing and model registry components.
 */
export interface ProviderCapability {
  supportsChat: boolean;
  supportsStreaming: boolean;
  supportsTools: boolean;
}
