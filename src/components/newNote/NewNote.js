import { useState } from 'react';
import Note from '../note/Note.js';
import './NewNote.css';

function NewNote({ addNoteCallback }) {
  const [noteTitle, setNoteTitle]     = useState('');
  const [noteContent, setNoteContent] = useState('');

  const resetNote = () => {
    setNoteTitle('');
    setNoteContent('');
  };

  const handleAddNote = () => {
    const newNote = {
      title  : noteTitle,
      content: noteContent
    };

    addNoteCallback(newNote);
    resetNote();
  };

  const handleTitleChange = (e) => {
    const { value } = e.target;
    setNoteTitle(value);
  };

  const handleContentChange = (e) => {
    const { value } = e.target;
    setNoteContent(value);
  };

  return (
    <div className='new-note-container'>
      <Note
        title                 = {noteTitle}
        content               = {noteContent}
        isReadOnly            = {false}
        titleChangeCallback   = {handleTitleChange}
        contentChangeCallback = {handleContentChange}
      />
      <button onClick={ handleAddNote }>Add</button>
    </div>

  );
}

export default NewNote;