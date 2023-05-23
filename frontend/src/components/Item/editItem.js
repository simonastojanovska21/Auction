import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import ItemsAPICall from "../../apiCalls/ItemsAPICall";
import {useCookies} from "react-cookie";
import CategoriesAPICall from "../../apiCalls/CategoriesAPICall";
import $ from "jquery";
import {useNavigate} from "react-router-dom";

const EditItem = (props)=>{

    const [itemForEdit, setItemForEdit] = useState(null);

    const [categories, setCategories] = useState([])

    const [itemImages, setItemImages] = useState([])

    const [formData, updateFormData] = useState({
        name:"",
        description:"",
    })

    const [cookies,setCookies] = useCookies(["selectedItemId"])

    const navigate = useNavigate();

    const [imagesCount, setImagesCount] = useState(0)

    const getItemForEdit = async () => {
        const itemId = cookies.selectedItemId;
        await ItemsAPICall.getItemById(itemId)
            .then((response) => {
                setItemForEdit(response.data.item)
                setItemImages(response.data.item.imagesUrl)
            })
    }

    const deleteItemImage = async (index) => {
        itemImages.splice(index, 1)
        console.log(itemImages)
        await ItemsAPICall.editItemImages(cookies.selectedItemId, itemImages)
            .then(() => {
                getItemForEdit()
            })
    }

    const getCategories = async () =>{
        await CategoriesAPICall.getAllCategories()
            .then((response)=>{
                setCategories(response.data.categories)
            })
    }

    const handleChange = (e)=>{
        updateFormData({
            ...formData,
            [e.target.name] : e.target.value.trim()
        })
    }

    const onEditItem = async () => {
        const name = formData.name !== "" ? formData.name : itemForEdit.name
        const description = formData.description !== "" ? formData.description : itemForEdit.description;
        let selectedCategory = $('select[name="category"] option:selected')

        const categories = [{
            '_id': selectedCategory.parent().attr('data-id'),
            'name': selectedCategory.parent().attr('label')
        },
            {
                '_id': selectedCategory.attr('data-id'),
                'name': selectedCategory.attr('value')
            }]

        let imagesUrl = []
        $('input[name="imageUrl"]').each(function () {
            imagesUrl.push(this.value)
        })
        imagesUrl = imagesUrl.concat(itemImages)
        await ItemsAPICall.editItem(cookies.selectedItemId, name, description, imagesUrl,categories)
        navigate('/itemsForUser')

    }

    useEffect(()=>{
        getItemForEdit();
        getCategories();
    },[])

    return(
        <div className={"lightBackground pt-5"}>
            <div className={"container pt-3 pb-5 text-center"}>
                <span className={"titles pb-5"}>Edit item</span>
                <div className={"d-flex justify-content-center"} >
                    <div className="shadow-lg p-3 mt-5 mb-5 bg-body-tertiary rounded text-start"
                         style={{width:'70%'}}>
                        {itemForEdit === null ? <></> :
                            <div className={"row gy-2 pt-3"}>
                                <div className="col-4 text-end fw-bold">
                                    <div className="p-2">Item name</div>
                                </div>
                                <div className="col-8">
                                    <input type="text" className="form-control" name={"name"}
                                           defaultValue={itemForEdit.name}
                                           onChange={handleChange}  />
                                </div>

                                <div className="col-4 text-end fw-bold">
                                    <div className="p-2">Item description</div>
                                </div>
                                <div className="col-8">
                                <textarea className="form-control" name={"description"}
                                          defaultValue={itemForEdit.description}
                                          onChange={handleChange} />
                                </div>

                                <div className={"col-4 text-end fw-bold"}>
                                    <div className={"p-2"}>Category</div>
                                </div>
                                <div className={"col-8"}>
                                    <select className={"form-select"} name={"category"}>

                                        {categories.map(mainCat=>{
                                            return(
                                                <optgroup data-id={mainCat._id} label={mainCat.name}>
                                                    {mainCat.subcategories.map(subCat=>{
                                                        return(
                                                            <option data-id={subCat._id} value={subCat.name}
                                                            defaultValue={itemForEdit.categories.map((each)=>each.name).includes(subCat.name)}>
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
                                    <div className={"row"}>
                                        {itemImages.map((image, index)=>{
                                            return(
                                                <div className={"col-3 pe-3"} >
                                                    <div className=" card mb-3 p-2 rounded">
                                                        <img src={image} className={"rounded"} alt="item"/>
                                                        <button className={"btn mt-2 mb-2 text-white"} style={{backgroundColor: '#BB0422'}}
                                                                type={"button"} onClick={()=>deleteItemImage(index)}>
                                                            <FontAwesomeIcon icon={faTrash} className={"pe-3"}/>Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {Array.apply(null, {length: imagesCount}).map((image)=>{
                                        return(
                                            <input type="text" className={"form-control mt-3"} name="imageUrl"/>
                                        )
                                    })}
                                </div>


                                <div className={"d-flex justify-content-center pt-4"}>
                                    <button className={"btn w-75 redButton text-white"} onClick={()=>onEditItem()} >
                                        Save changes
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditItem;