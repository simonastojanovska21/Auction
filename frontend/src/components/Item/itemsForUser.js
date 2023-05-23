import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faGavel, faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import ItemsAPICall from "../../apiCalls/ItemsAPICall.js";
import {useCookies} from "react-cookie";

const ItemsForUser=(props)=>{

    const [itemsForUser, setItemsForUser] = useState([])

    const [,setCookies] = useCookies(["selectedItemId"])

    const getItemsForUser=async () => {
        const username = localStorage.getItem("username");
        try {
            await ItemsAPICall.getAllItemsForUser(username).then((response) => {
                setItemsForUser(response.data.itemsForUser)
            })
        } catch (e) {
            console.log(e)
        }
    }

    const formatCategories=(itemCategories)=>{
        let categories=""
        itemCategories.forEach(each=>{
            categories+=each.name;
            categories+=", "
        })
        return categories.slice(0,categories.length-2)
    }

    const deleteItemForUser = async (itemId) => {
        await ItemsAPICall.deleteItemForUser(itemId);
        getItemsForUser();
    }

    const setSelectedItemId = (itemId) => {
        setCookies("selectedItemId",itemId)
    }

    useEffect(()=>{
        getItemsForUser()
    },[])
    return(
        <div className={"lightBackground pt-5"}>
            <div className={"container pb-5 text-center"}>
                <span className={"titles pb-5"}>My items</span>
                <div className={"d-flex justify-content-center pt-3"}>
                    <Link className={"btn blueButton text-white w-50"} to={"/item/add"}>
                        <FontAwesomeIcon icon={faPlus} /> Add new item
                    </Link>
                </div>

                <div className={"pt-5"}>
                    <table className={"table"}>
                        <thead>
                        <tr>
                            <th>Image</th>
                            <th>Item name</th>
                            <th>Item categories</th>
                            <th>Manage item</th>
                        </tr>
                        </thead>
                        <tbody>
                        {itemsForUser.map((item)=>{
                            return(
                                <tr>
                                    <td>
                                        <img src={item.imagesUrl[0]} className={"itemsTableImage"} alt={"item"}/>
                                    </td>
                                    <td className={"align-middle"}>{item.name}</td>
                                    <td className={"align-middle"}>{formatCategories(item.categories)}</td>
                                    <td>
                                        <div className={"d-grid gap-2"}>
                                            <Link className={"btn redButton text-white"}>
                                                <FontAwesomeIcon icon={faGavel} /> Set item for auction
                                            </Link>
                                            <Link className={"btn blueButton text-white"}
                                                  onClick={()=>setSelectedItemId(item._id)}
                                                  to={`/item/edit/${item._id}`}  >
                                                <FontAwesomeIcon icon={faPenToSquare} />Edit item details
                                            </Link>
                                            <button className={"btn btn-dark"} onClick={()=>deleteItemForUser(item._id)} >
                                                <FontAwesomeIcon icon={faTrash} />Delete item
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ItemsForUser;