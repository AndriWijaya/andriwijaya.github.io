import React from 'react';
import ModalCatch from './ModalCatch';
import '../index.css';
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      base_experience
      abilities {
        ability {
          name
        }
      }
      sprites {
        front_shiny
        back_shiny
        front_default
        back_default
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
      stats {
        base_stat
        stat {
          name
        }
      }
      height
      weight
    }
  }
`;

function Detail() { 
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: useParams(),
  });

  if (loading) return <div className="position-absolute top-50 start-50 spinner-border text-dark " role="status"><span className="visually-hidden">Loading...</span></div>;
  if (error) return `Error! ${error.message}`;

  return (
    <div className="container detail-page">
      <div className="row justify-content-md-center">
        <div className="col col-lg-8">
          <div id="carouselPokemon" className="carousel carousel-dark slide col-md-4 offset-md-4" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselPokemon" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselPokemon" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselPokemon" data-bs-slide-to="2" aria-label="Slide 3"></button>
              <button type="button" data-bs-target="#carouselPokemon" data-bs-slide-to="3" aria-label="Slide 4"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="2000">
                <img src={data.pokemon.sprites.front_shiny} className="d-block w-100 img-front" alt="front_shiny"/>
                <div className="carousel-caption d-none d-md-block">
                  <p>front shiny of {data.pokemon.name}</p>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img src={data.pokemon.sprites.back_shiny} className="d-block w-100 img-front" alt="back_shiny"/>
                <div className="carousel-caption d-none d-md-block">
                  <p>back shiny of {data.pokemon.name}</p>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img src={data.pokemon.sprites.front_default} className="d-block w-100 img-front" alt="front_default"/>
                <div className="carousel-caption d-none d-md-block">
                  <p>front default of {data.pokemon.name}</p>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <img src={data.pokemon.sprites.back_default} className="d-block w-100 img-front" alt="back_default"/>
                <div className="carousel-caption d-none d-md-block">
                  <p>back default of {data.pokemon.name}</p>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselPokemon" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselPokemon" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          <h3 className="text-center"><strong><u>{ data.pokemon.name.toUpperCase() }</u></strong></h3>
          
          <div className="row">
            <div className="col col-lg-4 col-md-12 col-sm-12">
              <div className="card border-dark mb-3">
                <div className="card-header">Pokemon's Information</div>
                <div className="card-body text-dark">
                  <h5>Height: <span className="fw-normal">{ parseFloat(data.pokemon.height / 10) } Meter</span></h5>
                  <h5>Weight: <span className="fw-normal">{ parseFloat(data.pokemon.weight / 10) } Kilogram</span></h5>
                  <h5 className="mb-4">Experience: <span className="fw-normal">{ data.pokemon.base_experience }</span></h5>

                  <fieldset>
                    <legend>Statistics:</legend>
                  {/* <h5>Statistics</h5> */}
                  {data.pokemon.stats.map(dt => ( 
                    <div key={dt.stat.name} className="mb-3">
                      <h5 className="fw-light">{dt.stat.name}</h5>
                      <div className="progress-bar" style={{"width" : dt.base_stat + "%", "height": "15px"}} role="progressbar" aria-valuenow={dt.base_stat} aria-valuemin="0" aria-valuemax="10">{dt.base_stat}</div>
                    </div>
                  ))}
                  </fieldset>
                </div>
              </div>
            </div>

            <div className="col col-lg-4 col-md-12 col-sm-12">
              <div className="card border-dark mb-3">
                <div className="card-header">Skills</div>
                <div className="card-body text-dark">
                  <h5>Abilities:</h5>
                  {data.pokemon.abilities.map(dt => (
                    <span key={dt.ability.name} className="badge rounded-pill bg-success text-white">{dt.ability.name}</span>
                  ))}

                  <h5>Types:</h5>
                  {data.pokemon.types.map(dt => (
                    <span key={dt.type.name} className="badge rounded-pill bg-warning text-white">{dt.type.name}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="col col-lg-4 col-md-12 col-sm-12">
              <div className="card border-dark mb-3">
                <div className="card-header">Moves</div>
                <div className="card-body text-dark">
                  {data.pokemon.moves.map(dt => (
                    <span key={dt.move.name} className="badge rounded-pill bg-primary text-white">{dt.move.name}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <ModalCatch detail_poke={data.pokemon}/>
        </div>
      </div>
    </div>
  );
};

export default Detail;
