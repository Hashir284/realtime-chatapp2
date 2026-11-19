import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./configuration/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import path from "path"
import userRouter from "./routes/user.routes.js";

const app = express();
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

const __dirname = path.resolve();//D:\shariq\saylani-batch-18\react-with-server\ecom-without-db
const __frontend = path.join(__dirname, './Web/dist')//D:\shariq\saylani-batch-18\react-with-server\ecom-without-db\web\build
app.use('/', express.static(__frontend))
app.use("/*splat", express.static(__frontend))

const PORT = process.env.PORT || 5000
app.listen(PORT, "0.0.0.0", () => {
  connectDb()
  console.log(`Server is running on http://localhost:${PORT}`);
}); 