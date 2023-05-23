import React, {useEffect, useState} from "react";
import CategoriesAPICall from "../../apiCalls/CategoriesAPICall";
import {useNavigate} from "react-router-dom";


const AddCategory=(props)=>{

    const navigate = useNavigate();

    const [categoriesList, setCategoriesList] = useState([])

    const [formData, updateFormData] = useState({
        name:"",
        imageUrl:"",
        categoryType:"mainCategory",
        mainCategoryId:""
    })

    const handleChange=(e)=>{
        updateFormData({
            ...formData,
            [e.target.name] : e.target.value.trim()
        })
    }

    const onAddNewCategory=async (e) => {
        console.log(formData)
        const isSubcategory = formData.categoryType !== "mainCategory";
        await CategoriesAPICall.addNewCategory(formData.name, formData.imageUrl, isSubcategory, formData.mainCategoryId)
        navigate("/categories")
    }

    const getCategories = async ()=>{
        try {
            await CategoriesAPICall.getMainCategories()
                .then((response)=>{
                    setCategoriesList(response.data.mainCategories)
                })
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(()=>{
        getCategories()
    },[])


    return(
        <div className={"lightBackground pt-5"}>
            <div className={"container pt-3 pb-5 text-center"}>
                <span className={"titles pb-5"}>Add new category</span>
                <div className={"d-flex justify-content-center"} >
                    <div className="shadow-lg p-3 mt-5 mb-5 bg-body-tertiary rounded text-start"
                         style={{width:'70%'}}>
                        <div className={"row gy-2 pt-3"}>
                            <div className="col-4 text-end fw-bold">
                                <div className="p-2">Category name</div>
                            </div>
                            <div className="col-8">
                                <input type="text" className="form-control" name={"name"} onChange={handleChange} />
                            </div>

                            <div className="col-4 text-end fw-bold">
                                <div className="p-2">Image Url</div>
                            </div>
                            <div className="col-8">
                                <input type="text" className="form-control" name={"imageUrl"} onChange={handleChange} />
                            </div>

                            <div className="col-4 text-end fw-bold">
                                <div className="p-2">Type of category</div>
                            </div>
                            <div className="col-8">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" id={"mainCategory"}
                                           value={"mainCategory"}
                                           name="categoryType"
                                            onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="mainCategory">
                                            Main category
                                        </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" id={"subCategory"}
                                           value={"subCategory"}
                                           name="categoryType"
                                           onChange={handleChange}/>
                                        <label className="form-check-label" htmlFor="subCategory">
                                            Subcategory
                                        </label>
                                </div>
                            </div>

                            {formData.categoryType === "subCategory" ? <>
                                <div className="col-4 text-end fw-bold">
                                    <div className="p-2">Main category</div>
                                </div>
                                <div className="col-8">
                                    <select className="form-select" name={"mainCategoryId"} onChange={handleChange}>
                                        <option>Select main category</option>
                                        {categoriesList.map((item)=>{
                                            return(
                                                <option value={item._id}>{item.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </> : <></>}

                            <div className={"d-flex justify-content-center pt-4"}>
                                <button className={"btn w-75 redButton text-white"} onClick={()=>onAddNewCategory()} >
                                    Add new category
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCategory;