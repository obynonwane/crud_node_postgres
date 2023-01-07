import express, { Request, Response } from "express";
import { User, UserModel } from "../models/user";

const user = new UserModel();

const index = async (_req: Request, res: Response) => {
  const result = await user.index();
  res.json(result);
};

const create = async (req: Request, res: Response) => {
  const data = req.body;
  const result = await user.create(data);
  res.status(201);
  res.json(result);
};

const show = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await user.show(id);
  res.status(200);
  res.json(result);
};

const signin = async (req: Request, res: Response) => {
  const data = req.body;
  const result = await user.signin(data);
  res.status(200);
  res.json(result);
};

const user_routes = (app: express.Application) => {
  app.get("/user", index);
  app.post("/user", create);
  app.get("/user/:id", show);
  app.post("/user/signin", signin);
};

export default user_routes;
