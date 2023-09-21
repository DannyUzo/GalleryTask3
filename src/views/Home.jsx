import React, { useEffect, useCallback } from "react";
import Skeleton from "../components/Skeleton";

import { Zoom } from "react-awesome-reveal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import useAxios from "../hooks/useAxios";

// import { useAuthState } from 'firebase/auth'
import { auth } from "../Firebase-config";
import Login from "../views/Login";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleInput = (e) => {
    setSearchValue(e.target.value);
  };

  const IMAGES_PER_PAGE = 24;

  const handleSearch = useCallback(() => {
    fetchData(
      `search/photos?page=1&per_page=${IMAGES_PER_PAGE}&query=${searchValue}&client_id=${process.env.REACT_APP_ACCESS_KEY}`
    );
  }, [searchValue]);

  const handleEnterSearch = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // useEffect(() => {
  //   handleSearch();
  // }, []);

  const { response, isLoading, error, fetchData, setResponse, setError } =
    useAxios(
      `search/photos?page=1&query=office&client_id=${process.env.REACT_APP_ACCESS_KEY}`
    );

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.drappableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedImages = [...response];

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedImages] = reorderedImages.splice(sourceIndex, 1);
      reorderedImages.splice(destinationIndex, 0, removedImages);

      return setResponse(reorderedImages);
    }
  };

  const [user, setUser] = useState({});

  // useAuthState(auth, (currentUser) => {
  //     setUser(currentUser);
  // })

  useEffect(() => {
    const Sub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return Sub;
  });



  return (
    <div>
      <nav className="navbar">
        <div className="logo">Logo</div>
        <div className="search">
          <input
            type="search"
            placeholder="Search image by tagname"
            onChange={handleInput}
            value={searchValue}
            onKeyDown={handleEnterSearch}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {user ? (
          <>      
            <button id='logOutBtn' onClick={()=> auth.signOut(auth)}>Log out</button>
          </>
        ) : (
          <div className="auth">
            <NavLink to="signup">
              <div className="signUp">Sign Up</div>
            </NavLink>
            <NavLink to="login">
              <div className="logIn">Log In</div>
            </NavLink>
          </div>
        )}
      </nav>
      <h2>{error}</h2>

      {user ? (
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
                            <Zoom>
                              <div className="image-item">
                                <img
                                  src={data.urls.small}
                                  alt={data.alt_description}
                                />
                                <div class="image-description">
                                  {data.alt_description}
                                </div>
                              </div>
                            </Zoom>
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                </div>
                {/* {provided.placeholder} */}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div className="main">
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
      )}
    </div>
  );
};

export default Home;
