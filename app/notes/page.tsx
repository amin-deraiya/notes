'use client';
import React, { useState } from 'react';
import Button from '../components/Button';
import withAuth from '../components/hooks/withAuth';
import { gql, useMutation } from '@apollo/client';

interface Note {
  id: string;
  title: string;
  description: string;
  password?: string;
  hidden?: boolean;
}

const NEW_NOTE_MUTATION = gql`
  mutation createNote(
    $id: String!
    $title: String!
    $description: String!
    $hidden: Boolean
    $password: String
  ) {
    createNote(
      _id: $id
      title: $title
      description: $description
      hidden: $hidden
      password: $password
    ) {
      _id
    }
  }
`;

const Notes: React.FC = () => {
  // const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<Note>({
    description: '',
    id: '',
    title: '',
    hidden: false,
    password: '',
  });
  const [createNote, { error, data, loading }] = useMutation(NEW_NOTE_MUTATION, {
    variables: {
      id: crypto.randomUUID(),
      title: newNote?.title,
      description: newNote?.description,
      hidden: newNote?.hidden,
      password: '',
    },
  });

  const handleAddNote = async () => {
    if (newNote?.title.trim() && newNote.description.trim()) {
      const { data } = await createNote();
      // const newNote = {
      //   id: crypto.randomUUID(),
      //   title: newNoteTitle,
      //   description: newNoteDescription,
      // };
      // setNotes([...notes, newNote]);
      setNewNote({
        description: '',
        id: '',
        title: '',
        hidden: false,
        password: '',
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 flex-wrap">
      {/* Note form on the left */}
      <div className="w-[50%] bg-white shadow-md rounded-md p-4 flex flex-col space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Add Note</h2>
        <input
          type="text"
          placeholder="Note Title"
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
          value={newNote?.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          placeholder="Note Description"
          className="w-full h-40 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
          value={newNote.description}
          onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
        />
        <Button variant="primary" onClick={handleAddNote}>
          Add Note
        </Button>
      </div>

      {/* Note list on the right */}
      {/* <div className="w-[50%] px-4 py-4">
        {notes.length === 0 ? (
          <p className="text-gray-500 text-center">No notes yet! Add some notes to see them here.</p>
        ) : (
          <ul className="space-y-4">
            {notes.map((note) => (
              <li key={note.id} className="bg-white shadow-md rounded-md p-4">
                <h3 className="text-lg font-medium text-gray-800">{note.title}</h3>
                <p className="text-gray-700">{note.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  );
};

export default withAuth(Notes);
