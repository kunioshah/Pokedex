import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
function NewList() {
  const arrayChunk = (arr, n) => {
    const array = arr.slice();
    const chunks = [];
    while (array.length) chunks.push(array.splice(0, n));
    return chunks;
  };
  const limit = 50;
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(limit);
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${limit}`)
      .then((res) => setItems(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  const fetchData = async (__page) => {
    console.log(__page);
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=${limit}`
    );
    setItems([...items, ...response.data.results]);
    setPage(page + limit);
  };

  return (
    <InfiniteScroll
      style={{ margin: "10px" }}
      dataLength={items.length}
      pageStart={0}
      next={fetchData}
      hasMore={true}
      loader={
        <div className="loader" key={0}>
          Loading ...
        </div>
      }
    >
      {arrayChunk(items, 3).map((row, rowIndex) => {
        var top = rowIndex * 100;
        return (
          <>
            {row.map((col, colIndex) => {
              var spriteNumberWithSlash = col.url.slice(34);
              var spriteNumber = spriteNumberWithSlash.replace(/.$/, "");
              var width = colIndex * 440;
              return (
                <>
                  <div
                    class="col-lg-4 col-md-6 artwork-item isotope-item filter-app"
                    style={{
                      position: "absolute",
                      left: width + "px",
                      top: top + "px",
                    }}
                  >
                    <div class="artwork-content h-100">
                      <Link to={"/pokemon/" + spriteNumber}>
                        <Button>
                          <img
                            src={
                              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                              spriteNumber +
                              ".png"
                            }
                          ></img>
                          {col.name}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </>
              );
            })}
          </>
        );
      })}
    </InfiniteScroll>
  );
}

export default NewList;
