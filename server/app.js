import express from "express";
import cors from "cors";
import 'dotenv/config';
import mariadb from "mariadb";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const pool = mariadb.createPool({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  connectionLimit: 5,
});

let dbConnection = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const data = await connection.query(`SELECT * FROM ideas`);
    return data;
  } catch (err) {
    throw err;
  } finally {
    if (connection) connection.end();
  }
};

app.get("/", async (req, res) => {
  try {
    const data = await dbConnection();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal server Error" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const rows = await connection.execute("DELETE FROM ideas WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: `Deleted ${rows.affectedRows} row(s)` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) connection.end();
  }
});


app.delete("/idea/:id", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const prepare = await connection.prepare(
      "SELECT * FROM ideas WHERE id = ?"
    );
    const data = await prepare.execute([req.params.id]);
    res.json(data);
  } catch (err) {
    throw err;
  } finally {
    if (connection) connection.end();
  }
});




app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
