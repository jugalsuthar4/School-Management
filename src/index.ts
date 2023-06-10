import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";
import logger from "./utils/Logger";
import error from "./middleware/error";

//route imports
import studentRoute from "./routes/Student";

//db connection
const mongo_url = process.env.MONGO_URL;
mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

// Extending express name space to have a user property that is used by the authorize middleware
declare module "express" {
  interface Request {
    user?: any;
  }
}

// In case of production environment, disable console logs
if (process.env.NODE_ENV === "production") {
  console.log = (msg: string) => {};
  console.info = (msg: string) => {};
  console.warn = (msg: string) => {};
  console.error = (msg: string) => {};
}

// Setup server
app.set("trust-proxy", 1);

// Block all unwanted headers using helmet
app.use(helmet());

// Disable x-powered-by header separately
app.disable("x-powered-by");
// Enable cors
app.use(cors());

app.use(express.json());

app.disable("etag"); // Disables caching

morgan.token("remote-addr", (req: any) => {
  return req.header("X-Real-IP") || req.ip;
});
app.use(
  morgan("common", {
    stream: {
      write: (message) => logger.http(message),
    },
  })
);

//route middleware

app.use("/api/student", studentRoute);

//error handler
app.use(error);

//port of server
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
