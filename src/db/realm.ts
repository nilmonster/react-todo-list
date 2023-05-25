import Realm from "realm";
import { Todo } from "../schemas/todo";

export const getRealm = async () => await Realm.open({
  path: "decode-app",
  schema: [Todo],
  schemaVersion: 3
});