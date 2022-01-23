import React, {Component} from 'react';
import {useNavigate} from "react-router-dom";
import Category from './Category/Category';
import classes from './Category_p.module.css';


import Sea_Creatures_Icon from '../../../../../assets/images/Category/Museum/Umbrella_Octopus_Icon.png';
import Fish_Icon from '../../../../../assets/images/Category/Museum/Puffer_Fish_Icon.png';
import Bugs_Icon from '../../../../../assets/images/Category/Museum/Cyclommatus_Stag_Icon.png';
import Fossil_Icon from '../../../../../assets/images/Category/Museum/Fossil_Icon.png';
import Art_Icon from '../../../../../assets/images/Category/Museum/Painting_Category.png';

import Furniture_Icon from '../../../../../assets/images/Category/Store/Furniture_Icon.png';
import Tool_Icon from '../../../../../assets/images/Category/Store/Tool_Icon.png';
import Star_Icon from '../../../../../assets/images/Category/Store/Star_Icon.png';
import DIY_Icon from '../../../../../assets/images/Category/Store/DIY_Icon.png';
import Umbrella_Icon from '../../../../../assets/images/Category/Store/Umbrella_Icon.png';
import Food_Icon from '../../../../../assets/images/Category/Store/Food_Icon.png';

import Animal_Icon from '../../../../../assets/images/Category/Vill/Tia_Icon.png';
import Reaction_Icon from '../../../../../assets/images/Category/Vill/Emotion_Icon.png';
import Picture_Icon from '../../../../../assets/images/Category/Vill/Photo_Icon.png';
import Poster_Icon from '../../../../../assets/images/Category/Vill/Poster_Icon.png';

import Design_Icon from '../../../../../assets/images/Category/Able/Design_Isabelle.png';
import Top_Icon from '../../../../../assets/images/Category/Able/Top_Icon.png';
import Bottom_Icon from '../../../../../assets/images/Category/Able/Bottom_Icon.png';
import Dress_Icon from '../../../../../assets/images/Category/Able/Dress_Icon.png';
import Hat_Icon from '../../../../../assets/images/Category/Able/Hat_Icon.png';
import Other_Icon from '../../../../../assets/images/Category/Able/Other_Icon.png';
import Shoes_Icon from '../../../../../assets/images/Category/Able/Shoes_Icon.png';
import Socks_Icon from '../../../../../assets/images/Category/Able/Socks_Icon.png';
import Acc_Icon from '../../../../../assets/images/Category/Able/Acc_Icon.png';
import Bag_Icon from '../../../../../assets/images/Category/Able/Bag_Icon.png';


class CategoryPanel extends Component {
    state = {
        category_type: null
    }

    componentDidUpdate(prevProps) {
        if (this.state.category_type !== prevProps.category_type) {
            this.setState({category_type: this.state.category_type})
        }
    }

    catSelectHandler = (cat) => {
        this.props.navigate("/" + cat);
        
    }

    render() {
        let cPanel = null;
        const catMuseum = ["Sea_Creatures", "Fish", "Bugs", "Fossil", "Art"];
        const catStore = ["Furnitures", "Tools", "DIYs", "Umbrellas", "Material_and_Seeds", "Food"];
        const catVill = ["Animal", "Reactions", "Photos", "Posters"];
        const catAble = ["Design", "Tops", "Bottoms", "Dress__Up", "Headwear", "Accessories", "Socks", "Shoes", "Bags" ,"Clothing_Other"];
        let catList = null;
        switch (this.props.type) {
            case('catMuseum'):
                catList = catMuseum;
                break;
            case('catStore'):
                catList = catStore;
                break;
            case('catVill'):
                catList = catVill;
                break;
            case('catAble'):
                catList = catAble;
                break;
            default:
                catList = null;
        }
        //const catList = eval(this.props.type);

        let bundle = [];

        const Fish = Fish_Icon;
        const Sea_Creatures = Sea_Creatures_Icon;
        const Bugs = Bugs_Icon;
        const Fossil = Fossil_Icon;
        const Art = Art_Icon;

        const Furnitures = Furniture_Icon;
        const Tools = Tool_Icon;
        const Material_and_Seeds = Star_Icon;
        const DIYs = DIY_Icon;
        const Umbrellas = Umbrella_Icon;
        const Food = Food_Icon;

        const Animal = Animal_Icon;
        const Reactions = Reaction_Icon;
        const Photos = Picture_Icon;
        const Posters = Poster_Icon;

        const Design = Design_Icon;
        const Tops = Top_Icon;
        const Bottoms = Bottom_Icon;
        const Dress__Up = Dress_Icon;
        const Shoes = Shoes_Icon;
        const Socks = Socks_Icon;
        const Headwear = Hat_Icon;
        const Bags = Bag_Icon;
        const Accessories = Acc_Icon;
        const Clothing_Other = Other_Icon;
        
        let i;
        for (i = 0; i < catList.length; i++) {
            bundle.push(
                <Category
                    img_src={eval(catList[i])}
                    id={catList[i]}
                    key={catList[i] + 'catki'}
                    title={catList[i].replaceAll('__', '-').replaceAll('_', ' ').replaceAll('Clothing Other', 'Wet Suits').replaceAll('Design', 'Design (comming soon)')}
                    clicked={this.catSelectHandler.bind(this, catList[i])}/>);
        }

        let width = catList.length > 5 ? catList.length/2 * 160 : catList.length * 160;

        cPanel = (
            <div className={classes.Category_p} style={{width:width.toString()+"px"}}>
                {bundle}
            </div>
        )
        return cPanel;
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <CategoryPanel {...props} navigate={navigate}/>
}

export default WithNavigate
//export default withRouter(CategoryPanel);