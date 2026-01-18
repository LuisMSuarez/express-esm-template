import { Container } from "inversify";
import { TYPES } from "../../src/types.js";
import { PingController } from "../../src/controllers/ping.controller.js";
import { IPingService } from "../../src/services/ping.service.interface.js";

describe("PingController", () => {
  let container: Container;
  let controller: PingController;

  // Mock service
  const mockPingService: jest.Mocked<IPingService> = {
    getMessage: jest.fn().mockReturnValue({ message: "pong" }),
  };

  beforeEach(() => {
    container = new Container();

    // Bind mock instead of real service
    container
      .bind<IPingService>(TYPES.PingService)
      .toConstantValue(mockPingService);

    // Bind controller normally
    container.bind(TYPES.PingController).to(PingController);

    controller = container.get(TYPES.PingController);
  });

  it("returns pong message", () => {
    const req: any = { validated: { query: {} }, log: { info: jest.fn() } };
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
