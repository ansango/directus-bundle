<script setup lang="ts">
import { sortBy } from "lodash";
import { ref, onMounted, toRefs } from "vue";
import { useApi } from "@directus/extensions-sdk";
import { useAsyncChoices } from "./use-async-choices";

const props = withDefaults(
  defineProps<{
    value?: string[];
    collectionName?: string;
  }>(),
  {}
);
const { collectionName } = toRefs(props);
const emit = defineEmits(["input"]);

const choices = useAsyncChoices({
  collectionName: collectionName.value,
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
    :disabled="disabled"
    :show-deselect="allowNone"
    :placeholder="placeholder"
    :allow-other="allowOther"
    :close-on-content-click="false"
    :multiple-preview-threshold="previewThreshold"
    @update:model-value="updateValue($event)"
  >
    <template v-if="icon" #prepend>
      <v-icon :name="icon" />
    </template>
  </v-select>
</template>
