import {gql} from '@apollo/client';

export const GET_FOSSILS = gql`
query GetFossils{    
    findAllFossils{
        _id
        uniqueId
        name
        sell
        imgUrl
        category
        description
        internalId
    }
}
`;

export const GET_ARTS = gql`
query GetArts{
    findAllArts{
        _id
        uniqueId
        category
        name
        tag
        title
        artist
        imgUrl
        genuine
        source
        description
        internalId
    }
}
`;

export const GET_MATERIALS = gql`
query getMaterials($after: String){
    findAllMaterial(after: $after){
        materials{
            _id
            uniqueId
            name
            buy
            diy
            internalId
            objIds
            imgUrl
        }
        hasMore
        cursor
    }
}
`
export const GET_MATERIAL = gql`
query getMaterial($id: String!) {
    findMaterialById(id: $id) {
        sell
        source
        sourceNotes
        recipeId
        internalId
    }
}
`
/*
export const GET_MITEM = gql`
query getMitem($mType: String!, $mId: Int!) {
    materialBymId(mType: $mType, mId:$mId) {
        ...on Material {
            name
            imgUrl
          }
          ...on Furniture {
            name
            imgUrl
          }
          ...on Clothes {
            name
            imgUrl
          }
          ...on Tool{
            name
            imgUrl
          }
    }
}
`
*/
export const GET_FURNITURES = gql`
query GetFurnitures($after: String){
    findAllFurniture(after: $after) {
        allFurniture{
            _id
            name
            category
            catalog
            diy
            buy
            imgUrl
            variants_len
            customize
            series
            internalId
        }
        hasMore
        cursor
    }
}
`;

export const GET_FURNITURE = gql`
query getFurniture($id: String!) {
    findFurnitureById(id: $id) {
        sell
        sourceNotes
        source
        catalog
        seasonEvent
        recipeId
        variants{
            uniqueEntryId
            variation
            image
            pattern
        }
    }
}
`

export const GET_RECIPEITEM = gql`
query getRecipeItem($itemId: Int!) {
    findRecipeByItem(itemId: $itemId) {
        name
        imgUrl
    }
}
`

export const GET_RECIPES = gql`
query getRecipes($after: String){
    findAllRecipes(after: $after) { 
        recipes{
            _id
            name
            imgUrl
            internalId
            materials{
                mType
                mId
            }
        }
        hasMore
        cursor
    }
}
`

export const GET_RECIPE_IDs = gql`
query GetRecipeIds($ids: [Int!]!) {
    findRecipeByIds(ids: $ids) {
        name
        imgUrl
    }
}
`

export const GET_RECIPE = gql`
query GetRecipe($id: String!) {
    findRecipeById(id: $id) {
        buy
        sell
        source
        sourceNotes
        recipesToUnlock
        craftedId
        materials {
            mName
            mCount
        }
    }
}
`

export const GET_CREATURES = gql`
query GetCreatures($category: String!) {
    findCreaturesByCategory(category: $category) {
        _id
        uniqueId 
        name
        sell
        whereHow
        imgUrl
        category
        shadow
        speed
        weather
        internalId
        catchUnlock
        activeMonths{
            northern
            southern
        }
        activeHours{
            northern
            southern
        }
    }
}
`;

export const GET_TOOLS = gql`
query GetTools{
    findAllTools{
        _id
        customize
        diy
        name
        internalId
        imgUrl
        buy
        variants_len
    }
}
`
export const GET_TOOL = gql`
query getTool($id: String!) {
    findToolById(id: $id) {
        sell
        sourceNotes
        source
        uses
        variants{
            uniqueEntryId
            variation
            image
        }
    }
}
`
export const GET_UMBRELLAS = gql`
query GetUmbrellas {
    findAllUmbrellas {
        _id
        name
        internalId
        diy
        buy
        uniqueId
        imgUrl
    }
}
`
export const GET_UMBRELLA = gql`
query getUmbrella($id: String!) {
    findUmbrellaById(id: $id) {
        source
        sourceNotes
        sell
        catalog
    }
}
`

export const GET_CLOTHES = gql`
query getClothes($category: String!) {
    findClothesByCategory(category: $category) {
        _id
        name
        diy
        buy
        imgUrl
        category
        internalId
        variants_len
    }
}
`

export const GET_ONE_CLOTHES = gql`
query getOneClothes($id: String!) {
    findClothesById(id: $id) {
        source 
        sourceNotes
        sell
        recipeId
        variants {
            uniqueEntryId
            variation
            closetImage
        }
    }
}
`;

export const GET_FOOD = gql`
query GetFood{
    findAllFood{
        _id
        customize
        diy
        name
        internalId
        imgUrl
        variants_len
    }
}
`

export const GET_ONE_FOOD = gql`
query GetOneFood($id: String!) {
    findFoodById(id: $id) {
        sell
        buy
        source
        foodPower
        variants{
            image
            pattern
        }
    }
}
`


export const GET_VILLAGERS = gql`
query GetVillagers{
    findAllVillagers{
        _id
        name
        imgUrl
        species
        personality
        favoriteSong
    }
}
`

export const GET_VILLAGER = gql`
query GetVillager($id: String!) {
    findVillagerById(id: $id) {
        houseImage
        hobby
        birthday
        catchphrase
        favoriteSaying
        furnitureList
        favoriteSong

    }
}
`

export const GET_POSTERS = gql`
query GetPosters{
    findAllPosters{
        _id
        name
        buy
        sell
        internalId
        imgUrl
    }
}
`

export const GET_PHOTOS = gql`
query GetPhotos{
    findAllPhotos{
        _id
        name
        diy
        customize
        internalId
        imgUrl
        variants_len
    }
}
`


export const GET_PHOTO = gql`
query GetPhoto($id: String!) {
    findPhotoById(id: $id) {
        buy
        source
        variants {
            image
            variation
        }
    }
}
`

export const GET_REACTIONS = gql`
query GetReactions{
    findAllReactions{
        _id
        name
        internalId
        imgUrl
    }
}
`


export const GET_REACTION = gql`
query GetReaction($id: String!) {
    findReactionById(id: $id) {
        source
        sourceNotes
    }
}`

export const GET_MUSIC = gql`
query GetMusic{
    findAllMusic{
        _id
        name
        buy
        sell
        internalId
        imgUrl
    }
}
`


export const GET_ONE_MUSIC = gql`
query GetOneMusic($id: String!) {
    findMusicById(id: $id) {
        source
        sourceNotes
        catalog
        sell
    }
}
`

export const GET_MUSIC_NAME = gql`
query GetMusicName($name: String!) {
    findMusicByName(name: $name) {
        imgUrl
    }
}
`



export const GET_MARKED_ITEMS = gql`
query getMarkedItems($personId: String!) {
    person(personId: $personId) {
        markedItems
    }
}
`

export const GET_RECIPE_MATERIAL = gql`
query getMaterialItemBymId($category: String!, $mid: Int!) {
    getMaterialItemBymId(category: $category, mid: $mid) {
        _id
        imgUrl
    }
}
`

export const GET_RECIPE_INFOS = gql`
query getRecipeInfos($categories: [String!]!, $mIds: [Int!]!) {
    findMaterialInfoBymIds(categories: $categories, mIds: $mIds) {
        _id
        imgUrl
    }
}
`