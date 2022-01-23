import React from 'react';

import ItemModal from '../Containers/ItemModal/ItemModal';
import classes from './Item.module.css';
import diy_icon from '../../assets/images/Diy_Icon.png';
import paint_icon from '../../assets/images/Paint_Icon.png';
import bell_icon from '../../assets/images/Bells_Icon.png';

const getDate = () => {
    var date = new Date();
    var mm = date.getMonth() + 1;
    var hour = date.getHours() + 1;
    return [mm, hour]
}

const getLocation = (month, arr) => {
    return arr.includes(month);
}

export default function Item(props) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!props.marking);
    };

    const handleClose = () => {
        setOpen(false);
    };
    let isCreature = props.isCreature;
    let personality = props.personality;
    let personality_comp = null;
    let species = props.species;
    let species_comp = null;
    let month = getDate()[0];
    let hour = getDate()[1];
    let inNorth = null;
    let inSouth = null;
    let hasNow = null;
    let diy = props.isDIY;
    let diy_comp = null;
    let customize = props.isCustomize;
    let customize_comp = null;
    let buy = props.buy;
    let buy_comp = null;
    let buy_style = null;
    const nfs = "not for sale";
    let south_height = "20px";
    let customize_height = "5px";
    let vnumber = props.vnumber;
    let vnumber_comp = null;
    let vnumber_height = 10;
    let clickFunction = props.marking ? props.clicked : handleOpen;
    let isMarked = props.marked ? <div target='marked' id={props.internalId.toString()+"marked"}><p>Marked</p></div> : null;
    if (isCreature) {
        let nor_arr = props.north_arr;
        let sou_arr = props.south_arr;
        let time_arr = props.time_arr;
        let isNowN = getLocation(hour, time_arr.northern);
        let isNowS = getLocation(hour, time_arr.southern);
        if (getLocation(month, nor_arr)) {
            inNorth = <div className={classes.locationNorth}><p>N</p></div>;
            if (isNowN) {
                hasNow = <div className={classes.locationMonth}><p>Now</p></div>;
            }
            south_height = "40px";
        }
        if (getLocation(month, sou_arr)) {
            inSouth = <div className={classes.locationSouth} style={{top: south_height}}><p>S</p></div>;
            if (isNowS) {
                hasNow = <div className={classes.locationMonth}><p>Now</p></div>;
            }
        }
    } else {
        if (personality) {
            personality_comp = <div className={classes.personality}>
                <p>{personality}</p>
            </div>
        }

        if (species) {
            species_comp = <div className={classes.species}>
                <p>{species}</p>
            </div>
        }

        if (diy) {
            customize_height = "30px";
            vnumber_height += 25;
            diy_comp = <div className={classes.diy}>
                <img src={diy_icon} alt={"diy"}/>
            </div>
        }
        if (customize) {
            vnumber_height += 25;
            customize_comp = <div className={classes.customize} style={{top: customize_height}}>
                <img src={paint_icon} alt={"paint"}/>
            </div>
        }
        if (buy) {
            buy_comp = buy > 0 ?
                <div className={classes.buy}>
                    <img src={bell_icon} alt="bell"/>
                    <p>{buy}</p>
                </div> : <div className={classes.buy}>
                    <p>{nfs}</p>
                </div>
            buy_style = {margin: '4px'}
        }
        if (vnumber) {
            let height_style = vnumber_height.toString() + "px";
            vnumber_comp = <div className={classes.vnumber} style={{top: height_style}}>
                <p>{vnumber}</p>
            </div>
        }
    }
    let returned_item = (
        <div>
            <div className={classes.item_card} key={props.id} id = {props.id} onClick={clickFunction}>
                <div className={classes.image}>
                    {inNorth}
                    {inSouth}
                    {hasNow}
                    {personality_comp}
                    {species_comp}
                    {isMarked}
                    {diy_comp}
                    {customize_comp}
                    {vnumber_comp}
                    <img src={props.img} alt={props.name}></img>
                </div>
                <div className={classes.name}>
                    <p style={buy_style}>{props.name}</p>
                    {buy_comp}
                </div>
            </div>
            <ItemModal open={open} handleClose={handleClose} {...props}/>
        </div>
    );
    
    return returned_item;

}