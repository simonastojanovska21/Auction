import React, {useEffect, useState} from "react";
import CategoriesAPICall from "../../apiCalls/CategoriesAPICall";
import $ from "jquery";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";
import ItemsAPICall from "../../apiCalls/ItemsAPICall";
import {useNavigate} from "react-router-dom";

const AddNewItem=(props)=>{

    const [formData, updateFormData] = useState({
        name:"",
        description:""
    })

    const handleChange = (e)=>{
        updateFormData({
            ...formData,
            [e.target.name] : e.target.value.trim()
        })
    }

    const [categories, setCategories] = useState([])

    const [imagesCount, setImagesCount] = useState(1)

    const navigate = useNavigate();

    const getAllCategories=async () => {
        await CategoriesAPICall.getAllCategories()
            .then((response) => {
                setCategories(response.data.categories)
            })
    }

    const onAddNewItem=async () => {
        const name = formData.name;
        const description = formData.description;
        const sellerUsername = localStorage.getItem("username");
        let selectedCategory = $('select[name="category"] option:selected')

        const categories = [{'_id': selectedCategory.parent().attr('data-id'),
            'name': selectedCategory.parent().attr('label')},
            {'_id': selectedCategory.attr('data-id'),
                'name': selectedCategory.attr('value')}]
        let imagesUrl = []
        $('input[name="imageUrl"]').each(function () {
            imagesUrl.push(this.value)
        })
        await ItemsAPICall.addNewItem(name, description, sellerUsername, imagesUrl, categories)
        navigate('/itemsForUser')
    }

    useEffect(()=>{
        getAllCategories()
    },[])

    return(
        <div className={"lightBackground pt-5"}>
            <div className={"container pt-3 pb-5 text-center"}>
                <span className={"titles pb-5"}>Add new item</span>
                <div className={"d-flex justify-content-center"} >
                    <div className="shadow-lg p-3 mt-5 mb-5 bg-body-tertiary rounded text-start"
                         style={{width:'70%'}}>
                        <div className={"row gy-2 pt-3"}>
                            <div className="col-4 text-end fw-bold">
                                <div className="p-2">Item name</div>
                            </div>
                            <div className="col-8">
                                <input type="text" className="form-control" name={"name"} onChange={handleChange}  />
                            </div>

                            <div className="col-4 text-end fw-bold">
                                <div className="p-2">Item description</div>
                            </div>
                            <div className="col-8">
                                <textarea className="form-control" name={"description"} onChange={handleChange} />
                            </div>

                            <div className={"col-4 text-end fw-bold"}>
                                <div className={"p-2"}>Category</div>
                            </div>
                            <div className={"col-8"}>
                                <select className={"form-select"} name={"category"}>
                                    <option>Select category</option>
                                    {categories.map(mainCat=>{
                                        return(
                                            <optgroup data-id={mainCat._id} label={mainCat.name}>
                                                {mainCat.subcategories.map(subCat=>{
                                                    return(
                                                        <option data-id={subCat._id} value={subCat.name}>
                                                            {subCat.name}
                                                        </option>
                                                    )
                                                })}
                                            </optgroup>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className={"col-4 text-end fw-bold"}>
                                <div className={"p-2"}>Images urls</div>
                                <button name="quantity" className={"btn blueButton"} type="button"
                                        onClick={()=>setImagesCount(imagesCount+1)}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                                <button name="quantity" className={"btn blueButton ms-3"} type="button"
                                        onClick={()=>
                                        {if(imagesCount>0)
                                            setImagesCount(imagesCount-1)
                                        }}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                            </div>
                            <div className={"col-8"}>
                                {Array.apply(null, {length: imagesCount}).map((image)=>{
                                    return(
                                        <input type="text" className={"form-control mt-3"} name="imageUrl"/>
                                    )
                                })}

                            </div>


                            <div className={"d-flex justify-content-center pt-4"}>
                                <button className={"btn w-75 redButton text-white"} onClick={()=>onAddNewItem()} >
                                    Add new item
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewItem;