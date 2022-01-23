import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Popover from '@material-ui/core/Popover';
import {withStyles} from '@material-ui/core/styles';

import classes from './HomePanels.module.css'
import Panel from '../../../Panel/Panel';
import CategoryPanel from './Category_P/Category_p';

import Celeste_icon from '../../../../assets/images/HomePanel/Celeste_Icon.png'
import Blathers_icon from '../../../../assets/images/HomePanel/Blathers_Icon.png';
import Tommy_icon from '../../../../assets/images/HomePanel/Tommy_Icon.png';
import Mabel_icon from '../../../../assets/images/HomePanel/Mabel_Icon.png';
import Dizzy_icon from '../../../../assets/images/HomePanel/Dizzy_Icon.png';
import DaisyMae_icon from '../../../../assets/images/HomePanel/Daisy_Mae_Icon.png';
import KK_icon from '../../../../assets/images/HomePanel/KK_Icon.png';
import Nook_icon from '../../../../assets/images/HomePanel/Tom_Nook_Icon.png';
import Orville_icon from '../../../../assets/images/HomePanel/Orville_Icon.png';

export default function SimplePopover() {
    const [category_type, setCategory_type] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [loggedOut, setLoggedOut] = useState(false);
    const userId = localStorage.getItem(process.env.REACT_APP_USER_ID);
    let navigate = useNavigate();

    const handleClick = (event) => {
        setCategory_type(event.currentTarget.id);
        setAnchorEl(event.currentTarget);
    };


    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {
        if (loggedOut) navigate('/home')
        setLoggedOut(false);
        navigate("/login")
    }

    const handleLogout = () => {
        localStorage.removeItem(process.env.REACT_APP_USER_ID);
        localStorage.removeItem(process.env.REACT_APP_AUTH_TOKEN)
        setLoggedOut(true);
        navigate("/home")
    }

    const handleAlbum = () => {
        navigate("/Album")
    }
    const open = Boolean(anchorEl);

    require('react-dom');
    const StyledPopover = withStyles({
        paper: {
            background: '#fff3e6',
            borderRadius: '25px',
            padding: '50px',
            margin: '50px',
        },
        root: {
            background: 'rgba(225,225,225, 0.5)',

        }
    })(Popover);

    return (
        <div className={classes.Home}>
            <div className={classes.Paneltrade}>
                <Panel color={"#ffb3b3"} img_src={Celeste_icon}
                       title={"INVITATION: welcome to my island! (Coming Soon)"} width={"620px"}/>
                       {userId?<Panel color = {"rgb(155,130,170)"} img_src={Orville_icon} title={"Logout"} width={"300px"}
                       onClick={handleLogout} id={"logout"}/>  :
                <Panel color={"#ffeb8d"} img_src={Nook_icon} title={'Register Log In'} width={"300px"}
                    onClick={handleLogin} id={"login"}/>}
            </div>
            <div className={classes.rowOne}>
                <Panel color={"#ffbf80"} img_src={Blathers_icon} title={'Museum'}
                       onClick={handleClick} id={"catMuseum"}/>
                <Panel color={"#dfbf9f"} img_src={Tommy_icon} title={"Nook's Cranny"}
                       onClick={handleClick} id={"catStore"}/>
                <Panel color={"#8cc4fd"} img_src={Mabel_icon} title={"Able's Sisters"}
                       onClick={handleClick} id={"catAble"}/>
            </div>
            <div className={classes.rowTwo}>
                <Panel color={"#bdbdff"} img_src={Dizzy_icon} title={"Villagers"}
                       onClick={handleClick} id={"catVill"}/>
                <Panel color={"#d5ed9a"} target="dev" img_src={DaisyMae_icon} title={"Trade Cabbages! (Coming Soon)"}/>
                <Panel color={"#b6c1c1"} img_src={KK_icon} title={"Albums"} onClick={handleAlbum}/>
            </div>

            <StyledPopover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                className={classes.Pop}
                anchorReference="anchorPosition"
                anchorPosition={{top: window.screen.height / 2, left: window.screen.width / 2 - 50}}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <CategoryPanel type={category_type}/>
            </StyledPopover>
        </div>
    );
}