import React from 'react';
import {BrowserRouter, Route, Link } from 'react-router-dom';
import CartScreen from './Screens/CartScreen';
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";

//feature 2


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      products: "",
      size: "",
      sort: "",
    }
  }
  render(){
    const openMenu = () => {
      document.querySelector(".sidebar").classList.add("open");
    }

    const closeMenu = () => {
      document.querySelector(".sidebar").classList.remove("open");
    }

    return (
      <BrowserRouter>
        <div className="grid-container">
          <header className = "header">
            <div className="brand">
              <button onClick={openMenu}> &#9776; </button>
            
              <Link to="/">Amazona</Link>
            </div>
            <div className="header-links">

            </div>
            
            
          </header>
          <aside className="sidebar">
              <h3>Shopping List</h3>
              <ul>
                <li>
                  Pants
                </li>
                <li>
                  Shirts
                </li>
              </ul>
              <button className="sidebar-close-button" onClick={closeMenu}>x</button>
            </aside>

          <main className = "main">
              <div className="content"> 
                <Route path="/products/:id" component={ProductScreen}></Route>
                <Route path="/" exact={true} component={HomeScreen}></Route>
                <Route path ="/cart/:id?" component={CartScreen}></Route>
                
              </div>
          </main>
          <footer className ="footer">All Rights Reserved</footer>
        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;
