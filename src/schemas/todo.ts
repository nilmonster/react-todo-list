import { TodoType } from "../@types/todo";
import Realm from "realm";

export class Todo extends Realm.Object<TodoType> {
  _id!: string;
  title!: string;
  is_completed!: boolean;
  created_at!: Date;

  static schema = {
    name: 'Todo',
    properties: {
      _id: "string",
      title: "string",
      is_completed: "bool",
      created_at: "date",
    },
    primaryKey: '_id',
  };
}
