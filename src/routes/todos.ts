import { Router } from "express";
import { createTodo, deleteTodo, getAll, getOne, updateTodo } from '../controllers/todos';

const router = Router();

router.post("/", createTodo);
router.get("/", getAll);
router.get("/:id", getOne);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;