import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: props.noteObject.note
    };

    this.handleNoteFiled = this.handleNoteFiled.bind(this);
    this.editNote = this.editNote.bind(this);
  }

  handleNoteFiled(event) {
    this.setState({
      note: event.target.value
    })
  }

  editNote () {
    this.props.editNote({
      variables : {id: this.props.noteObject.id, note: this.state.note}
    })
  }

  render() {
    const { id } = this.props.noteObject;
    return (
      <Fragment>
        <div>
            <TextField 
              onChange={this.handleNoteFiled}
              value={this.state.note}
               />
            <Button
              onClick={this.editNote}
            >Edit</Button>
            <Button onClick={() => this.props.deleteNote(
          {
            variables : {noteId: id}
          }
        )}>Remove</Button></div>
      </Fragment>
    );
  }
}

export default Note;

