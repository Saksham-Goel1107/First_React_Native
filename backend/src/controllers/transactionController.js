import { sql } from "../config/db.js";

export const getUserTransaction = async (req, res) => {
  try {
    const { userid } = req.params;
    if (!userid) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }
    const transactions =
      await sql`select * from transactions where user_id=${userid} order by created_at desc`;
    res.status(200).json(transactions);
  } catch (error) {
    console.log(`Error fetching the transactions : ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserTransactionSummary = async (req, res) => {
  try {
    const { userid } = req.params;
    if (!userid) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const balanceResult =
      await sql`select coalesce(sum(amount),0) as balance from transactions where user_id = ${userid}`;
    const incomeResult =
      await sql`select coalesce(sum(amount),0) as income from transactions where user_id = ${userid} and amount > 0`;
    const expenseResult =
      await sql`select coalesce(sum(amount),0) as expense from transactions where user_id = ${userid} and amount < 0`;
    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expense: expenseResult[0].expense,
    });
  } catch (error) {
    console.log(`Error fetching the transactions summary : ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const makingTheUser = async (req, res) => {
  try {
    const { user_id, title, amount, category } = req.body;

    // Validate required fields
    if (!user_id || !title || amount === undefined || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate data types
    if (typeof title !== "string" || typeof category !== "string") {
      return res.status(400).json({ message: "Invalid data types" });
    }

    // Validate amount is a number
    if (typeof amount !== "number" || isNaN(amount)) {
      return res.status(400).json({ message: "Amount must be a valid number" });
    }

    // Create the transaction
    await sql`insert into transactions(user_id,title,amount,category) 
             values(${user_id},${title},${amount},${category})`;

    res.status(201).json({ message: "Transaction created successfully" });
  } catch (error) {
    console.log(`Error creating the transaction : ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const userId = req.params.userid;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid transaction id" });
    }

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const transaction = await sql`
      SELECT id, user_id 
      FROM transactions 
      WHERE id = ${id} AND user_id = ${userId}`;
    if (!transaction || transaction.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    await sql`DELETE FROM transactions WHERE id = ${id} AND user_id = ${userId}`;
    console.log("Transaction deleted");
    
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.log(`Error deleting the transaction : ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
