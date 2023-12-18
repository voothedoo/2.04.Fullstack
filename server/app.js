import express from "express";
import cors from "cors";
import 'dotenv/config';
import mariadb from "mariadb";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  connectionLimit: 5,
});

let dbConnection = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const data = await connection.query(`SELECT * FROM brilliant_minds.ideas`);
    return data;
  } catch (err) {
    throw err;
  } finally {
    if (connection) connection.end();
  }
};


app.get("/show-all", async (req, res) => {
  try {
    const data = await dbConnection();
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal server Error" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
