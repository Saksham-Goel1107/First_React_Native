import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoutes  from "./routes/transactionsRoutes.js";
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(rateLimiter);
async function initDB() {
  try {
    await sql`create table if not exists transactions(
        id serial primary key,
        user_id varchar(255) not null,
        title varchar(255) not null,
        amount decimal(10,2) not null,
        category varchar(255) not null,
        created_at date not null default current_date
        )`;
    console.log("Database initialized...");
  } catch (error) {
    console.log(`Database initialization failed : ${error}`);
    process.exit(1);
  }
}

app.get("/health", (req, res) => {
  res.send("Server is running...");
});

// Mount the transactions routes
app.use("/api/transactions", transactionsRoutes);

initDB().then(() => {
  app.listen(PORT, () => console.log(`Server is running on Port:${PORT}`));
});
