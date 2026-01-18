export interface PingResponse {
  message: string;
}

export interface IPingService {
  getMessage(): PingResponse;
}
