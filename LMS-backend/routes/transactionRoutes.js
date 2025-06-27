import express, { Router } from "express";
import { getTransaction, createTransaction, updatetransaction, deleteTransaction ,updateTransactionStatus, returnBook} from "../controllers/transactionControllers.js";
import { checkAuthorization } from "../middleware/checkAuthorization.js";
import { checkStaffLevelPermissions } from "../middleware/checkPermission.js";

const router = express.Router();

router.route("/")
    .get(getTransaction)
    .post(checkAuthorization, createTransaction)


router
  .route("/:transactionId")
  .put(checkAuthorization, checkStaffLevelPermissions, updatetransaction)
  .patch(
    checkAuthorization,
    checkStaffLevelPermissions,
    updateTransactionStatus
  )
  .delete(checkAuthorization, checkStaffLevelPermissions, deleteTransaction);

  router.route("/:transactionId/return").patch(checkAuthorization, checkStaffLevelPermissions, returnBook)

export default router;
