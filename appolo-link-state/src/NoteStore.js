import gql from "graphql-tag";
import { graphql } from "react-apollo";
import compose from "recompose/compose";

const noteDefaults = {
  savedNotes: ""
};

const notesQuery = gql`
  query GetNotes {
    savedNotes @client
  }
`;

const clearNoteQuery = gql`
  mutation clearNote {
    clearNote @client
  }
`;

const updateNoteQuery = gql`
  mutation updateNote($text: String) {
    updateNote(text: $text) @client
  }
`;

const updateNote = (_obj, { text }, { cache }) => {
  cache.writeQuery({ query: notesQuery, data: { savedNotes: text } });

  return null;
};

const clearNote = (_obj, _args, { cache }) => {
  cache.writeQuery({ query: notesQuery, data: noteDefaults });
  return null;
};

const store = {
  defaults: noteDefaults,
  mutations: {
    updateNote,
    clearNote
  }
};

const notesQueryHandler = {
  props: ({ ownProps, data: { savedNotes = "" } }) => ({
    ...ownProps,
    savedNotes
  })
};

const withNotes = compose(
  graphql(notesQuery, notesQueryHandler),
  graphql(updateNoteQuery, { name: "updateNoteMutation" }),
  graphql(clearNoteQuery, { name: "clearNoteMutation" })
);

export { store, withNotes };
