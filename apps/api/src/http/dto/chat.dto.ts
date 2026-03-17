/**
 * Request and response DTOs define the API contract independently from domain models.
 */
export interface ChatMessageDto {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatRequestDto {
  provider?: string;
  model?: string;
  messages: ChatMessageDto[];
}

export interface ChatResponseDto {
  id: string;
  output: string;
}
