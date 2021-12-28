import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as conn from './connection.js'; 
import { ApolloProvider } from "@apollo/client";
import { Route, NavLink, Routes, BrowserRouter } from "react-router-dom";
import AllPokemon from './page/AllPokemon';
import Detail from './page/Detail';
import MyPokemon from './page/MyPokemon';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink exact="true" to="/" className="navbar-brand">Wild Nature</NavLink>
          <NavLink className="navbar-brand" to="/my-pokemon">My Pokemon</NavLink>
        </div>
      </nav>
      
      <Routes>
        <Route path="/" element={ <AllPokemon/> }/>
        <Route path="my-pokemon" element={ <MyPokemon/> }/>
        <Route path="detail/:name" element={ <Detail/> }/>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <ApolloProvider client={conn.client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);