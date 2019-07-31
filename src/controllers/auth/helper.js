const SECRETKEY = require("config").get("secretkey");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../../services/database");

const generateToken = user => {
  if (!user.admin)
    return jwt.sign(
      {
        id: user.id
      },
      SECRETKEY
    );
  return jwt.sign(
    {
      id: user.id
    },
    SECRETKEY,
    {
      expiresIn: "7d"
    }
  );
};

const validateToken = async token => {
  const auth = "SELECT * FROM users WHERE id=$1";
  const { id } = await jwt.verify(token, SECRETKEY);
  const { rows } = await db.query(auth, [id]);
  return {
    status: !!rows[0],
    user: rows[0]
  };
};

const validateUser = async (username, password) => {
  // gethashpass from db then compare with password of request
  const query = "SELECT * FROM users WHERE username=$1";
  const { rows } = await db.query(query, [username]);
  const { hashpass } = rows[0];
  return {
    status: bcrypt.compareSync(password, hashpass),
    user: rows[0]
  };
};

const createUser = async (username, password, location, admin = false) => {
  // generate hashpassword
  const salt = bcrypt.genSaltSync(10);
  const hashpass = bcrypt.hashSync(password, salt);

  // define query for create new user
  const query =
    "INSERT INTO users (username, hashpass, role)\
                    VALUES ($1, $2, $3, $4) RETURNING *";
  await db.query(query, [username, hashpass, location, admin]);
};

module.exports = {
  generateToken,
  validateToken,
  validateUser,
  createUser
};
