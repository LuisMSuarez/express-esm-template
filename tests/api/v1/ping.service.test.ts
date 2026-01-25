import { PingService } from "../../../src/api/v1/modules/health/index.js";

describe("PingService", () => {
  let service: PingService;

  beforeEach(() => {
    service = new PingService();
  });

  it("returns the expected pong message", () => {
    const result = service.getMessage();

    expect(result).toEqual({ message: "pong" });
  });
});
