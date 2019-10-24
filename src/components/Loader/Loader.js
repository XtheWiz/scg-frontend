import React from 'react';

import classes from './Loader.module.css';

const loader = () => {
  return (
    <div className={classes.center + ' ' + classes.loader+ ' text-center'}>
      <i className="fas fa-pizza-slice fa-spin" />
    </div>
  )
}

export default loader;