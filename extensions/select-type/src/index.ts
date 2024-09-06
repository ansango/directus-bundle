import { defineInterface } from "@directus/extensions-sdk";
import InterfaceComponent from "./interface.vue";

export default defineInterface({
  id: "select-type",
  name: "Custom",
  icon: "box",
  description: "This is my custom interface!",
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
