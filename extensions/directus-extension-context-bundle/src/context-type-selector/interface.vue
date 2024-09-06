<script setup lang="ts">
import { sortBy } from "lodash";
import { toRefs } from "vue";
import { useAsyncChoices } from "../composables";

const props = withDefaults(
  defineProps<{
    value?: string[];
    collectionName: string;
  }>(),
  {}
);
const { collectionName } = toRefs(props);
const emit = defineEmits(["input"]);

const choices = useAsyncChoices({
  collectionName: props.collectionName,
});

function updateValue(value: string[]) {
  const sortedValue = sortBy(value, (val) => {
    const sortIndex = choices.value!.findIndex((choice) => val === choice.value);
    return sortIndex !== -1 ? sortIndex : value.length;
  });

  emit("input", sortedValue);
}
</script>

<template>
  <v-notice v-if="!collectionName || !choices" type="warning"> missing collectionName or no choices </v-notice>
  <v-select
    v-else
    multiple
    :model-value="value"
    :items="choices"
    :close-on-content-click="false"
    @update:model-value="updateValue($event)"
  />
</template>
