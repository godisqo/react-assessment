import { useEffect, useState } from 'react';
import './App.css';
import Notepad from './components/notepad/Notepad.js';
import { createNotepad, deleteNotepad, getNotepads, updateNotepad } from './services/NotepadUtils.js';

/*
  - Data Structure -
  {
    <notepadId> : {
      notepadTitle: <some title>,
      notes       : {
        <noteId>: {
          title  : <note title>,
          content: <note content>
        },
        ..
      }
    },
    ...
  }
*/

function App() {
  const [notepadData, setNotepadData] = useState({});
  const [gistId, setGistId]           = useState('');

  // Check for localStorage and Gist data
  useEffect(() => {
    getNotepads()
      .then((response) => {
        if (response) {
          const { gistId, gistData } = response;
          setNotepadData(gistData);
          setGistId(gistId);
        }
      })
  }, []);

  const createNotepadCallback = async (notepadData) => {
    try {
      await createNotepad(notepadData);
    } catch (error) {
      console.log('creating notepad failed');
    }
  }

  const updateNotepadCallback = async (notepadData) => {
    try {
      await updateNotepad(notepadData, gistId);
    } catch (error) {
      console.log('updating notepad failed');
    }
  }

const deleteNotepadCallback = async () => {
  try {
    await deleteNotepad(gistId);
    setNotepadData({});
    setGistId('');
  } catch (error) {
    console.log('deleting notepad failed');
  }
}

  return (
    <div className="App">
      <header className="App-header">
        Notepad Application
      </header>
      <Notepad
        notepadData           = {notepadData}
        deleteNotepadCallback = {deleteNotepadCallback}
        createNotepadCallback = {createNotepadCallback}
        updateNotepadCallback = {updateNotepadCallback}
      />
    </div>
  );
}

export default App;
