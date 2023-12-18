import express from "express";
import 'dotenv/config';
import mariadb from "mariadb";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

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
    console.log(data[0].title);
    res.json(data[0].title);
  } catch (err) {
    console.log(err);
  }
});


app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
