import expres from "express";
import cors from "cors";
import {
  databaseMiddleware,
  errorMiddleware,
  morganMiddleware,
} from "../middlewares";
import routes from "../routes";
import database from "../config/database";

const app = expres();
app.use(cors());
app.use(expres.json());
app.use(morganMiddleware);
app.use(databaseMiddleware);

app.get("/", (_req, res, _next) => {
  res.status(200).send({ status: "OK", message: "API Working" });
});

app.use("/api", routes);
app.use(errorMiddleware);

app.use(async (_req, _res, next) => {
  await database.disconnectToDatabase();
  next();
});

export default app;
