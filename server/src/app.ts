import express, { Router } from "express";
import cors from "cors";
import router from "./routes";
// import router from "./routes";
// import router from "./services/product";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", router);

app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Server is running!"
  });
});

export default app;