import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class CreateNoteForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        note: ''
      };
  
      this.handleNoteFiled = this.handleNoteFiled.bind(this);
      this.createNote = this.createNote.bind(this);
    }
  
    handleNoteFiled(event) {
      this.setState({note: event.target.value});
    }
  
    createNote () {
      this.props.createNote({
        variables : {note: this.state.note}
      });
    }

    render() {
        return (
          <Fragment>
            <div>            
              <label>
                  <TextField type="text" placeholder="New note" value={this.state.note} onChange={this.handleNoteFiled} />
              </label>
              <Button onClick={this.createNote}>Create</Button>
            </div> 
          </Fragment>
      );
    }
  }

  export default CreateNoteForm;