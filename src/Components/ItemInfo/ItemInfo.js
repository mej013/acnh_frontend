import React, {useEffect} from 'react';
import {useLazyQuery} from '@apollo/client';
import {GET_FURNITURE, 
        GET_RECIPEITEM, 
        GET_TOOL, 
        GET_UMBRELLA, 
        GET_MATERIAL, 
        GET_ONE_CLOTHES, 
        GET_RECIPE_IDs, 
        GET_RECIPE,
        GET_RECIPE_INFOS,
        GET_ONE_FOOD,
        GET_ONE_MUSIC,
        GET_VILLAGER,
        GET_PHOTO,
        GET_REACTION,
        GET_MUSIC_NAME
    } from '../graphql/quries';

import classes from './ItemInfo.module.css'
import SubItem from './SubItem/SubItem';
import bell_icon from '../../assets/images/Bells_Icon.png'

export default function ItemInfo(props) {
    const id = props.id;
    const itemId = props.internalId;
    const favoriteSong = props.song
    const cat = props.cat;
    const objs = props.objIds;
    let mTypes = props.materials ? props.materials.map((item) => {
        return item.mType
    }) : null;
    let mIds = props.materials ? props.materials.map((item) => {
        return item.mId;
    }) : null;


    const clothes_list = ["Tops", "Bottoms", "Dress-Up", "Headwear", "Accessories", "Socks", "Shoes", "Bags", "Clothing_Other" ];
    let isClothes = clothes_list.includes(cat);
    const [getFurniture, {data: furnitureData}] = useLazyQuery(GET_FURNITURE);
    const [getRecipeItem, {data: recipeData}] = useLazyQuery(GET_RECIPEITEM);
    const [getTool, {data: toolData}] = useLazyQuery(GET_TOOL);
    const [getUmbrella, {data: umbrellaData}] = useLazyQuery(GET_UMBRELLA);
    const [getMaterial, {data: materialData}] = useLazyQuery(GET_MATERIAL);
    const [getRecipeIds, {data: recipeObj}] = useLazyQuery(GET_RECIPE_IDs);
    const [getOneClothes, {data: clothesData}] = useLazyQuery(GET_ONE_CLOTHES);
    const [getRecipeInfos, {data: recipeInfodata}] = useLazyQuery(GET_RECIPE_INFOS);
    const [getFoodInfo, {data: foodData}] = useLazyQuery(GET_ONE_FOOD);
    const [getMusic, {data: musicData}] = useLazyQuery(GET_ONE_MUSIC);
    const [getReaction, {data: reactionData}] = useLazyQuery(GET_REACTION);
    const [getPhoto, {data: photoData}] = useLazyQuery(GET_PHOTO);
    const [getVillager, {data: villagerData}] = useLazyQuery(GET_VILLAGER);
    const [getMusicByName, {data: musicNameData}] = useLazyQuery(GET_MUSIC_NAME);


    const [getRecipe, {data: singleRecipeData}] = useLazyQuery(GET_RECIPE);
    let isMounted = true;
    useEffect(() => {
        if (isMounted) {
            if (cat === 'Tools') {
                getTool({variables: {id}});
            } else if (cat === 'Furnitures') {
                getFurniture({variables: {id}});
            } else if (cat === 'Umbrellas') {
                getUmbrella({variables: {id}});
            } else if (cat === 'Material_and_Seeds') {
                getMaterial({variables: {id}});
                if (objs) {
                    getRecipeIds({variables: {ids: objs}});
                }
            } else if (cat === 'Food') {
                getFoodInfo({variables: {id}});
            } else if (isClothes) {
                getOneClothes({variables: {id}});
            } else if (cat === 'DIYs') {
                getRecipe({variables:{id}});
                getRecipeInfos({variables: {categories: mTypes, mIds: mIds}})
                //getRecipeMaterial({variables: {category: cat, mid: props.internalId}})
            } else if (cat === 'Album') {
                getMusic({variables:{id}});
            } else if (cat === 'Animal') {
                getVillager({variables:{id}});
                getMusicByName({variables:{name: favoriteSong}})
            } else if (cat === 'Reactions') {
                getReaction({variables:{id}});
            } else if (cat === 'Photos') {
                getPhoto({variables:{id}})
            } 
            getRecipeItem({variables: {itemId}});
        }
        return () => {
            isMounted = false;
        };
    }, []);

    let recipeMaterial = singleRecipeData && singleRecipeData.findRecipeById ? singleRecipeData.findRecipeById : null;
    let recipeInfo = recipeInfodata && recipeInfodata.findMaterialInfoBymIds ? recipeInfodata.findMaterialInfoBymIds : null;
    let recipeName = recipeData ? recipeData.findRecipeByItem.name : null;
    let recipeImg = recipeData ? recipeData.findRecipeByItem.imgUrl : null;
    let recipe_comp = null;
    const fData = furnitureData ? furnitureData.findFurnitureById : null;
    const tData = toolData ? toolData.findToolById : null;
    const uData = umbrellaData ? umbrellaData.findUmbrellaById : null;
    const mData = materialData ? materialData.findMaterialById : null;
    const cData = clothesData ? clothesData.findClothesById: null;
    const rData = recipeMaterial ? recipeMaterial :null;
    const foData = foodData ? foodData.findFoodById : null;
    const muData = musicData ? musicData.findMusicById : null;
    const vData = villagerData ? villagerData.findVillagerById : null;
    const reData = reactionData ? reactionData.findReactionById: null;
    const phData = photoData ? photoData.findPhotoById : null;

    const data = fData || tData || uData || mData || cData || rData || foData || muData || vData || reData || phData;
    const objData = recipeObj ? recipeObj.findRecipeByIds : null;
    const [timeN, setTimeN] = React.useState(new Array(24).fill(false));
    const [timeS, setTimeS] = React.useState(new Array(24).fill(false));
    const MONTH_LENGTH = 12;
    const TIME_LENGTH = 24;

    let musicName = musicNameData && musicNameData.findMusicByName ? musicNameData.findMusicByName.imgUrl : null;
    let location = props.location;
    let location_comp = null;
    let price = data ? data.sell : null;
    let price_comp = null;
    let houseImg = data ? data.houseImage : null;
    let houseImg_comp = null;
    let speed = props.speed;
    let speed_comp = null;
    let phrase = props.phrase;
    let phrase_comp = null;
    let rar = props.rarity;
    let rar_comp = null;
    let shadow = props.sadow;
    let shadow_comp = null;
    let south_arr = props.south_arr;
    let south_comp = null;
    let north_arr = props.north_arr;
    let north_comp = null;
    let time_arr = props.time_arr;
    let time_comp_N = null;
    let time_comp_S = null;
    let desc = props.desc;
    let desc_comp = null;
    let weather = props.weather;
    let weather_comp = null;
    let title = props.title;
    let title_comp = null;
    let artist = props.artist;
    let artist_comp = null;
    let source = data ? data.source : null;
    let source_comp = null;
    let sourceNotes = data ? data.sourceNotes : null;
    let note_comp = null;
    let variants = data ? props.vnumber > 1 ? data.variants : null : null;
    let variants_comp = null;
    let uses = tData ? tData.uses : null;
    let uses_comp = null;
    let objIds = objData ? objData : null;
    let objs_comp = null;
    let objs_p = objIds && objIds.length > 0 ? <p>Related Recipe(s)</p> : null;
    let bdate_comp = data && data.birthday? <div className={classes.price}>
        <img src="https://dodo.ac/np/images/7/7b/Birthday_Cupcake_NH_Inv_Icon.png" alt="bd"/>
        <p>{data.birthday}</p> 
        </div>: null;

    let hobby_comp = data&&data.hobby&&data.catchphrase ? <div className={classes.source}> <p>{data.hobby} · "{data.catchphrase}"</p></div> : null;
    let song_comp = data&&data.favoriteSong ? <div className={classes.song}><img height="170px" src={musicName}/><p>{data.favoriteSong}</p></div> : null;
    let saying_comp = data&&data.favoriteSaying? <div className={classes.saying}><p>{data.favoriteSaying}</p></div> : null;

    let materials_comp = null;
    const initialize_array = (month_arr, month) => {
        let i = 0;
        for (i = 0; i < month.length; i++) {
            if (month_arr.includes(i + 1)) {
                month[i] = 'true';
            } else {
                month[i] = 'false';
            }
        }
    }

    const initialize_time = (time_arr, time) => {
        let i = 0;
        for (i = 0; i < time.length; i++) {
            if (time_arr.includes(i)) {
                time[i] = 'true';
            } else {
                time[i] = 'false';
            }
        }
    }

    const reduceHours = (hour) => {
        let reducedHours = []
        let hours = hour.split("-");
        let a = parseInt(hours[0]);
        let b = parseInt(hours[1]);
        let i;
        if (a > b) {
            for (i = a; i < 24; i++) {
                reducedHours.push(i);
            }
            for (i = 0; i < b; i++) {
                reducedHours.push(i);
            }
        } else {
            for (i = a; i < b; i++) {
                reducedHours.push(i);
            }
        }
        return reducedHours;
    }

    const getHours = (hour) => {
        let hours = [];
        let i;
        if (hour === 'Allday') {
            for (i = 0; i < 24; i++) {
                hours.push(i);
            }
        } else if (hour === 'NA') {
            for (i = 0; i < 24; i++) {
                hours.push(-1);
            }
        } else {
            let hourArr = hour.split(",");
            if (hourArr.length === 1) {
                hours = reduceHours(hourArr[0]);
            } else if (hourArr.length === 2) {
                hours = reduceHours(hourArr[0]).concat(reduceHours(hourArr[1]));
            }
        }
        return hours;
    }

    const timeByMonthN = [];
    const timeByMonthS = [];
    let time_displayN = new Array(TIME_LENGTH);
    let time_displayS = new Array(TIME_LENGTH);
    const changeTime = (month, north) => {
        if (north) {
            initialize_time(timeByMonthN[month - 1], time_displayN);
            setTimeN(time_displayN);
        } else {
            initialize_time(timeByMonthS[month - 1], time_displayS);
            setTimeS(time_displayS);
        }
    }



    if (time_arr) {
        const time_N = time_arr.northern;
        const time_S = time_arr.southern;
        let i;
        for (i = 0; i < MONTH_LENGTH; i++) {
            let time_stringN = time_N[i];
            let time_stringS = time_S[i];
            timeByMonthN.push(getHours(time_stringN))
            timeByMonthS.push(getHours(time_stringS));
        }
        let renderedN = timeN.map((item, index) => {
            return <div key={"timeN" + (index)} id={classes['timeN_' + item]}><p>{index}</p></div>
        })

        let renderedS = timeS.map((item, index) => {
            return <div key={"timeS" + (index)} id={classes['timeS_' + item]}><p>{index}</p></div>
        })

        time_comp_N = (
            <div className={classes.time}>
                {renderedN}
            </div>)
        time_comp_S = (
            <div className={classes.time}>
                {renderedS}
            </div>
        )
    }

    if (houseImg) {
        houseImg_comp = <div className={classes.house}>            
            <img height="320px" src={houseImg} alt={data.name+"house"}/>
        </div>
    }

    if (phrase) {
        phrase_comp = <div className={classes.phrase}><p>{phrase}</p></div>
    }

    if (desc) {
        desc_comp = <div className={classes.phrase}><p>{desc}</p></div>
    }

    if (title) {
        title_comp = <div className={classes.artTitle}><p>{title}</p></div>
    }

    if (artist) {
        artist_comp = <div className={classes.artist}><p>{"By " + artist}</p></div>
    }
    const month_abbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (north_arr) {
        let north_test = new Array(MONTH_LENGTH);
        initialize_array(north_arr, north_test);
        let zipped = month_abbr.map((x, i) => [x, north_test[i]]);
        let rendered = zipped.map((item, i) => <div onClick={() => changeTime(i + 1, true)} key={"north" + item[0]}
                                                    className={classes[item[1]]}><p>{item[0]}</p></div>)
        north_comp = (<div>
            <p id={classes.NS_title}>North</p>
            <div className={classes.month}>
                {rendered}
            </div>
        </div>)
    }

    if (south_arr) {
        let south_test = new Array(MONTH_LENGTH);
        initialize_array(south_arr, south_test);
        let zipped = month_abbr.map((x, i) => [x, south_test[i]]);
        let rendered = zipped.map((item, i) => <div onClick={() => changeTime(i + 1, false)} key={"south" + item[0]}
                                                    className={classes[item[1]]}><p>{item[0]}</p></div>)
        south_comp = (<div>
            <p id={classes.NS_title}>South</p>
            <div className={classes.month}>
                {rendered}
            </div>
        </div>)
    }


    if (price) {
        price_comp = <div className={classes.price}>
            <img src={bell_icon} alt='test'/>
            <p>{price}</p>
        </div>
    }
    if (speed) {
        speed_comp = <div><p>Speed: {speed}</p></div>
    }
    if (weather) {
        weather_comp = <div><p>{weather}</p></div>
    }
    if (location) {
        //location = location.replace('&',' ');
        location_comp = <div><p>{location}</p></div>
    }
    if (shadow) {
        shadow = shadow.split('(')[0];
        shadow_comp = <div><p>Size: {shadow}</p></div>
    }
    if (rar) {
        rar_comp = <div><p>{rar}</p></div>
    }

    if (source) {
        let power = data&&data.foodPower ? " · " + data.foodPower + " energy points" : null;
        source_comp = <div className={classes.source}><p>{source.join(' / ') + power}</p></div>
    }
    if (sourceNotes) {
        note_comp = <div className={classes.note}><p>{sourceNotes}</p></div>
    }
    if (variants) {
        let i;
        let subItems = [];
        for (i = 0; i < variants.length; i++) {
            let variation = variants[i].variation ? variants[i].variation : "";
            let pattern = variants[i].pattern ? variants[i].pattern : "";
            let image = isClothes ? variants[i].closetImage : variants[i].image;
            subItems.push(
                <SubItem
                    name={props.name}
                    key={variants[i].uniqueEntryId}
                    id={variants[i].uniqueEntryId}
                    imgUrl= {image} 
                    title={variation + " " + pattern}
                />)
        }
        variants_comp = subItems;
    }

    if (recipeMaterial && recipeInfo) {
        let materials = recipeMaterial.materials.map((material, index) => { 
            return <div key={material.mId + "_" + index} className={classes.materialInfo}>
                <p>{material.mName}</p>
                <img src={recipeInfo[index].imgUrl} alt={material.mName}/>
                <p>{"x" + material.mCount}</p>
            </div>
        })    
        materials_comp = (
            <div className={classes.materials}>
                {materials}  
            </div>
        ) 
    }

//<h5>recipe (click for more information)</h5>
    if (recipeName) {
        recipe_comp =
            <div className={classes.recipe}>
                <h5> recipe (click function coming soon!)</h5>
                <div className={classes.recipeInfo}>
                    <img src={recipeImg} alt={recipeName}/>
                    <p>{recipeName}</p>
                </div>
            </div>
    }

    if (uses) {
        uses = uses === -1 ? "Uses: unlimited" : "Uses: " + uses;
        uses_comp =
            <div className={classes.uses}>
                <p>{uses}</p>
            </div>
    }
    if (objIds && objIds.length > 0) {
        objs_comp = objIds.map(data =>
            <div className={classes.objInfo}>
                <img src={data.imgUrl} alt={data.name}/>
                <p>{data.name}</p>
            </div>);
    }
    return (
        <div className={classes.card}>
            <div className={classes.title}>
                <p>{props.name}</p>
                <img src={props.img} alt={props.name}/>
            </div>
            {price_comp}
            {title_comp}
            {artist_comp}
            {phrase_comp}
            {source_comp}
            {note_comp}
            {uses_comp}
            {desc_comp}
            {materials_comp}
            <div className={classes.ava}>
                {speed_comp}
                {shadow_comp}
                {location_comp}
                {rar_comp}
                {weather_comp}
            </div>
            {bdate_comp}
            {hobby_comp}
            <div className={classes.houseInfo}>
                {houseImg_comp}
                <div className={classes.vInfo}>
                    {saying_comp}
                    {song_comp}
                </div>
            </div>
            {recipe_comp}
          
            
            <div className={classes.variants}>
                <div className={classes.vlist}>
                    {variants_comp}
                </div>
            </div>
            <div className={classes.objs}>
                {objs_p}
                {objs_comp}
            </div>
            {north_comp}
            {time_comp_N}
            {south_comp}
            {time_comp_S}
        </div>
    )
}