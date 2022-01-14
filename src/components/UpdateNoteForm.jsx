import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function UpdateNoteForm(props) {
  const { currentUser, updateNote, currentNote, disableEditMode } = props;

  const [newNoteText, setNewNoteText] = React.useState(currentNote.text);
  const [newNoteName, setNewNoteName] = React.useState(currentNote.name);

  const handleUpdateNote = e => {
    e.preventDefault();
    if (!newNoteText) return;
    updateNote(newNoteName, newNoteText, currentNote.noteIndex);
    setNewNoteText("");
    setNewNoteName("");
    disableEditMode();
  }

  return (
    <Form onSubmit={handleUpdateNote}>
      <Form.Group>
        <Form.Label>
          Добавление новой заметки
        </Form.Label>
        <Form.Control type="text" className="form-input" value={newNoteName} onChange={e => setNewNoteName(e.target.value)} placeholder="Название заметки" />
        <Form.Control as="textarea" rows="5" name="note text" value={newNoteText} onChange={event => setNewNoteText(event.target.value)} placeholder="Текст заметки" />
      </Form.Group>
      <div style={{ marginTop: "1em" }}>
        <Button variant="primary" type="submit">Сохранить</Button>
        <Button style={{ float: "right" }} variant="danger" onClick={() => disableEditMode()}>Отмена</Button>
      </div>
    </Form>
  )
}