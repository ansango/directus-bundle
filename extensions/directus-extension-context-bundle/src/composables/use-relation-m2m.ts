/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useStores } from '@directus/extensions-sdk';
import type { Field, Relation, Collection } from '@directus/types';

import { computed, type Ref } from 'vue';

export interface RelationM2M {
  relation: Relation;
  relatedCollection: Collection;
  relatedPrimaryKeyField: Field;
  junctionCollection: Collection;
  junctionPrimaryKeyField: Field;
  junctionField: Field;
  reverseJunctionField: Field;
  junction: Relation;
  sortField?: string;
  type: 'm2m';
}

/*
 *One1              Many|Many: junctionCollection         One2: relatedCollection
 *┌─────────┐       ┌─────────────────────────────┐       ┌─────────────────────┐
 *│id       ├───┐   │id: junctionPKField          │   ┌───┤id: relatedPKField   │
 *│many     │   └──►│one1_id: reverseJunctionField│   │   │                     │
 *└─────────┘       │one2_id: junctionField       │◄──┘   └─────────────────────┘
 *                  │sort: sortField              │
 *                  └─────────────────────────────┘
 */

export function useRelationM2M(
  collection: Ref<string>,
  field: Ref<string>
): Ref<RelationM2M | undefined> {
  const { useCollectionsStore, useRelationsStore, useFieldsStore } = useStores();
  const relationsStore = useRelationsStore();
  const collectionsStore = useCollectionsStore();
  const fieldsStore = useFieldsStore();
  const relationInfo = computed<RelationM2M | undefined>(() => {
    const relations = relationsStore.getRelationsForField(collection.value, field.value);

    const junction = relations.find(
      (relation: any) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        relation.related_collection === collection.value &&
        relation.meta?.one_field === field.value &&
        relation.meta.junction_field
    );

    if (!junction) return undefined;

    const relation = relations.find(
      (rel: any) =>
        rel.collection === junction.collection && rel.field === junction.meta?.junction_field
    );

    if (!relation) return undefined;

    return {
      relation,
      relatedCollection: collectionsStore.getCollection(relation.related_collection as string),
      relatedPrimaryKeyField: fieldsStore.getPrimaryKeyFieldForCollection(
        relation.related_collection as string
      ),
      sortField: junction.meta?.sort_field ?? undefined,
      junctionCollection: collectionsStore.getCollection(junction.collection),
      junctionPrimaryKeyField: fieldsStore.getPrimaryKeyFieldForCollection(junction.collection),
      junctionField: fieldsStore.getField(
        junction.collection,
        junction.meta?.junction_field as string
      ),
      reverseJunctionField: fieldsStore.getField(
        junction.collection,
        relation.meta?.junction_field as string
      ),
      junction,
      type: 'm2m',
    } satisfies RelationM2M;
  });

  return relationInfo;
}
