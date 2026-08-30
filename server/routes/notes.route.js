import express from "express";

import {
  getNotesHistory,
  getNoteById,
} from "../controllers/notes.controller.js";

import isAuth from "../middleware/isAuth.js";


const router = express.Router();


// ========================================
// HISTORY
// ========================================

router.get(
  "/history",
  isAuth,
  getNotesHistory
);


// ========================================
// SINGLE NOTE
// ========================================

router.get(
  "/:noteId",
  isAuth,
  getNoteById
);


export default router;