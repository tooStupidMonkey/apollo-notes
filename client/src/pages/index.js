import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import AllNotes from './AllNotes';
import NewNote from './NewNote';
import Note from './Note';
import LogOut from './LogOut';

export default function Pages() {
  return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path='/' component={ AllNotes } />
            <Route exact path='/note/:noteId' component={ Note } />
            <Route exact path='/new-note' component={ NewNote } />
            <Route exact path='/log-out' component={ LogOut } />
          </Switch>
        </Layout>
      </BrowserRouter>
  );
}
