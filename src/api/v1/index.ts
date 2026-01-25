import { Router } from "express";
import router from "./routes.js";

const v1 = Router();
v1.use(router);

export default v1;
