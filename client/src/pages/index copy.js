import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import Notes from './notes';

export default function Pages() {
  return (
    <Fragment>
        <Router primary={false} component={Fragment}>
          <Notes path="/" />
        </Router>
    </Fragment>
  );
}
