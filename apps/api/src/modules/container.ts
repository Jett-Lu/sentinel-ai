/**
 * Composition root for provider registry, routing, and telemetry services.
 */
import { DefaultRoutingStrategy, SendChatMessage, type LlmProviderPort, type ProviderHealth } from "@sentinel/core";
import { OllamaAdapter, OpenAiCompatibleAdapter } from "@sentinel/providers";
import { loadEnv } from "../config/env.js";
import { loadProviderConfigs } from "../config/providers.js";
import { InMemoryTelemetry } from "./telemetry.js";

export interface ApplicationContainer {
  ready: boolean;
  providers: LlmProviderPort[];
  sendChatMessage: SendChatMessage;
  telemetry: InMemoryTelemetry;
  getProviderHealth(): Promise<ProviderHealth[]>;
}

function createProviders(): LlmProviderPort[] {
  const configs = loadProviderConfigs();
  const providers: LlmProviderPort[] = [];

  if (configs.ollama.enabled) {
    providers.push(
      new OllamaAdapter(
        {
          id: "ollama",
          name: "Ollama",
          kind: "local",
          enabled: true,
          defaultModel: configs.ollama.model,
          supportedModels: [configs.ollama.model],
          costRank: 1,
          priority: 100,
          capabilities: {
            supportsChat: true,
            supportsStreaming: false,
            supportsTools: false
          }
        },
        {
          baseUrl: configs.ollama.baseUrl,
          model: configs.ollama.model
        }
      )
    );
  }

  if (configs.openRouter.enabled) {
    providers.push(
      new OpenAiCompatibleAdapter(
        {
          id: "openrouter",
          name: "OpenRouter",
          kind: "hosted",
          enabled: true,
          defaultModel: configs.openRouter.model,
          supportedModels: [configs.openRouter.model],
          costRank: 10,
          priority: 50,
          capabilities: {
            supportsChat: true,
            supportsStreaming: false,
            supportsTools: false
          }
        },
        {
          apiKey: configs.openRouter.apiKey!,
          baseUrl: configs.openRouter.baseUrl,
          model: configs.openRouter.model
        }
      )
    );
  }

  return providers;
}

export function createContainer(): ApplicationContainer {
  loadEnv();

  const providers = createProviders();
  const telemetry = new InMemoryTelemetry();

  return {
    ready: providers.length > 0,
    providers,
    telemetry,
    sendChatMessage: new SendChatMessage(providers, new DefaultRoutingStrategy(), telemetry, telemetry),
    getProviderHealth() {
      return Promise.all(providers.map((provider) => provider.checkHealth()));
    }
  };
}

let container: ApplicationContainer | null = null;

export function getContainer() {
  if (!container) {
    container = createContainer();
  }

  return container;
}
