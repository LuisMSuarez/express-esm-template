import { PingResponse } from "../contracts/pingResponse.js";

export interface IPingService {
  getMessage(): PingResponse;
}
