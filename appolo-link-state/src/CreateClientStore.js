import {store as todoStore} from './TodoStore';
import {store as noteStore} from './NoteStore';
import {withClientState} from 'apollo-link-state';

import flow from 'lodash/fp/flow';
import assignIn from 'lodash/fp/assignIn';
import map from 'lodash/fp/map';
import reduce from 'lodash/fp/reduce';
const reduceWithDefault = reduce.convert({cap: false});


const mergeGet = (attributeName) => flow(
  map(attributeName),
  reduceWithDefault(assignIn, {})
);

const STORES = [
  todoStore,
  noteStore,
];

const CreateClientStore = (cache) => {
  const defaults = mergeGet('defaults')(STORES);
  const mutations = mergeGet('mutations')(STORES);
  return withClientState({
    cache,
    defaults: defaults,
    resolvers: {
      Mutation: mutations,
    },
  });
};


export default CreateClientStore;
