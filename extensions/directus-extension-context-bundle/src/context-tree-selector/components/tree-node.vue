<script setup lang="ts">
import { toRefs } from "vue";
import { type NodeMapped, useTreeNodeStore } from "../stores";

const props = defineProps<{
  nodes: NodeMapped[];
}>();

const { nodes } = toRefs(props);
const store = useTreeNodeStore();
</script>

<template>
  <ul class="tree-list" v-if="nodes.length" v-for="node in nodes">
    <li class="tree-node">
      <button @click="store.toggleNodeCollapse(node.id)" :class="!node.children || node.children.length === 0 ? 'visibility-hidden' : ''">
        <v-icon :name="store.getIsCollapsed(node.id) ? 'arrow_right' : 'arrow_drop_down'" />
      </button>
      <button @click="store.toggleNodeSelection(node.id)">
        <v-icon
          :name="
            store.getIsSelected(node.id)
              ? 'check_box'
              : store.getIsIntermediate(node.id)
              ? 'indeterminate_check_box'
              : 'check_box_outline_blank'
          "
        />
        {{ node.value }}
      </button>

      <tree-node v-if="!store.getIsCollapsed(node.id) && node.children && node.children.length" :nodes="node.children" />
    </li>
  </ul>
</template>

<style scoped>
ul {
  padding: 0.35rem 1.5rem;
  list-style: none;

  li {
    & button.visibility-hidden {
      visibility: hidden;
    }
  }
}
</style>
