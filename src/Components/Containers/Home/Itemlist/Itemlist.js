import React, {useEffect, useState} from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {Waypoint} from 'react-waypoint';
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import {
    GET_FOSSILS,
    GET_ARTS,
    GET_CREATURES,
    GET_FURNITURES,
    GET_MATERIALS,
    GET_TOOLS,
    GET_UMBRELLAS,
    GET_RECIPES,
    GET_CLOTHES,
    GET_MARKED_ITEMS,
    GET_FOOD,
    GET_PHOTOS,
    GET_POSTERS,
    GET_VILLAGERS,
    GET_MUSIC,
    GET_REACTIONS
} from '../../../graphql/quries';
import { MARK_ITEM, UNMARK_ITEM } from '../../../graphql/mutation';
import Item from '../../../Item/Item';
import classes from './Itemlist.module.css';
import {CircularProgress} from '@material-ui/core'
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function Itemlist() {
    const [cat, setCat] = useState('');
    const [marking, setMarking] = useState(false);
    const [ locationKeys, setLocationKeys ] =useState([])
    const navigate = useNavigate()
    
    const [getCreatures, {data: creatureData}] = useLazyQuery(GET_CREATURES);
    const [getFossils, {data: fossilData}] = useLazyQuery(GET_FOSSILS);
    const [getArts, {data: artData}] = useLazyQuery(GET_ARTS);
    const [getClothes, {data: clothesData}] = useLazyQuery(GET_CLOTHES);
    const [getAllFood, {data: foodData}] = useLazyQuery(GET_FOOD);
    const [getPhotos, {data: photoData}] = useLazyQuery(GET_PHOTOS);
    const [getPosters, {data: posterData}] = useLazyQuery(GET_POSTERS);
    const [getVillagers, {data: villagerData}] = useLazyQuery(GET_VILLAGERS);
    const [getMusic, {data: musicData}] = useLazyQuery(GET_MUSIC);
    const [getReactions, {data: reactionData}] = useLazyQuery(GET_REACTIONS);

    const userId = localStorage.getItem(process.env.REACT_APP_USER_ID);
    const {data: markData, refetch} = useQuery(GET_MARKED_ITEMS, {variables:{personId: userId}});
    const markList = markData && markData.person ? markData.person.markedItems: null;

    const [mark] = useMutation(MARK_ITEM);
    const [unmark] = useMutation(UNMARK_ITEM);

    const [getFurnitures, {
        data: furnitureData,
        fetchMore: fetchMoreFurnitures,
    }] = useLazyQuery(GET_FURNITURES, {
        notifyOnNetworkStatusChange: true
    });
    const [getMaterials, {
        data: materialData,
        fetchMore: fetchMoreMaterials,
    }] = useLazyQuery(GET_MATERIALS, {
        notifyOnNetworkStatusChange: true
    });
    const [getTools, {data: toolData}] = useLazyQuery(GET_TOOLS);
    const [getUmbrellas, {data: umbrellaData}] = useLazyQuery(GET_UMBRELLAS);
    const [getRecipes, {
        data: recipeData,
        fetchMore: fetchMoreRecipes,
    }] = useLazyQuery(GET_RECIPES);

    const clothes_list = ["Tops", "Bottoms", "Dress-Up", "Headwear", "Accessories", "Socks", "Shoes", "Bags", "Clothing_Other" ];
    const creature_list = ["Bugs", "Fish", "Sea_Creatures"];
    const {itemCat} = useParams();
    useEffect(() => {
        if (itemCat) {
            setCat(itemCat.replace('__', '-'));
        }
        if (cat) {
            if (cat === 'Fossil') {
                getFossils();
            } else if (cat === 'Art') {
                getArts();
            } else if (cat === 'Furnitures') {
                getFurnitures();
            } else if (cat === 'Material_and_Seeds') {
                getMaterials();
            } else if (cat === 'Tools') {
                getTools();
            } else if (cat === 'Umbrellas') {
                getUmbrellas();
            } else if (cat === 'DIYs') {
                getRecipes();
            } else if (cat === 'Food') {
                getAllFood();
            } else if (cat === 'Album') {
                getMusic();
            } else if (cat === 'Animal') {
                getVillagers();
            } else if (cat === 'Reactions') {
                getReactions();
            } else if (cat === 'Posters') {
                getPosters();
            } else if (cat === 'Photos') {
                getPhotos();
            }
            else if (clothes_list.includes(cat)) {
                getClothes({variables: {category: cat}});
            } 
            else if (creature_list.includes(cat)) {
                getCreatures({variables: {category: cat}});
            }
        }
    }, [cat]);

    let location = useLocation();
    useEffect(() => {
        refetch()
        setLocationKeys(location.key)
      }, [ locationKeys, ])
    
    const markItem = (personId, internalId, id) => {
        if (userId) {
            var markedContent = document.getElementById(internalId.toString() + "marked");
            if (markedContent) {
                markedContent.setAttribute('target', 'unmark');
                return unmark({variables:{userId: personId, internalId: internalId}})
            } else {
                var element = document.getElementById(id).getElementsByTagName('div')[0];
                var content = document.createElement('div');
                content.setAttribute('target', 'marked');
                content.setAttribute('id', internalId.toString()+"marked")
                var content_child = document.createElement('p');
                var node = document.createTextNode('Marked');
                content_child.appendChild(node);
                content.appendChild(content_child);
                element.appendChild(content);
                return mark({variables:{userId: personId, internalId: internalId}}); 
            }
        }
        else return null;
    }


    

    const handleMark = () => {
        if (!userId) Swal.fire(
            {
                title: 'Note', 
                text: "Please log in first to mark items", 
                confirmButtonText:'OK',
                confirmButtonColor: 'rgb(247,175,128)',
                background: '#fff0e6',
                padding: '20px'
            });
        else {
            setMarking(!marking);
        }
    }

    
    const markButtonText = marking ? "Stop Marking" : "Mark Items";
    const markedButton = cat != "Animal"?<Button className={classes.MarkButton} onClick={handleMark}>{markButtonText}</Button>:null;

    let isCreature = creature_list.includes(cat); 
    let isClothes = clothes_list.includes(cat);
    let posts = <CircularProgress style={{color: "#EFE486", position: "absolute", top: "20px"}}/>;
    let post = null;
    if (creatureData || fossilData || artData || furnitureData || materialData || toolData || 
        umbrellaData || recipeData || clothesData || foodData || villagerData || reactionData || posterData || photoData || musicData) {
        if (cat === 'Fossil') {
            post = fossilData.findAllFossils.map((fossil, _id) => {
                return  <Item
                    key={_id}
                    id={fossil.uniqueId}
                    name={fossil.name}
                    desc={fossil.description}
                    img={fossil.imgUrl}
                    cat={cat}
                    internalId={fossil.internalId}
                    marked = {markList ? markList.includes(fossil.internalId) : false}
                    price={fossil.sell}
                    marking = {marking}
                    clicked={()=>markItem(userId, fossil.internalId, fossil.uniqueId)}/>
            })
        } else if (cat === 'Art') {
            post = artData.findAllArts.map((art, _id) => {
                return <Item
                    key={_id}
                    id={art.uniqueId}
                    name={art.name}
                    source={art.source}
                    marked = {markList ? markList.includes(art.internalId) : false}
                    internalId={art.internalId}
                    title={art.title}
                    artist={art.artist}
                    desc={art.description}
                    img={art.imgUrl}
                    marking = {marking}
                    tag={art.tag}
                    cat={cat}
                    clicked={()=>markItem(userId, art.internalId, art.uniqueId)}/>
            })
        } else if (cat === 'Food') {
            post = foodData.findAllFood.map((food, _id) => {
                return <Item
                    key = {_id}
                    id = {food._id}
                    name = {food.name}
                    isDIY = {food.diy}
                    isCustomize={food.customize}
                    internalId = {food.internalId}
                    marked = {markList ? markList.includes(food.internalId) : false}
                    img = {food.imgUrl}
                    marking = {marking}
                    cat = {cat}
                    clicked={()=>markItem(userId, food.internalId, food._id)}
                    />
            })
        } else if (cat === 'Photos') {
            post = photoData.findAllPhotos.map((photo,_id) => {
                return <Item
                    key={_id}
                    id={photo._id}
                    name={photo.name}
                    img={photo.imgUrl} 
                    isDIY={photo.diy}
                    isCustomize={photo.customize}
                    vnumber={photo.variants_len}
                    cat={cat}
                    marked = {markList ? markList.includes(photo.internalId) : false}
                    marking={marking}
                    clicked={()=>markItem(userId, photo.internalId, photo._id)}
                />
            })
        } else if (cat === 'Animal') {
            post = villagerData.findAllVillagers.map((villager, _id) => {
                return <Item
                    key={_id}
                    id={villager._id}
                    name={villager.name}
                    img={villager.imgUrl}
                    personality={villager.personality}
                    song={villager.favoriteSong}
                    species={villager.species}
                    cat={cat}
                />
            })
        } else if (cat === 'Reactions') {
            post = reactionData.findAllReactions.map((reaction, _id) => {
                return <Item
                    key={_id}
                    id={reaction._id}
                    name={reaction.name}
                    img={reaction.imgUrl}
                    internalId={reaction.internalId}
                    marked = {markList ? markList.includes(reaction.internalId) : false}
                    marking={marking}
                    cat={cat}
                    clicked={()=>markItem(userId, reaction.internalId, reaction._id)}
                />
            })
        } else if (cat === 'Posters') {
            post = posterData.findAllPosters.map((poster,_id) => {
                return <Item
                    key={_id}
                    id={poster._id}
                    name={poster.name}
                    img={poster.imgUrl}
                    internalId={poster.internalId}
                    cat={cat}
                    marked = {markList ? markList.includes(poster.internalId) : false}
                    marking={marking}
                    clicked={()=>markItem(userId, poster.internalId, poster._id)}
                />
            })
        } else if (cat === 'Album') {
            post = musicData.findAllMusic.map((music, _id) => {
                return <Item
                    key={_id}
                    id={music._id}
                    name={music.name}
                    img={music.imgUrl?music.imgUrl:"https://dodo.ac/np/images/6/6b/Aircheck_NH_Inv_Icon.png"}
                    internalId={music.internalId}
                    marked = {markList ? markList.includes(music.internalId) : false}
                    marking={marking}
                    cat={cat}
                    clicked={()=>markItem(userId, music.internalId, music._id)}
                />
            })
        }
        else if (isCreature) {
            post = creatureData.findCreaturesByCategory.map((creature, id) => {
                return <Item
                    key={id}
                    id={creature.uniqueId}
                    name={creature.name}
                    img={creature.imgUrl}
                    location={creature.whereHow}
                    speed={creature.speed}
                    shadow={creature.shadow}
                    isCreature={isCreature}
                    price={creature.sell}
                    numberUnlock={creature.catchUnlock}
                    internalId={creature.internalId}
                    weather={creature.weather}
                    north_arr={creature.activeMonths.northern}
                    south_arr={creature.activeMonths.southern}
                    time_arr={creature.activeHours}
                    marked = {markList ? markList.includes(creature.internalId) : false}
                    marking = {marking}
                    clicked={()=>markItem(userId, creature.internalId, creature.uniqueId)}
                />
            })
        } else if (isClothes) {
            post = clothesData.findClothesByCategory.map((clothes, id) => {
                return <Item 
                    key = {id}
                    id = {clothes._id}
                    name = {clothes.name}
                    img = {clothes.imgUrl}
                    buy = {clothes.buy}
                    isDIY = {clothes.diy}
                    internalId = {clothes.internalId}
                    vnumber = {clothes.variants_len}
                    price = {clothes.sell}
                    cat = {cat}
                    marked = {markList ? markList.includes(clothes.internalId) : false}
                    marking = {marking}
                    clicked={()=>markItem(userId, clothes.internalId, clothes._id)}
                />
            })
        } else if (cat === 'Furnitures') {
            post = furnitureData.findAllFurniture.allFurniture.map((furniture, i) => {
                return <React.Fragment key={furniture._id + i}>
                    <Item
                        id={furniture._id}
                        name={furniture.name}
                        img={furniture.imgUrl}
                        buy={furniture.buy}
                        isCustomize={furniture.customize}
                        isDIY={furniture.diy}
                        series={furniture.series}
                        vnumber={furniture.variants_len}
                        cat={cat}
                        internalId={furniture.internalId}
                        marked = {markList ? markList.includes(furniture.internalId) : false}
                        marking = {marking}
                        clicked={()=>markItem(userId, furniture.internalId, furniture._id)}
                    />
                    {furnitureData.findAllFurniture.hasMore && i === furnitureData.findAllFurniture.allFurniture.length - 1 && (
                        <Waypoint onEnter={() => fetchMoreFurnitures({
                            variables: {
                                after: furnitureData.findAllFurniture.cursor
                            }
                        })}/>
                    )}
                </React.Fragment>
            })
            
        } else if (cat === 'Material_and_Seeds') {
            post = materialData.findAllMaterial.materials.map((material, i) => {
                return <React.Fragment key={material._id + i}>
                    <Item
                        id={material._id}
                        name={material.name}
                        img={material.imgUrl}
                        internalId={material.internalId}
                        cat={cat}
                        isDIY={material.diy}
                        objIds={material.objIds}
                        buy={material.buy}
                        marked = {markList ? markList.includes(material.internalId) : false}
                        marking = {marking}
                        clicked={()=>markItem(userId, material.internalId, material._id)}
                    />

                    {materialData.findAllMaterial.hasMore && i === materialData.findAllMaterial.materials.length - 1 && (
                        <Waypoint onEnter={() => fetchMoreMaterials({
                            variables: {
                                after: materialData.findAllMaterial.cursor
                            }
                        })}/>
                    )}
                </React.Fragment>
            })
            /*
            {
                if (materialNetwork <= 6){
                    return (<CircularProgress/>)
                } 
            }*/
        } else if (cat === 'DIYs') {
            post = recipeData.findAllRecipes.recipes.map((recipe, i) => {
                return <React.Fragment key={recipe._id + i}>
                    <Item
                        id={recipe._id}
                        name={recipe.name}
                        img={recipe.imgUrl}
                        materials={recipe.materials}
                        marked = {markList ? markList.includes(recipe.internalId) : false}
                        internalId = {recipe.internalId}
                        marking = {marking}
                        cat = {cat}
                        clicked={()=>markItem(userId, recipe.internalId, recipe._id)}
                    />
                    {recipeData.findAllRecipes.hasMore && i === recipeData.findAllRecipes.recipes.length - 1 && (
                        <Waypoint onEnter={() => fetchMoreRecipes({
                            variables: {
                                after: recipeData.findAllRecipes.cursor
                            }
                        })}/>
                    )}
                </React.Fragment>
            })
        } else if (cat === 'Tools') {
            post = toolData.findAllTools.map((tool, i) => {
                return <Item
                    key={tool._id + i}
                    id={tool._id}
                    name={tool.name}
                    img={tool.imgUrl}
                    buy={tool.buy}
                    isCustomize={tool.customize}
                    isDIY={tool.diy}
                    internalId={tool.internalId}
                    vnumber={tool.variants_len}
                    marked = {markList ? markList.includes(tool.internalId) : false}
                    marking = {marking}
                    clicked={()=>markItem(userId, tool.internalId, tool._id)}
                    cat={cat}/>
            })
        } else if (cat === 'Umbrellas') {
            post = umbrellaData.findAllUmbrellas.map((umbrella, i) => {
                return <Item
                    key={umbrella._id + i}
                    id={umbrella._id}
                    name={umbrella.name}
                    internalId={umbrella.internalId}
                    img={umbrella.imgUrl}
                    buy={umbrella.buy}
                    isDIY={umbrella.diy}
                    cat={cat}
                    marked = {markList ? markList.includes(umbrella.internalId) : false}
                    marking = {marking}
                    clicked={()=>markItem(userId, umbrella.internalId, umbrella._id)}
                />
            })
        }
        posts = (
            <div>
                {markedButton}
                <div className={classes.list} key={cat}>
                    {post}
                </div>
            </div>
        )

    }
    return posts;
}
