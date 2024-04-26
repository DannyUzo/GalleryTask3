// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { RiErrorWarningLine } from "react-icons/ri";
// import { auth } from "../Firebase-config";
// import { onAuthStateChanged, signOut } from "firebase/auth";


import { useCallback, useEffect } from "react";
import Skeleton from "../components/Skeleton";

import { TypeAnimation } from "react-type-animation";
import { MdOutlineFileDownload } from "react-icons/md";

import { useScrollTop } from "../hooks/use-scroll-top";
import { Zoom } from "react-awesome-reveal";
import { useState } from "react";
import useAxios from "../hooks/useAxios";

import { Logo } from "../components/logo";
import { Footer } from "../components/footer";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [noResponse, setNoResponse] = useState(false);

  const scrolled = useScrollTop();
  const handleInput = (e) => {
    setSearchValue(e.target.value);
  };

  const IMAGES_PER_PAGE = 36;

  const handleSearch = useCallback(() => {
    if (searchValue.trim() === "") {
      alert("Please enter a search term");
      return;
    }
  
    fetchData(
      `search/photos?page=1&per_page=${IMAGES_PER_PAGE}&query=${searchValue}&client_id=${process.env.REACT_APP_ACCESS_KEY}`
    );
  }, [searchValue]);
  

  const handleEnterSearch = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const { response, isLoading, error, fetchData } =
    useAxios(
      `search/photos?page=1&query=random&client_id=${process.env.REACT_APP_ACCESS_KEY}`
    );

    useEffect(() => {
      if (response.length === 0) {
        setNoResponse(true);
      } else {
        setNoResponse(false);
      }
    }, [response]);
  


    return (
    <>
      {scrolled && (
        <nav className="navbar">
          <Logo />
          <div className="search">
            <input
              type="search"
              placeholder="Search image by tagname"
              onChange={handleInput}
              value={searchValue}
              onKeyDown={handleEnterSearch}
              required
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </nav>
      )}

      <div className="main">
        <section>
          <div>
            <h1>
              Download{" "}
              <span>
                <TypeAnimation
                  sequence={[
                    "Free",
                    2000,
                    "Unfiltered",
                    2000,
                    "Cool",
                    2000,
                    "Natural",
                    2000,
                    "Quality",
                    2000,
                    "Inspiring",
                    2000,
                    "Creative",
                    2000,
                    "Expressive",
                    2000,
                    "Diverse",
                    2000,
                    "Captivating",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  style={{ fontSize: "1em", display: "inline-block" }}
                  repeat={Infinity}
                />
              </span>{" "}
              Images
            </h1>
          </div>
          <div className="search1">
            <input
              type="search"
              placeholder="Search image by tagname"
              onChange={handleInput}
              value={searchValue}
              onKeyDown={handleEnterSearch}
              required
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="intro_text">
            <p>
              With over 5000 images across different catagories at your finger
              tips. Search, download and share high quality images suitable for
              whatever you want.🚀🙌📷{" "}
            </p>
          </div>
        </section>
        {noResponse && (
          <div className="notfound">
            <h3>
              Oops! No results for <span>{searchValue}</span>. Try refining your search term ✌️.
            </h3>
          </div>
        )}
        {/* <h5>{error}</h5> */}
        <div className="images">
          {isLoading ? (
            <Skeleton item={10} />
          ) : (
            response.map((data) => (
              <div className="card" key={data.id}>
                <Zoom triggerOnce>
                  <div className="image-item">
                    <img src={data.urls.regular} alt={data.alt_description} />
                    <div class="image-description">
                      <a
                        download
                        title="Download"
                        className="download_btn"
                        href={data.urls.small}
                      >
                        <MdOutlineFileDownload />
                      </a>
                    </div>
                  </div>
                </Zoom>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Home;


{
  /* {user ? (
        <DragDropContext onDragEnd={handleDragDrop}>
          <Droppable droppableId="ROOT" type="group" className="images">
            {(provided) => (
              <div className="main" ref={provided.innerRef}>
                <div className="images">
                  {isLoading ? (
                    <Skeleton item={10} />
                  ) : (
                    response.map((data, index) => (
                      <Draggable
                        draggableId={data.id}
                        key={data.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="card"
                            key={data.id}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            
                              <div className="image-item">
                                <img
                                  src={data.urls.small}
                                  alt={data.alt_description}
                                />
                                <div class="image-description">
                                  {data.alt_description}
                                </div>
                              </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div className="main">
          <div className="DNDmessage">
            <RiErrorWarningLine/>
            Please login to use drag and drop feature 
          </div>
          <div className="images">
            {isLoading ? (
              <Skeleton item={10} />
            ) : (
              response.map((data, index) => (
                <div className="card" key={data.id}>
                  <Zoom triggerOnce>
                    <div className="image-item">
                      <img src={data.urls.small} alt={data.alt_description} />
                      <div class="image-description">
                        {data.alt_description}
                      </div>
                    </div>
                  </Zoom>
                </div>
              ))
            )}
          </div>
        </div>
      )} */
}
{
   // const handleDragDrop = (results) => {
  //   const { source, destination, type } = results;

  //   if (!destination) return;

  //   if (
  //     source.drappableId === destination.droppableId &&
  //     source.index === destination.index
  //   )
  //     return;

  //   if (type === "group") {
  //     const reorderedImages = [...response];

  //     const sourceIndex = source.index;
  //     const destinationIndex = destination.index;

  //     const [removedImages] = reorderedImages.splice(sourceIndex, 1);
  //     reorderedImages.splice(destinationIndex, 0, removedImages);

  //     return setResponse(reorderedImages);
  //   }
  // };
  // console.log(response);
  // const [user, setUser] = useState({});

  // useEffect(() => {
  //   const Sub = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUser(user);
  //     } else {
  //       setUser(null);
  //     }
  //   });
  //   return Sub;
  // });

}