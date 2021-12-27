import React, { useState } from 'react';
import '../index.css';
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

function MyPokemon() { 
  let navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [usernamePoke, setUsernamePoke] = useState();
  const [nickToDel, setNickToDel] = useState();

  const handleSave = () => {
    var detail_poke = JSON.parse(localStorage.getItem(usernamePoke));
    var img = detail_poke.img;
    var allNickname = detail_poke.nick;
    var updatePokemon = null;

    if (allNickname.includes("|" + nickToDel)) { //nick in last or middle
      updatePokemon = { 
        "img": img,
        "nick": allNickname.replace("|" + nickToDel, '')
      };
      localStorage.setItem(usernamePoke, JSON.stringify(updatePokemon));
    } else if(allNickname.includes(nickToDel + "|")) { //nick in first or middle
      updatePokemon = { 
        "img": img,
        "nick": allNickname.replace(nickToDel + "|", '')
      };
      localStorage.setItem(usernamePoke, JSON.stringify(updatePokemon));
    } else {
      localStorage.removeItem(usernamePoke); //nick alone
    }
    handleClose();
  };
  
  const getMyPokemons = () => {
    let content = [];
    let nomor = 1;
    for (let i = 0; i < localStorage.length; i++) {
      const detail_poke = JSON.parse(localStorage.getItem(localStorage.key(i)));
      const nickpokemon = detail_poke.nick.split('|');
      const username_poke = localStorage.key(i);
      
      for (let j = 0; j < nickpokemon.length; j++) {
        content.push(
        <div key={username_poke + nickpokemon[j] + nomor} className="cardpoke col col-md-2 col-sm-6 col-xs-12 hide">
          <div className={nomor % 2 === 0 ? "card card-odd" : "card card-even"} onClick={() => {navigate("/detail/"+ username_poke)}}  style={{"borderRadius": "5%"}}>
            <button type="button" className="btn-close float-right" aria-label="Close" title="Release your pokemon?" onClick={(e) => {
              e.stopPropagation();
              setUsernamePoke(username_poke);
              setNickToDel(nickpokemon[j]);
              handleShow();
            }} style={{"right": "10px","position":"absolute", "zIndex":"1"}}></button>
            <img src={detail_poke.img} className="view overlay zoom card-img-top" alt={username_poke} title={username_poke}/>
            <div className="card-body">
              <h5 className="card-title text-center">{nomor++}. {username_poke}</h5>
              <p className="card-text text-center">nick: {nickpokemon[j]}</p>
            </div>
          </div>
        </div>
        )
      }
    }
    return content;
  };
  return (
    <>
      <div className="row justify-content-md-center">
        <div className="row col col-lg-10">
          <h2 className="text-center">My Pokemons</h2>
          {localStorage.length === 0 ? 
          <div className="alert alert-primary d-flex align-items-center rounded-pill" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
            </svg>
            <div>
              You dont have any pokemons right now.
            </div>
          </div>
          : getMyPokemons() }
        </div>
      </div>

      <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog-centered">
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Are you sure to release the pokemon ({nickToDel})?</label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
            <Button variant="primary" onClick={handleSave}>
              Realese
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyPokemon;