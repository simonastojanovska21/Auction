import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "../Header/header";
import Home from "../Home/home";
import Footer from "../Footer/footer";
import Login from "../Authentication/login";
import Register from "../Authentication/register";
import AccountInfo from "../Profile/accountInfo";
import AddCategory from "../Category/addCategory";
import UsersAPICall from "../../apiCalls/UsersAPICall";
import CategoriesList from "../Category/categoriesList";
import Test from "./Test";
import AddNewItem from "../Item/addNewItem";
import ItemsForUser from "../Item/itemsForUser";
import EditItem from "../Item/editItem";
import SetItemForAuction from "../Auction/setItemForAuction";

class App extends Component{
  constructor(props) {
    super(props);
    this.state={
        userRoles:['Admin','Buyer','Seller'],
        userRoleOptions:[{value:"Admin", label:"Admin"},
                         {value:"Buyer", label:"Buyer"},
                         {value:"Seller", label:"Seller"}],
        userDetails:{}
    }
  }

  render(){
    return(
        <Router>
          <Header />
          <main>
            <div>
              <Routes>
                  <Route path={"/"} element={<Home />} />
                  <Route path={"/login"} element={<Login />} />
                  <Route path={"/register"} element={<Register />} />
                  <Route path={"/accountInfo"} element={<AccountInfo userRoleOptions={this.state.userRoleOptions} />} />

                  <Route path={"/category/add"} element={<AddCategory />} />
                  <Route path={"/categories"} element={<CategoriesList /> } />

                  <Route path={"/item/edit/:itemId"} element={<EditItem /> } />
                  <Route path={"/item/add"} element={<AddNewItem /> } />
                  <Route path={"/itemsForUser"} element={<ItemsForUser /> } />

                  <Route path={"/auction/setItemForAuction"} element={ <SetItemForAuction  /> } />
              </Routes>
            </div>
          </main>
          <Footer/>
        </Router>
    )
  }

  componentDidMount() {

  }

  getAccountInfo=async (username) => {
      await UsersAPICall.getUserDetails(username)
          .then((response) => {
              this.setState({
                  userDetails: response.data.userDetails
              })
          })

  }
}

export default App;