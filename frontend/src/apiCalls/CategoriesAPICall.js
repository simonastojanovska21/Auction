import axios from "axios";

const CategoriesAPICall={
    addNewCategory:(name,imageUrl,isSubcategory,mainCategoryId)=>{
        return axios.post('http://localhost:3001/category/add',{
            "name":name,
            "imageUrl":imageUrl,
            "isSubcategory":isSubcategory,
            "mainCategoryId":mainCategoryId
        })
    },

    getMainCategories:()=>{
        return axios.get('http://localhost:3001/category/mainCategories')
    },

    getSubCategoriesForCategory:(categoryId)=>{
        return axios.get(`http://localhost:3001/category/subcategories/${categoryId}`)
    }
}

export default CategoriesAPICall;