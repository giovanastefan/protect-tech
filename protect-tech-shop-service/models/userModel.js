const pool = require("../database/connection");
const jwt = require("jsonwebtoken");

const secretKey = "123456";
const crypto = require("crypto");

async function createAddress(
  userId,
  street,
  number,
  neighborhood,
  city,
  state
) {
  const query = `
        INSERT INTO address (user_id, street, number, neighborhood, city, state)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;
  const values = [userId, street, number, neighborhood, city, state];
  const { rows } = await pool.query(query, values);
  console.log("a", rows[0]);
  return rows[0];
}

async function findUserByEmail(email) {
  const query = "SELECT * FROM users WHERE email = $1;";
  const { rows } = await pool.query(query, [email]);

  return rows[0] || null;
}

async function verifyPassword(password, storedHashedPassword) {
  // A07 Fail - Insecure Cryptographic Storage and Lack of Brute-Force Protection:
  // 1. The password is hashed using MD5, which is a weak and outdated hashing algorithm
  // vulnerable to collision attacks and brute-force attempts. Storing and verifying passwords
  // with MD5 is insecure. A stronger algorithm like bcrypt, Argon2, or PBKDF2 should be used
  // for hashing, along with techniques such as salting to improve security.
  // 2. There is no mechanism in place to limit the number of login attempts, leaving the
  // application vulnerable to brute-force attacks where attackers can repeatedly try different passwords.
  // To enhance security, it's important to implement rate-limiting or account lockout policies
  // after a certain number of failed attempts (e.g., 5 failed attempts). This helps prevent
  // automated brute-force attacks.

  const hashedPassword = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");

  return hashedPassword === storedHashedPassword;
}

async function createUser(email, password, fname, lname) {
  const query = `
        INSERT INTO users (email, password, first_name, last_name) 
        VALUES ($1, $2, $3, $4) RETURNING *;
    `;
  const values = [email, password, fname, lname];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

exports.register = async (email, password, fname, lname) => {
  try {
    const exists = await findUserByEmail(email);
    if (exists) {
      throw new Error("User already exists");
    }

    // Fail A02 - Weak Cryptography: The password is hashed using MD5, which is considered insecure
    // due to its vulnerability to collisions and its fast hashing speed, making it susceptible to brute-force attacks.
    // A stronger hashing algorithm, such as bcrypt, Argon2, or PBKDF2, should be used for hashing passwords
    // to enhance security and protect user credentials.

    const hashedPassword = crypto
      .createHash("md5")
      .update(password)
      .digest("hex");

    const newUser = await createUser(email, hashedPassword, fname, lname);
    console.log("User registered successfully");
    return newUser;
  } catch (err) {
    console.error("Error during registration:", err);
    throw err;
  }
};

exports.login = async (email, password) => {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const userData = {
      userId: user.user_id,
      isAdmin: user.is_admin,
    };

    const token = jwt.sign(userData, secretKey, {
      expiresIn: "90d",
      algorithm: "HS256",
    });

    return { token, userData };
  } catch (err) {

    // A09 Fail - No logs are implemented to monitor potential attack attempts.
    // This issue arises when:
    // There are no mechanisms in place to log failed login attempts or suspicious activities,
    // making it difficult to detect brute force attacks, unauthorized access attempts, or other security threats.
    console.error("Error during login:", err);
    throw err;
  }
};

exports.getUserDetails = async (userId) => {
  try {
    const query = `
    SELECT *
    FROM users
    WHERE user_id = $1;
  `;

    const { rows } = await pool.query(query, [userId]);

    if (!rows[0]) {
      throw new Error("User not found");
    }

    const userDetails = {
      userId: rows[0].user_id,
      email: rows[0].email,
      firstName: rows[0].first_name,
      lastName: rows[0].last_name,
    };

    return userDetails;
  } catch (err) {
    console.error("Error retrieving user details:", err);
    throw err;
  }
};

exports.registerAddress = async (
  userId,
  street,
  number,
  neighborhood,
  city,
  state
) => {
  try {
    const newAddress = await createAddress(
      userId,
      street,
      number,
      neighborhood,
      city,
      state
    );
    console.log("Address registered successfully");
    return newAddress;
  } catch (err) {
    console.error("Error during address registration:", err);
    throw err;
  }
};
