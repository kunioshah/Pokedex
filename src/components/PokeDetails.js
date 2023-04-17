import axios from "axios";
import React from "react";
import { Button, LinearProgress } from "@mui/material";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const baseURL = "https://pokeapi.co/api/v2/pokemon/";
const speciesURl = "https://pokeapi.co/api/v2/pokemon-species/"

function PokeDetails() {

    const { id } = useParams()

    const [post, setPost] = React.useState(null);

    React.useEffect(() => {
      axios.get(baseURL + id).then((response) => {
        setPost(response.data);
      });
    }, []);

    const [speciesPost, setSpeciesPost] = React.useState(null);

    React.useEffect(() => {
      axios.get(speciesURl + id).then((response) => {
        setSpeciesPost(response.data);
      });
    }, []);
  
    if (!post) return null;
    if (!speciesPost) return null;
  
    return (
      <div>
        <Link to={"/"}>
            <Button> 
              Go BACK &nbsp;
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/escape-rope.png" width="40" 
     height="40" ></img>
            </Button>
          </Link>
        <center>
         <h1> {post.name.charAt(0).toUpperCase() + post.name.slice(1)}  </h1>
         {speciesPost.genera.map((item) => {
            if (item.language.name == "en") {
                return <h2> {item.genus} </h2> 
            }
         })}
         <img src= {post.sprites.other.home.front_default} ></img>
         {post.types.map((item) => (
            <h1> {item.type.name.charAt(0).toUpperCase() + item.type.name.slice(1)}  </h1>
         ))}
          {post.stats.map((item) => (
            <div> {item.stat.name} : {item.base_stat}
            <LinearProgress 
                variant="determinate"
                value={item.base_stat}  
                sx={{
                  width: 400,
                 height: 10, 
                 mr: 2,
                 background: '#eeeeee'
                }} 
           /> 
           </div>  
         ))}
        </center> 
      </div>
    );
}

export default PokeDetails