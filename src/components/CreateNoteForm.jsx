import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function CreateNoteForm(props) {
  const [newNoteText, setNewNoteText] = React.useState("");
  const [newNoteName, setNewNoteName] = React.useState("");

  const { currentUser, addNote } = props;

  const handleCreateNote = e => {
    e.preventDefault();
    if (!newNoteText) return;
    addNote({
      name: newNoteName,
      text: newNoteText,
      author: currentUser,
    });
    setNewNoteText("");
    setNewNoteName("");
  }

  return (
    <Form onSubmit={handleCreateNote}>
      <Form.Group>
        <Form.Label className="new-note-caption">
          Добавление новой заметки
        </Form.Label>
        <Form.Control type="text" className="form-input" value={newNoteName} onChange={e => setNewNoteName(e.target.value)} placeholder="Название заметки" />
        <Form.Control as="textarea" rows="5" name="note text" value={newNoteText} onChange={event => setNewNoteText(event.target.value)} placeholder="Текст заметки" />
      </Form.Group>
      <Button style={{ marginTop: "1em" }} variant="primary" type="submit">
        Добавить
      </Button>
    </Form>
  )
}