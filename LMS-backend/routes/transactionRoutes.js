import express, { Router } from "express";
import { getTransaction, createTransaction } from "../controllers/transactionControllers.js";

const router = express.Router();

router.route("/")
    .get(getTransaction)
    .post(createTransaction)

export default router;
