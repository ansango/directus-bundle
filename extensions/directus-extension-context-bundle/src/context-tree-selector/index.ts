import InterfaceComponent from "./components/interface.vue";
import { defineInterface } from "@directus/extensions-sdk";

export default defineInterface({
  id: "context-tree-selector",
  name: "Context Tree Selector",
  icon: "account_tree",
  description: "A context interface for many-to-many relationships.",
  component: InterfaceComponent,
  relational: true,
  group: "relational",
  localTypes: ["m2m"],
  types: ["alias"],
  options({ relations }) {
    const collectionName = relations.m2o?.related_collection;
    return [
      {
        field: "types",
        name: "Select types",
        meta: {
          interface: "context-type-selector",
          options: {
            collectionName,
          },
        },
      },
    ];
  },
});
