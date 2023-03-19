import * as mongoose from "mongoose";

import { Model } from "mongoose";

type TodoType = TodoModel & mongoose.Document;

export interface TodoModel {
   title: {
      type: String,
      required: true
   },

   description: {
      type: String,
      required: true
   }
}

const TodosSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   }
}, {
   timestamps: true
});

const Todo: Model<TodoType> = mongoose.model<TodoType>('Todo', TodosSchema);

export default Todo;