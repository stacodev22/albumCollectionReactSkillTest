import React from "react";

// ~ Import Styling
import styles from "./AlbumListStyle.module.css";

// ~ Import Toaster Style
import "react-toastify/dist/ReactToastify.css";

// ~ Import react-redux hook
import { useDispatch, useSelector } from "react-redux";

// ~ import Selector State and Async Function
import {
  allAlbumsSelector,
  deleteAlbumById,
  getAlbumById,
  isLoadingSelector,
  newAlbumformSelector,
} from "../../Redux/AblumToolKit";

// ~ Add Album Form Component
import AddAlbumComponent from "../AddAlbumComponent/AddAlbumComponent";

// ~ IMport ToasterContainer Component
import { ToastContainer } from "react-toastify";
import { BallTriangle } from "react-loader-spinner";

// # Main Component Function
const AlbumListComponent = () => {
  // & Dispatch
  const dispatch = useDispatch();
  // & Form Boolean value Selector
  const newAlbumform = useSelector(newAlbumformSelector);

  // & Get value for allAlbums
  const allAlbums = useSelector(allAlbumsSelector);

  // & isLoading value for allAlbums
  const isLoading = useSelector(isLoadingSelector);

  // % If Loading then render
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center py-3">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  // * Handle Edit Album
  const handleEditAlbum = (albumId) => {
    const getAlbum = allAlbums.filter((album) => album.id === albumId);
    dispatch(getAlbumById(getAlbum[0]));
  };

  // -Handle Delete Album
  const handleDeleteAlbum = (albumId) => {
    dispatch(deleteAlbumById(albumId));
  };

  // # Render Function
  return (
    <div className="p-5">
      <ToastContainer />
      {newAlbumform && <AddAlbumComponent />}

      {allAlbums && allAlbums.length > 0 ? (
        <>
          <h2 className="text-center mb-3 bg-warning">All Albums</h2>
          <div className="row">
            {allAlbums.map((album, index) => (
              <div
                className="col-sm-3 mb-3 mb-sm-0 "
                key={`${album.id}-${index}`}
              >
                <div
                  className={`card border border-warning mb-3 ${styles.cardSize}`}
                >
                  <div className="card-body d-flex flex-column">
                    <h4 className="card-text">
                      UserId :{" "}
                      <span className="fs-3 fw-bolder text-danger">
                        {album.userId}
                      </span>
                    </h4>
                    <h3 className="card-text w-100">
                      <span className="fs-5 text-black ">{album.title}</span>
                    </h3>
                    <div className="mt-auto d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn-warning me-3"
                        onClick={() => handleEditAlbum(album.id)}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger "
                        onClick={() => handleDeleteAlbum(album.id)}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h2>Np Albums</h2>
      )}
    </div>
  );
};

export default AlbumListComponent;
