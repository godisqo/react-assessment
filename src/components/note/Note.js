import './Note.css';

function Note({title, content, isReadOnly, titleChangeCallback, contentChangeCallback}) {
  return (
    <div className='note-container'>
      <input
        placeholder = 'Enter note title...'
        type        = 'text'
        value       = {title}
        readOnly    = {isReadOnly}
        onChange    = {titleChangeCallback}
      />
      <textarea
        rows        = '4'
        placeholder = 'Enter note...'
        type        = 'text'
        value       = {content}
        readOnly    = {isReadOnly}
        onChange    = {contentChangeCallback}
      />
    </div>
  );
}

export default Note;