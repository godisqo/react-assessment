import Note from '../note/Note.js';
import './ExistingNote.css';

function ExistingNote({title, content, deleteNoteCallback}) {
  return (
    <div className='existing-note-container'>
      <Note title={title} content={content} isReadOnly={true} />
      <button onClick={deleteNoteCallback}>Delete</button>
    </div>
  );
}

export default ExistingNote;