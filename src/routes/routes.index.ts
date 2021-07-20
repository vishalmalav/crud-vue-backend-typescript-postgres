import { Router } from "express";
const router = Router();
import {
  deleteAll,
  findAllPublished,
  findAll,
  createTutorials,
  getTutorials,
  getTutorialById,
  updateTutorials,
  deleteTutorials,
} from "../controllers/index.controller";

router.post("/tutorials", createTutorials);
router.get("/tutorials", getTutorials);
router.get("/tutorials/findAll", findAll);
router.get("/published", findAllPublished);
router.get("/tutorials/:id", getTutorialById);
router.put("/tutorials/:id", updateTutorials);
router.delete("/tutorials/:id", deleteTutorials);
router.delete("/tutorials/deleteAll", deleteAll);
export default router;
