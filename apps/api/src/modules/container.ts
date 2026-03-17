/**
 * Composition root placeholder where providers, routing, and services will be wired together.
 */
export interface ApplicationContainer {
  ready: boolean;
}

export function createContainer(): ApplicationContainer {
  return {
    ready: true
  };
}
