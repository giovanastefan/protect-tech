const pool = require("../config/db");
const bcrypt = require("bcrypt");


class User {
  static async create({ email, firstName, lastName, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("TESTEE", await pool.query('SELECT * FROM users'));

    const result = await pool.query(
      "INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, firstName, lastName, hashedPassword]
    );

    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  }
}
module.exports = User;
