import React, {useEffect, useState} from "react";
import CategoriesAPICall from "../../apiCalls/CategoriesAPICall";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const CategoriesList=(props)=>{

    const [categories,setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([])

    const getMainCategories = async ()=>{
        try {
            await CategoriesAPICall.getMainCategories()
                .then((response)=>{
                    setCategories(response.data.mainCategories)
                })
        }catch (e){
            console.log(e)
        }
    }

    const getSubCategoriesForCategory = async (categoryId)=>{
        try {
            await CategoriesAPICall.getSubCategoriesForCategory(categoryId)
                .then((response)=>{
                    setSubCategories(response.data.subcategories)
                })
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(()=>{
        getMainCategories()
    },[])
    return(
        <div className={"lightBackground pt-5"}>
            <div className={"container pb-5 text-center"}>
                <span className={"titles pb-5"}>Categories</span>
                <div className={"d-flex justify-content-center pt-3"}>
                    <Link className={"btn blueButton text-white w-50"} to={"/category/add"}>
                        <FontAwesomeIcon icon={faPlus} /> Add new category
                    </Link>
                </div>
                <div className={"row g-3 pt-4 pb-5"}>
                    {categories.map((item)=>{
                        return( <div className={"col-3  bg-secondary-subtle p-2 me-3 rounded"}>
                                    <button className={"btn w-100 fst-italic"} onClick={()=>getSubCategoriesForCategory(item._id)}>
                                        {item.name}
                                    </button>
                                </div>)
                    })}
                </div>

                <div className={"row gx-3 pt-4"}>
                    {subCategories.map((item)=>{
                        return(
                            <div className={"col-3"}>
                                <Link className={"card border-0 bg-transparent pt-3 subcategoriesCards"}>
                                    <img src={item.imageUrl} alt={"category"}
                                         className={"card-img-top rounded-circle"} />
                                    <div className="card-body">
                                        <h5 className="card-text">{item.name}</h5>
                                    </div>
                                </Link>


                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CategoriesList;