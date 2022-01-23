import React from 'react';

import classes from './Category.module.css';

const category = (props) => (
    <div className={classes.CardC} onClick={props.clicked} key={props.id}>
        <img src={props.img_src} alt="cIcon"/>
        <p>{props.title}</p>
    </div>
);

export default category;