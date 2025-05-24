import express from "express";
import {
  getUserTransaction,
  getUserTransactionSummary,
  makingTheUser,
  deleteUser,
} from "../controllers/transactionController.js";

const router = express.Router();

router.get("/:userid", getUserTransaction);

router.get("/summary/:userid", getUserTransactionSummary);

router.post("/", makingTheUser);

router.delete("/:userid/:id", deleteUser);

export default router;
