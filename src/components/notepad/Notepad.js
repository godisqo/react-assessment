import NotepadTitle from '../notepadTitle/NotepadTitle.js';
import './Notepad.css';
import NewNote from '../newNote/NewNote.js';
import ExistingNote from '../existingNote/ExistingNote.js';
import { useEffect, useState } from 'react';
import { GIST_DATA_NOTEPAD_TITLE_PROP, GIST_DATA_NOTES_PROP } from '../../services/constants.js';

function Notepad({notepadData, deleteNotepadCallback, createNotepadCallback, updateNotepadCallback}) {
  const [notepadTitle, setNotepadTitle]           = useState('');
  const [existingNotes, setExistingNotes]         = useState({});
  const [isExistingNotepad, setIsExistingNotepad] = useState(false);

  useEffect(() => {
    if (notepadData && notepadData.hasOwnProperty(GIST_DATA_NOTEPAD_TITLE_PROP) && notepadData.hasOwnProperty(GIST_DATA_NOTES_PROP)) {
      setNotepadTitle(notepadData[GIST_DATA_NOTEPAD_TITLE_PROP]);
      setExistingNotes(notepadData[GIST_DATA_NOTES_PROP]);
      setIsExistingNotepad(true);
    } else {
      setNotepadTitle('');
      setExistingNotes({});
      setIsExistingNotepad(false);
    }
  }, [notepadData]);

  const handleSaveCallback = (notepadTitle) => {
    setNotepadTitle(notepadTitle);

    const gistData = {
      [GIST_DATA_NOTEPAD_TITLE_PROP]: notepadTitle,
      [GIST_DATA_NOTES_PROP]        : existingNotes
    };

    if (isExistingNotepad) {
      updateNotepadCallback(gistData);
    } else {
      createNotepadCallback(gistData);
    }
  };

  const handleDeleteNote = (noteKey) => {
    const {[noteKey] : tmp, ...rest} = existingNotes;
    setExistingNotes(rest);
  }

  const addNoteCallback = (newNote) => {
    const newNoteId = `noteId${Date.now()}`;
    setExistingNotes((prevState) => ({
      ...prevState,
      [newNoteId]: newNote
    }));
  };

  const renderExistingNotes = () => {
    if (Object.keys(existingNotes).length > 0) {
      return (
        <ExistingNote
          title              = {''}
          content            = {''}
          deleteNoteCallback = {() => {}}
          key                = {''}
        />
      );
    }
  };

  return (
    <div className='notepad-container'>
      <h3>Notepad title</h3>
      <NotepadTitle
        title          = {notepadTitle}
        saveCallback   = {handleSaveCallback}
        deleteCallback = {deleteNotepadCallback}
      />
      <h2>My Notes</h2>
      <NewNote addNoteCallback={addNoteCallback} />
      { renderExistingNotes() }
    </div>
  );
}

export default Notepad;