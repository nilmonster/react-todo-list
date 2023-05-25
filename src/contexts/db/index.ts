import Realm from "realm";
import { createRealmContext } from "@realm/react";
import { Todo } from "../../schemas/todo";

const realmConfig: Realm.Configuration = {
    schema: [Todo],
    schemaVersion: 2,
};

export const { RealmProvider, useRealm, useObject } = createRealmContext(realmConfig);