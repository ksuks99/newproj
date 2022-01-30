import React from 'react';
import Note from '../components/Note.jsx';
import UpdateNoteForm from '../components/UpdateNoteForm.jsx';
import CreateNoteForm from '../components/CreateNoteForm.jsx';
import Axios from '../api/axios.js';
import AuthContext from '../context/AuthProvider';
import { Redirect, Link } from "react-router-dom";

export default function EditNotesPage() {
  const [notes, setNotes] = React.useState([]);

  const { auth } = React.useContext(AuthContext);

  /*
  Формат заметки
  {
    id: 0,
    ful_name: "name",
    email: "admin@gmail.com",
    login: "admin",
    password: "password",
  }
  */
  
  const userIsLogged = () => {
    return auth.accessToken !== undefined ? true : false;
  }

  const getHeaders = () => {
    const token = btoa(auth.accessToken);
    return { 'Authorization': `Basic ${token}` };
  }

  const getNotes = () => {
    Axios.get(`/api/get`, { headers: getHeaders() } )
    .then(response => {
      console.log(response.data);
      setNotes(response.data);
    })
    .catch(error => {
      if (error.response.status === 401) {
        console.error("Ошибка авторизации");
      } else {
        console.error("Не удалось получить данные от сервера, запустите сервер и обновите страницу");
      }
      console.error(error);
    });
  }

  React.useEffect(() => {
    if (userIsLogged()) {
      getNotes();
    }
  }, []);

  // Edit mode
  const [editMode, setEditMode] = React.useState(false);
  const [currentNote, setCurrentNote] = React.useState({
    id: 0,
    ful_name: "",
    email: "",
    login: "",
    password: "",
  });

  const addNote = (note) => {
    Axios.post(`/api/insert`, note, { headers: getHeaders() } )
      .then(response => {
        console.log("INSERT RESPONSE");
        console.log(response.data);
        if (response.data.error) {
          console.error(`Ошибка, заметка с id = ${note.id} уже существует`);
          return;
        }
        const newNotes = [...notes, note];
        setNotes(newNotes);
        console.log(`Заметка с id = ${note.id} добавлена успешно.`);
      })
      .catch(error => console.error("Ошибка на сервере при добавлении заметки"));
  }

  const deleteNote = id => {
    Axios.delete(`/api/delete/?id=${id}`, { headers: getHeaders() } )
      .then(response => {
        const deleted = response.data.deleted;
        if (deleted) {
          console.log(`Удалена из БД заметка с id = ${id}`);
          const newNotes = notes.filter(note => note.id !== id);
          setNotes(newNotes);
        }
        // newNotes.splice(noteIndex, 1);
      })
      .catch(error => console.error("Ошибка при удалении заметки"));
  }

  const updateNote = note => {
    Axios.put(`/api/update/?id=${note.id}`, note, { headers: getHeaders() } )
      .then(response => {
        const updated = response.data.updated;
        if (updated) {
          console.log(`Изменена заметка с id = ${note.id}`);
          const newNotes = notes.slice();
          let ind = -1;
          for (let i = 0; i < newNotes.length; i++) {
            if (newNotes[i].id === note.id) {
              ind = i;
              break;
            }
          }
          if (ind === -1) {
            throw new Error(`Заметка c id = ${note.id} не найдена`);
          }
          Object.assign(newNotes[ind], note);
          setNotes(newNotes);
        }
      })
      .catch(error => console.error("Ошибка при обновлении заметки"));
  }

  const enableEditMode = note => {
    console.log("Edit Mode enabled.", note);
    setCurrentNote(note);
    setEditMode(true);
  }

  const disableEditMode = () => {
    console.log("Edit Mode disabled.");
    setEditMode(false);
  }

  const isValidNote = note => {
    return typeof(note.id) === "number" && !isNaN(note.id) && note.ful_name && note.login && note.password;
  }

  const renderForm = () => {
    if (editMode) {
      return <UpdateNoteForm updateNote={updateNote} disableEditMode={disableEditMode} currentNote={currentNote} isValidNote={isValidNote} />
    } else {
      return <CreateNoteForm addNote={addNote} isValidNote={isValidNote} />
    }
  }

  if (!userIsLogged()) {
    // Redirect
    return (
      <div>
        <div> Вы не можете посмотреть заметки, пока не вошли в аккаунт </div>
        <Link to="/login">Войти</Link>
      </div>
    );
  } else {    
    return (
      <div>
        <h1> Список заметок </h1>
        {notes.map((note, i) => 
          <Note
            key={i}
            note={note}
            enableEditMode={enableEditMode}
            deleteNote={deleteNote}
          />
        )}
        {renderForm()}
      </div>
    )
  }
}
