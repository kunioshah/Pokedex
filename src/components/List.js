import axios from "axios";
import React from "react";
import { Button } from "@mui/material";
import PokeDetails from "./PokeDetails";
import { Link } from "react-router-dom";

const baseURL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=905";

function List() {
  function SwitchPages() {
    return <PokeDetails />;
  }
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data.results);
    });
  }, []);

  if (!post) return null;

  return (
    <div>
      {post.map((item) => {
        var spriteNumberWithSlash = item.url.slice(34);
        var spriteNumber = spriteNumberWithSlash.replace(/.$/, "");
        console.log(spriteNumber);
        return (
          <Link to={"/pokemon/" + spriteNumber}>
            <Button>
              <img
                src={
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                  spriteNumber +
                  ".png"
                }
              ></img>
              {item.name}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}

export default List;
