import axios from "axios";

const ItemsAPICall={
    addNewItem:(name,description, sellerUsername, imagesUrl,categories )=>{
        return axios.post('http://localhost:3001/item/add',{
            name:name,
            description:description,
            sellerUsername:sellerUsername,
            imagesUrl:imagesUrl,
            categories:categories
        })
    },

    getAllItemsForUser:(username)=>{
        return axios.get(`http://localhost:3001/item/itemsForUser/${username}`)
    },

    deleteItemForUser:(itemId)=>{
        return axios.get(`http://localhost:3001/item/delete/${itemId}`)
    },

    getItemById:(itemId)=>{
        return axios.get(`http://localhost:3001/item/${itemId}`)
    },

    editItem:(itemId, name, description, imagesUrl, categories)=>{
        return axios.post(`http://localhost:3001/item/edit`,{
            itemId:itemId,
            name:name,
            description:description,
            imagesUrl:imagesUrl,
            categories:categories
        })
    },

    editItemImages:(itemId, imagesUrl)=>{
        return axios.post(`http://localhost:3001/item/editImages`,{
            itemId:itemId,
            imagesUrl:imagesUrl
        })
    }
}

export default ItemsAPICall;