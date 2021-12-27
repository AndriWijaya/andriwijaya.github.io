import React from 'react';
import {
  useQuery,
  gql
} from "@apollo/client";
import { useNavigate } from "react-router-dom";
import '../index.css';

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        id
        url
        name
        image
      }
    }
  }
`;

const gqlVariables2 = {
  limit: 1118,
  offset: 0,
};

function countMyPokemon(){
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    total += JSON.parse(localStorage.getItem(localStorage.key(i))).nick.split("|").length;
  }
  return total;
}

function AllPokemon() { 
  let navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: gqlVariables2,
  });
  
  if (loading) return <div className="position-absolute top-50 start-50 spinner-border text-dark" role="status"><span className="visually-hidden">Loading...</span></div>;
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <div className="row justify-content-md-center">
        <div className="row col col-lg-10">
          <h2>List of All Pokemon</h2>
          <h4 className="text-decoration-none font-weight-normal">My Pokemon Total: {countMyPokemon()} pokemons (in {localStorage.length} species)</h4>
          {data.pokemons.results.map(({ image, name, id }, index) => (
            <div key={image} className='cardpoke col col-md-2 col-sm-6 col-xs-12'>
              <div className={index%2 === 0 ? "card card-odd" : "card card-even"} onClick={() => {navigate("/detail/"+ name)}} style={{"borderRadius": "10%"}}>
                <img src={image} className="view overlay zoom card-img-top" alt={name} title={name}/>
                <div className="card-body">
                  <h5 className="card-title text-center">{++index}. {name}</h5>
                  <p className="card-text text-center">Owned Total: {(JSON.parse(localStorage.getItem(name)) == null? '0' :  <strong>{(JSON.parse(localStorage.getItem(name)).nick.split("|").length)}</strong>)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllPokemon;