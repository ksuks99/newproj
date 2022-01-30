import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function UpdateNoteForm(props) {
  const { updateNote, disableEditMode, currentNote, isValidNote } = props;

  const [noteFulName, setNoteFulName] = React.useState(currentNote.ful_name);
  const [noteEmail, setNoteEmail] = React.useState(currentNote.email);
  const [noteLogin, setNoteLogin] = React.useState(currentNote.login);
  const [notePassword, setNotePassword] = React.useState(currentNote.password);

  const [errorMessage, setErrorMessage] = React.useState("");

  const handleUpdateNote = e => {
    e.preventDefault();
    const updatedNote = {
      id: currentNote.id,
      ful_name: noteFulName,
      email: noteEmail,
      login: noteLogin,
      password: notePassword,
    };
    if (!isValidNote(updatedNote)) {
      setErrorMessage("Поля id, ful_name, login, password являются обязательными")
      return;
    }
    updateNote(updatedNote);

    setNoteFulName("");
    setNoteEmail("");
    setNoteLogin("");
    setNotePassword("");
    setErrorMessage("");

    setErrorMessage("");
    disableEditMode();
  }

  return (
    <Form onSubmit={handleUpdateNote}>
      <Form.Group>
        <div style={{color: "red", height: "1.5em"}}>
          { errorMessage }
        </div>
        <Form.Label>
          Изменение заметки
        </Form.Label>
        <Form.Control type="text" className="form-input" value={noteFulName} onChange={e => setNoteFulName(e.target.value)} placeholder="Наименование заметки" />
        <Form.Control type="text" className="form-input" value={noteEmail} onChange={e => setNoteEmail(e.target.value)} placeholder="email" />
        <Form.Control type="text" className="form-input" value={noteLogin} onChange={e => setNoteLogin(e.target.value)} placeholder="Логин" />
        <Form.Control type="text" className="form-input" value={notePassword} onChange={e => setNotePassword(e.target.value)} placeholder="Пароль" />
      </Form.Group>
      <div style={{ marginTop: "1em" }}>
        <Button variant="primary" type="submit">Сохранить</Button>
        <Button style={{ float: "right" }} variant="danger" onClick={() => disableEditMode()}>Отмена</Button>
      </div>
    </Form>
  )
}