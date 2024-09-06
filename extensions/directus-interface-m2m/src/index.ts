import InterfaceComponent from './components/interface.vue';
import { defineInterface } from '@directus/extensions-sdk';

export default defineInterface({
  id: 'context-m2m',
  name: 'M2M Context',
  icon: 'account_tree',
  description: 'A context interface for many-to-many relationships.',
  component: InterfaceComponent,
  relational: true,
  group: 'relational',
  localTypes: ['m2m'],
  types: ['alias'],
  options({ relations }) {
    const collectionName = relations.m2o?.related_collection;
    return [
      {
        field: 'types',
        name: 'Select types',
        meta: {
          interface: 'select-type',
          options: {
            collectionName,
          },
        },
      },
    ];
  },
});
