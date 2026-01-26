import { Container } from "inversify";
import { HealthModule } from "../api/v1/modules/health/index.js";

// Setup of IOC container
const container = new Container();

// Registration of classes per module
HealthModule.register(container);

export { container };
