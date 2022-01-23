import React from 'react';

import acLogo from '../../assets/images/HomePanel/ac_logo.png';
import classes from './Logo.module.css';

const logo = () => (
    <div className={classes.Logo}>
        <img src={acLogo} alt="MyAC"/>
        <h1> Mark and Trade </h1>
    </div>
);

export default logo;