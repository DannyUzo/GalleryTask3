import { useCallback, useEffect } from "react";
import Skeleton from "../components/Skeleton";

import { TypeAnimation } from "react-type-animation";
import { MdOutlineFileDownload } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { useScrollTop } from "../hooks/use-scroll-top";
import { Zoom } from "react-awesome-reveal";
import { useState } from "react";
import useAxios from "../hooks/useAxios";

import { Logo } from "../components/logo";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [responseData, setResponseData] = useState([]);
  const scrolled = useScrollTop();
  const handleInput = (e) => {
    setSearchValue(e.target.value);
  };

  const IMAGES_PER_PAGE = 36;

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

  const { response, isLoading, fetchData } = useAxios(
    `search/photos?page=1&query=random&client_id=${process.env.REACT_APP_ACCESS_KEY}`
  );
  useEffect(() => {
    if (response) {
      setResponseData(response);
    }
  }, [response]);
  const onDragEnd = (result) => {
    const { source, destination } = result;
    console.log(result);

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const reorderedElements = [...responseData];
    const [movedElement] = reorderedElements.splice(source.index, 1);
    reorderedElements.splice(destination.index, 0, movedElement);
    setResponseData(reorderedElements);
  };

  return (
    <div>
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
                    1000,
                    "Unfiltered",
                    1000,
                    "Cool",
                    1000,
                    "Natural",
                    1000,
                    "Quality",
                    1000,
                    "Inspiring",
                    1000,
                    "Creative",
                    1000,
                    "Expressive",
                    1000,
                    "Diverse",
                    1000,
                    "Captivating",
                    1000,
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
          <div></div>
        </section>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="images">
            {isLoading ? (
              <Skeleton item={10} />
            ) : (
              <Droppable droppableId="reorder">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`images ${snapshot.isDraggingOver && "over"}`}
                  >
                    {responseData.map((data, index) => (
                      <Draggable
                        className="card"
                        key={data.id}
                        draggableId={data.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Zoom triggerOnce>
                              <div className={`image-item`}>
                                <img
                                  src={data.urls.regular}
                                  alt={data.alt_description}
                                  className={`${
                                    snapshot.isDragging && "onDrag"
                                  }`}
                                />
                                <div className="image-description">
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
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Home;
