import { useEffect, useState } from 'react';
import './NotepadTitle.css';

function NotepadTitle({ title, saveCallback, deleteCallback }) {
  const [notepadTitle, setNotepadTitle] = useState('');

  useEffect(() => {
    setNotepadTitle(title);
  }, [title]);

  const handleTitleChange = (e) => {
    const { value } = e.target;
    setNotepadTitle(value);
  };

  const handleSave = () => {
    saveCallback(notepadTitle);
  };

  return (
    <div className='notepad-input-container'>
      <input
        placeholder = 'My Notepad Title...'
        className   = 'notepad-input'
        value       = {notepadTitle}
        onChange    = {handleTitleChange}
      />
      <span className='button-container'>
        <button className='save-button' onClick={handleSave}>Save</button>
        <button className='delete-button' onClick={deleteCallback}>Delete</button>
      </span>
    </div>
  );
}

export default NotepadTitle;