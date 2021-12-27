import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function ModalCatch(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title , setTitle] = useState("");
  const [info , setInfo] = useState("");
  const [isSuccess , setIsSuccess] = useState(false);

  var newNamePokemon = "";
  const handleChange = event => {
    newNamePokemon = event.target.value.trim().replace(/\|/g, "");
  }

  const handleSave = event => {
    var valueBefore = (localStorage.getItem(props.detail_poke.name) == null ? "" : JSON.parse(localStorage.getItem(props.detail_poke.name)).nick);
    var isExistsName = false;
    if(valueBefore !== ""){
      var arrValueBefore = valueBefore.split('|');
      for(let i = 0; i < arrValueBefore.length; i++){
        if(arrValueBefore[i] === newNamePokemon){
          isExistsName = true;
        }
      }
    }
    
    if(newNamePokemon === ""){
      setTitle("Information");
      setInfo("Save failed. Nickname cannot be empty!");
      setIsSuccess(false);
    } else if (isExistsName) {
      setTitle("Information");
      setInfo("Save failed. Nickname already exists for this pokemon");
      setIsSuccess(false);
    } else {
      var caughtPokemon = { 
        "img": props.detail_poke.sprites.front_default, 
        "nick": (valueBefore + (valueBefore === "" ? '' : '|') + newNamePokemon) 
      };
      localStorage.setItem(props.detail_poke.name, JSON.stringify(caughtPokemon));
      setTitle("Information");
      setInfo("Save Successfully");
      setIsSuccess(false);
    }
  };  
  
  const handleCatch = event => {
    let chance = Math.random()*100;
    if ( chance <= 50 ){
      setTitle("Information");
      setInfo("Unfortunately, You fail to catch the pokemon");
      setIsSuccess(false);
    } else{
      setTitle("Congrats... You got this pokemon");
      setInfo("Give it a name:");
      setIsSuccess(true);
    }
    handleShow();
  };

  return (
    <>
      <button type="button" className="btn rounded-pill btn-info col-md-2 col-centered btn-catch" onClick={handleCatch}>
        <img src="../pokemon.ico" style={{"width": "40px", "height": "40px"}} alt="logo"/>
        <strong>Catch</strong>
      </button>

      <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog-centered">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>{info}</label>
          {(isSuccess ? <input type="text" className="form-control" onChange={handleChange} required/> : null)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {(isSuccess ? 
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
           : null)}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCatch;