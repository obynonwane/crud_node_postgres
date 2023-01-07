// @ts-ignore
import Client from "../database";
import bcrypt from "bcrypt";

export type User = {
  id: Number;
  name: string;
  password: string;
};
export class UserModel {
  async index(): Promise<User[]> {
    try {
      //open connection to the database
      // @ts-ignore
      const conn = await Client.connect();

      //write sql statement
      const sql = "SELECT * FROM users";

      //run the query on a database
      const result = await conn.query(sql);

      //close the database connection
      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Cannot connect to users${error}`);
    }
  }

  async create(details): Promise<User> {
    try {
      // console.log(req.body);
      const { name, password } = details;

      const hash = bcrypt.hashSync(
        password + process.env.PEPPER,
        parseInt(process.env.SALT_ROUNDS)
      );

      const sql =
        "INSERT INTO users (name, password) VALUES($1, $2) RETURNING *";

      const conn = await Client.connect();
      const result = await conn.query(sql, [name, hash]);
      const book = result.rows[0];
      console.log(book);
      conn.release();

      return book;
    } catch (err) {
      // throw new Error(`Could not add new book ${b.name}. Error: ${err}`);
    }
  }

  async signin(details): Promise<User> {
    try {
      const { name, password } = details;
      const sql = "SELECT password FROM users WHERE name=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [name]);

      conn.release();

      if (result.rows.length) {
        const user = result.rows[0];

        if (bcrypt.compareSync(password + process.env.PEPPER, user.password)) {
          return user;
        }
      }

      return null;
    } catch (error) {}
  }

  async delete(req, res): Promise<User> {
    try {
      console.log(req.query);
      const sql = "DELETE FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [req.query.id]);

      const book = result.rows[0];

      conn.release();

      return res.json(book);
    } catch (err) {
      throw new Error(`Could not delete user ${req.query.id}. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }
}
