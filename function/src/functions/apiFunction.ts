import expres from "express";
import cors from "cors";
import { errorMiddleware, morganMiddleware } from "../middlewares";
import routes from "../routes";

const app = expres();
app.use(cors());
app.use(expres.json());
app.use(morganMiddleware);

app.get("/", (_req, res, _next) => {
  res.status(200).send({ status: "OK", message: "API Working" });
});

app.use("/api", routes);
app.use(errorMiddleware);

export default app;
