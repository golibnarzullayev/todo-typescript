import { RequestHandler } from "express";
import { isValidObjectId } from "mongoose";
import Todo, { TodoModel } from "../models/todos";

export const getAll: RequestHandler = async (req, res, next) => {
   const todos = await Todo.find({}).sort({ createdAt: -1 });

   return res.status(200).json({ message: "Todos", data: todos });
}

export const getOne: RequestHandler = async (req, res, next) => {
   const id = req.params.id;
   if (!isValidObjectId(id)) return res.status(400).json({ message: "not object id" });

   const todo = await Todo.findById(id);

   if (!todo) return res.status(404).json({ message: "Not found todo" });

   return res.status(200).json({ message: "Todo", data: todo });
}

export const createTodo: RequestHandler = async (req, res, next) => {
   const data: TodoModel = req.body;

   let todos = await Todo.create(data);

   return res.status(201).json({ 
      message: "Todo created successfuly", 
      data: todos 
   });
};

export const updateTodo: RequestHandler = async (req, res, next) => {
   const id = req.params.id;
   
   if (!isValidObjectId(id)) return res.status(400).json({ message: "not object id" });

   const todo = await Todo.findById(id);

   if (!todo) return res.status(404).json({ message: "Not found todo" });

   const data: TodoModel = req.body;

   const updatedTodo = await Todo.findByIdAndUpdate(id, data, { new: true });

   return res.status(200).json({ message: "Updated todo successfuly", data: updatedTodo });
}

export const deleteTodo: RequestHandler = async (req, res, next) => {
   const id = req.params.id;
   
   if (!isValidObjectId(id)) return res.status(400).json({ message: "not object id" });

   const todo = await Todo.findById(id);

   if (!todo) return res.status(404).json({ message: "Not found todo" });

   await Todo.findByIdAndRemove(id);

   return res.status(200).json({ message: "Deleted todo successfuly"});
}