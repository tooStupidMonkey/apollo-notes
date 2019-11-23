import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import AllUsers from './AllUsers';
import TopPosts from './TopPosts';
import NewPost from './NewPost';
import Post from './Post';

export default function Pages() {
  return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path='/' component={ AllUsers } />
            <Route exact path='/posts' component={ TopPosts } />
            <Route exact path='/post/:postId' component={ Post } />
            <Route exact path='/new-note' component={ NewPost } />
          </Switch>
        </Layout>
      </BrowserRouter>
  );
}
