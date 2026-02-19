import { Client } from "pg";

class Database {
  #client;
  constructor() {
    this.#client = new Client({
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
    });
  }

  getClient() {
    return this.#client;
  }

  /** ||>=========================================================================================<||
   *
   * @param {string} queryObject
   * @returns {} Any
   *
   * ||>=========================================================================================<||
   */
  async query(queryObject) {
    await this.#client.connect();
    try {
      const result = await this.#client.query(queryObject);
      return result;
    } catch (error) {
      console.error(error);
    } finally {
      await this.#client.end();
    }
  }
}

/** ||>=========================================================================================<||
 *
 * @param {string} queryObject
 * @returns {} Any
 *
 * ||>=========================================================================================<||
 */
async function query(queryObject) {
  const database = new Database();
  const result = await database.query(queryObject);
  return result;
}

export default {
  Database: Database,
  query: query,
};
