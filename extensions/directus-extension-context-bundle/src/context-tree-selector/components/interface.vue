<script setup lang="ts">
import { toRefs, watch } from 'vue';
import { useTreeNodeStore, useInterfaceStore, type Props } from '../stores';
import treeNode from './tree-node.vue';

const props = defineProps<Props>();

const emit = defineEmits(['input']);
const { primaryKey, types } = toRefs(props);

const storeGlobal = useInterfaceStore(props);
const { currentRelationCollection, junctionField, relationField, relatedCollection } = storeGlobal;

const store = useTreeNodeStore();
const isTreeLoading = store.isLoading;
store.fetchItems(
  relatedCollection,
  currentRelationCollection,
  junctionField,
  relationField,
  primaryKey,
  types
);

const onSelectedNodes = () => {
  const payload = store.preparePayload({
    primaryKey,
    junctionField,
    relationField,
  });
  emit('input', payload);
};

watch(() => store.selectedNodesWithoutOwnChildren, onSelectedNodes, { deep: true });
</script>

<template>
  <ul>
    <li
      v-if="store.selectedNodesWithoutOwnChildren.length"
      v-for="node in store.selectedNodesWithoutOwnChildren">
      <v-chip>
        {{ node.value }}
      </v-chip>
    </li>
  </ul>
  <tree-node
    v-if="!isTreeLoading"
    :nodes="store.mappedNodes.nodes" />
  <div v-else>Loading...</div>
</template>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem 0;
  list-style: none;

  & > li {
    margin: 0 0.5rem 0.5rem 0;
  }
}
</style>
