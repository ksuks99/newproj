import React from 'react';
import Note from '../components/Note.jsx';
import UpdateNoteForm from '../components/UpdateNoteForm.jsx';
import CreateNoteForm from '../components/CreateNoteForm.jsx';

export default function EditNotesPage() {
  const [notes, setNotes] = React.useState([])
    

  const [currentUser, setCurrentUser] = React.useState("admin");
  // Edit mode
  const [editMode, setEditMode] = React.useState(false);
  const [currentNote, setCurrentNote] = React.useState({
    name: "",
    text: "",
    noteIndex: 0,
  });

  const addNote = note => {
    const newNotes = [...notes, note];
    setNotes(newNotes);
  }

  const deleteNote = noteIndex => {
    const newNotes = notes.slice(); // Копируем массив
    newNotes.splice(noteIndex, 1); // Удаляем элемент по его индексу
    setNotes(newNotes);
  }

  const updateNote = (name, text, noteIndex) => {
    const newNotes = notes.slice();
    newNotes[noteIndex].name = name;
    newNotes[noteIndex].text = text;
    setNotes(newNotes);
  }

  const enableEditMode = (note) => {
    console.log("enableEditMode", note);
    setCurrentNote(note);
    setEditMode(true);
  }

  const disableEditMode = () => {
    console.log("disableEditMode");
    setEditMode(false);
  }

  const renderForm = () => {
    if (editMode) {
      return (
        <div className="form-wrapper">
          <UpdateNoteForm currentUser={currentUser} updateNote={updateNote} disableEditMode={disableEditMode} currentNote={currentNote} />
        </div>
      )
    } else {
      return (
        <div className="form-wrapper">
          <CreateNoteForm currentUser={currentUser} addNote={addNote} />
        </div>
      )
    }
  }

  return (
    <div>
      <h1> Список заметок </h1>
      {notes.map((note, noteIndex) => 
        <Note
          key={noteIndex}
          noteIndex={noteIndex}
          name={note.name}
          author={note.author}
          text={note.text}
          enableEditMode={enableEditMode}
          deleteNote={deleteNote} // пробрасываем функцию в элемент
        />
      )}
      {renderForm()}
    </div>
  )
}
