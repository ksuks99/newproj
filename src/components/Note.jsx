import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const divStyle = {
  border: "solid #eee 1px",
  marginTop: "5px"
}

export default function Note(props) {
  const { enableEditMode, deleteNote, note } = props;

  return (
    <div className="note-header">
      <div>
        <Card>
          <Card.Header className="note-card-header">
            <div>
              <Button className="edit-note-button" variant="outline-success" onClick={() => enableEditMode(note)}>Edit</Button>
                <b className="note-name">{note.ful_name}</b>
            </div>
            <div className="note-container">
              <Button className="remove-note-button" variant="outline-danger" onClick={() => deleteNote(note.id)}>✕</Button>
            </div>
          </Card.Header>
          <Card.Body>
            <div style={divStyle}> id: {note.id} </div>
            <div style={divStyle}> email: {note.email} </div>
            <div style={divStyle}> login: {note.login} </div>
            <div style={divStyle}> password: {note.password} </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}