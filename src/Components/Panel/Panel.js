import React from 'react';

import classes from './Panel.module.css';

const panel = (props) => (
    <div className={classes.Card} onClick={props.onClick} style={{backgroundColor: props.color, width: props.width}}
         id={props.id} target={props.target} navigate={props.navigate}>
        <img src={props.img_src} alt="pLogo"/>
        <p>{props.title}</p>
    </div>
);

export default panel;