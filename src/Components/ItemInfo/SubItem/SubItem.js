import React from 'react';

import classes from './SubItem.module.css';

const subItem = (props) => {
    return (
        <div className={classes.variation}>
            <img src={props.imgUrl} alt={props.name + props.id}/>
            <p>{props.title}</p>
        </div>
    );
}

export default subItem;