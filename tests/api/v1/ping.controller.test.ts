import { PingController } from "../../../src/api/v1/modules/health/index.js";
import { IPingService } from "../../../src/api/v1/modules/health/ping.service.interface.js";

describe("PingController", () => {
  let controller: PingController;
  let mockPingService: jest.Mocked<IPingService>;

  beforeEach(() => {
    mockPingService = {
      getMessage: jest.fn().mockReturnValue({ message: "pong" }),
    };

    controller = new PingController(mockPingService);
  });

  it("returns pong message", () => {
    const req: any = {
      validated: { query: {} },
      log: { info: jest.fn() },
    };

    const res: any = {
      json: jest.fn(),
    };

    controller.handlePing(req, res);

    expect(mockPingService.getMessage).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      message: "pong",
      name: "anonymous",
    });
  });
});
