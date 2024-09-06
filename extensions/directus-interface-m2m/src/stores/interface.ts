import { defineStore } from 'pinia';
import { toRefs } from 'vue';
import { useRelationM2M } from '../composables';

export interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: Array<number | string | Record<string, any>> | Record<string, any>;
  field: string;
  collection: string;
  primaryKey: string;
  types?: string[];
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useInterfaceStore = (propsComponent: Props) =>
  defineStore('global-state-component', () => {
    const { collection, field, value } = toRefs(propsComponent);
    const { value: relationInfo } = useRelationM2M(collection, field);
    const { relation, junction, relatedCollection: relatedCollectionData } = relationInfo ?? {};
    const junctionField = junction?.field ?? '';
    const relationField = relation?.field ?? '';
    const currentRelationCollection = relation?.collection ?? '';
    const relatedCollection = relatedCollectionData?.collection ?? '';

    return {
      collection,
      field,
      value,
      relationInfo,
      relation,
      junction,
      relatedCollectionData,
      junctionField,
      relationField,
      currentRelationCollection,
      relatedCollection,
    };
  })();
