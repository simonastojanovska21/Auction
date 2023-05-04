import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "../Header/header";
import Home from "../Home/home";
import Footer from "../Footer/footer";
import Login from "../Authentication/login";
import Register from "../Authentication/register";
import AccountInfo from "../Profile/accountInfo";
import AddCategory from "../Category/addCategory";

class App extends Component{
  constructor(props) {
    super(props);
    this.state={
        userRoles:['Admin','Buyer','Seller']
    }
  }

  render(){
    return(
        <Router>
          <Header />
          <main>
            <div>
              <Routes>
                  <Route path={"/"} element={<Home/>} />
                  <Route path={"/login"} element={<Login />} />
                  <Route path={"/register"} element={<Register />} />
                  <Route path={"/accountInfo"} element={<AccountInfo />} />
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

}

export default App;