import React from 'react';
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles';
import ItemInfo from '../../ItemInfo/ItemInfo';

const useStyles = makeStyles(() => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        borderRadius: '25px',
        width: 600,
        height: 580,
        overflow: 'scroll',
        backgroundColor: '#fff0e6',
        outline: 'none'
    }
}));

export default function ItemModal(props) {
    const classes = useStyles();
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            className={classes.modal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            <div className={classes.paper}>
                <ItemInfo {...props}/>
            </div>
        </Modal>
    )
}