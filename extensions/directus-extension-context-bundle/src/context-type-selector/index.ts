import { defineInterface } from "@directus/extensions-sdk";
import InterfaceComponent from "./interface.vue";

export default defineInterface({
  id: "context-type-selector",
  name: "Content Type Selector",
  icon: "box",
  description: "This is a custom interface for selecting content types.",
  component: InterfaceComponent,
  options: {
    standard: [
      {
        field: "placeholder",
        name: "$t:placeholder",
        type: "string",
        meta: {
          interface: "system-input-translated-string",
        },
      },
      {
        field: "collectionName",
        name: "$t:collectionName",
        type: "string",
        meta: {
          interface: "system-input-translated-string",
        },
      },
    ],
  },
  types: ["string"],
});
