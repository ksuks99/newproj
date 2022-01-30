import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function CreateNoteForm(props) {
  const [noteId, setNoteId] = React.useState("");
  const [noteFulName, setNoteFulName] = React.useState("");
  const [noteEmail, setNoteEmail] = React.useState("");
  const [noteLogin, setNoteLogin] = React.useState("");
  const [notePassword, setNotePassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const { addNote, isValidNote } = props;

  const handleCreateNote = e => {
    e.preventDefault();
    const newNote = {
      id: parseInt(noteId),
      ful_name: noteFulName,
      email: noteEmail,
      login: noteLogin,
      password: notePassword,
    };
    if (!isValidNote(newNote)) {
      setErrorMessage("Поля id, ful_name, login, password являются обязательными")
      return;
    }
    addNote(newNote);

    setNoteId("");
    setNoteFulName("");
    setNoteEmail("");
    setNoteLogin("");
    setNotePassword("");
    setErrorMessage("");
  }

  return (
    <Form onSubmit={handleCreateNote}>
      <Form.Group>
        <div style={{color: "red", height: "1.5em"}}>
          { errorMessage }
        </div>
        <Form.Label className="new-note-caption">
          Добавление новой заметки
        </Form.Label>
        <Form.Control type="text" className="form-input" value={noteId} onChange={e => setNoteId(e.target.value)} placeholder="id (введите целое число)" />
        <Form.Control type="text" className="form-input" value={noteFulName} onChange={e => setNoteFulName(e.target.value)} placeholder="Наименование заметки" />
        <Form.Control type="text" className="form-input" value={noteEmail} onChange={e => setNoteEmail(e.target.value)} placeholder="email" />
        <Form.Control type="text" className="form-input" value={noteLogin} onChange={e => setNoteLogin(e.target.value)} placeholder="Логин" />
        <Form.Control type="text" className="form-input" value={notePassword} onChange={e => setNotePassword(e.target.value)} placeholder="Пароль" />
      </Form.Group>
      <Button style={{ marginTop: "1em" }} variant="primary" type="submit">
        Добавить
      </Button>

    </Form>
  )
}