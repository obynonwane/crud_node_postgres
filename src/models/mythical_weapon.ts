// @ts-ignore
import Client from "../database";
import express, { Request, Response } from "express";

export type Weapon = {
  id: Number;
  name: string;
  type: string;
  weight: number;
};
export class MythicalWeaponStore {
  async index(): Promise<Weapon[]> {
    try {
      //open connection to the database
      // @ts-ignore
      const conn = await Client.connect();

      //write sql statement
      const sql = "SELECT * FROM mythical_weapons";

      //run the query on a database
      const result = await conn.query(sql);

      //close the database connection
      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Cannot connect to weapons${error}`);
    }
  }

  async create(details): Promise<Weapon> {
    try {
      // console.log(req.body);
      const { name, type, weight } = details;

      console.log(name, type, weight);
      const sql =
        "INSERT INTO mythical_weapons (name, type, weight) VALUES($1, $2, $3) RETURNING *";

      const conn = await Client.connect();
      const result = await conn.query(sql, [name, type, weight]);
      const book = result.rows[0];
      console.log(book);
      conn.release();

      return book;
    } catch (err) {
      // throw new Error(`Could not add new book ${b.name}. Error: ${err}`);
    }
  }

  async delete(req, res): Promise<Weapon> {
    try {
      console.log(req.query);
      const sql = "DELETE FROM mythical_weapons WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [req.query.id]);

      const book = result.rows[0];

      conn.release();

      return res.json(book);
    } catch (err) {
      throw new Error(`Could not delete book ${req.query.id}. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Weapon> {
    try {
      const sql = "SELECT * FROM mythical_weapons WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find book ${id}. Error: ${err}`);
    }
  }
}
