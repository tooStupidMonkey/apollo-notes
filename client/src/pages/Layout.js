import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  linkItem: {
    fontSize: '15px',
    textDecoration: 'unset',
    marginRight: '15px'
  },
  root: {
    textAlign: 'center',
    marginBottom: '30px'
  }
});

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <div>
      <nav className={classes.root}>
        <Link className={classes.linkItem} to='/'> Home </Link>
        <Link className={classes.linkItem} to='/new-note'> New note </Link>
        <Link className={classes.linkItem} to='/log-out'> Log out </Link>
      </nav>
      { children }
    </div>
  );
} 
  

export default Layout;
