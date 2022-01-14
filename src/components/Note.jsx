import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Note(props) {
  const { enableEditMode, deleteNote, noteIndex, name, text, author } = props;

  const note = {noteIndex, name, text};

  return (
    <div className="note-header">
      <div>
        <Card>
          <Card.Header className="note-card-header">
            <div>
              <Button className="edit-note-button" variant="outline-success" onClick={() => enableEditMode(note)}>Edit</Button>
                <b className="note-name">{name}</b>
            </div>
            <div className="note-container">
            <span className="note-author">{`@${author}`}</span>
              <Button className="remove-note-button" variant="outline-danger" onClick={() => deleteNote(noteIndex)}>✕</Button>
            </div>
          </Card.Header>
          <Card.Body>
           {text.split('\n').map((row, i) =>
              <p key={i.toString()}>{row}</p>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}