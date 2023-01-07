import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mythical_weapon_routes from "./controllers/mythical_weapon";
import user_routes from "./controllers/user";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

const corsOptions = {
  origin: "http://localhost:3000.com",
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

mythical_weapon_routes(app);
user_routes(app);
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
