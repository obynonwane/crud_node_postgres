import express, { Request, Response } from "express";
import { Weapon, MythicalWeaponStore } from "../models/mythical_weapon";

const store = new MythicalWeaponStore();

const index = async (_req: Request, res: Response) => {
  const weapons = await store.index();
  res.json(weapons);
};

const create = async (req: Request, res: Response) => {
  const data = req.body;
  const weapon = await store.create(data);
  res.status(201);
  res.json(weapon);
};

const show = async (req: Request, res: Response) => {
  const id = req.params.id;
  const weapon = await store.show(id);
  res.status(200);
  res.json(weapon);
};

const mythical_weapon_routes = (app: express.Application) => {
  app.get("/product", index);
  app.post("/product", create);
  app.get("/product/:id", show);
};

export default mythical_weapon_routes;
