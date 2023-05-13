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

                  <Route path={"/categories"} element={<CategoriesList /> } />
                  <Route path={"/category/add"} element={<AddCategory />} />
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