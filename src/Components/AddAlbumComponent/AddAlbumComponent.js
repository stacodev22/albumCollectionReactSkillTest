import React, { useEffect, useRef } from "react";

// ~ Import react-redux hook
import { useDispatch, useSelector } from "react-redux";

// ~ import Selector State and Async Function
import {
  activeAlbumSelector,
  addNewAlbum,
  allAlbumsSelector,
  clearCurrentAlbum,
  updateAlbumById,
} from "../../Redux/AblumToolKit";

// # Main Component Function
const AddAlbumComponent = () => {
  // & Get AllAlbum Updated State
  const allAlbums = useSelector(allAlbumsSelector);
  // & Get Current Album Updated State
  const currentAlbum = useSelector(activeAlbumSelector);

  // & Dispatch Variable
  const dispatch = useDispatch();

  // & Input Variable
  let title = useRef();
  let userId = useRef();

  // % Extract unique userIds
  const uniqueUserIds = [...new Set(allAlbums.map((album) => album.userId))];

  // & Add CurrentProduct Data If EditProduct Function is Active
  useEffect(() => {
    if (currentAlbum) {
      title.current.value = currentAlbum?.title ?? "";
      userId.current.value = currentAlbum?.userId ?? "";
    }
  }, [currentAlbum]);

  // + Handle New Album Name
  const handleAddNewAlbum = (event) => {
    event.preventDefault();
    const newAlbumNameValue = title.current.value;
    const userIdValue = userId.current.value;
    // % if current Album then update value
    if (currentAlbum) {
      const updatedAlbum = {
        userId: Number(userIdValue),
        title: newAlbumNameValue,
        id: currentAlbum.id,
      };
      dispatch(updateAlbumById(updatedAlbum));
      dispatch(clearCurrentAlbum());
      title = "";
      userId = "";
    } else {
      // % if no current Album then add newAlbum
      const newAlbum = {
        title: newAlbumNameValue,
        id: allAlbums.length + 1,
        userId: Number(userIdValue),
      };

      dispatch(addNewAlbum(newAlbum));
    }
  };

  // # Render Function
  return (
    <form onSubmit={handleAddNewAlbum} className="py-3 px-5">
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label fs-3">
          Select User Id
        </label>
        <select
          className="form-select"
          aria-label="Default select example"
          ref={userId}
          defaultValue=""
        >
          <option disabled value="">
            Open this select menu
          </option>
          {uniqueUserIds.map((id) => (
            <option value={id} key={id}>
              {id}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label fs-3">
          New Album Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Album Name"
          ref={title}
        />
      </div>
      <button
        type="submit"
        className={currentAlbum ? "btn btn-warning" : "btn btn-primary"}
      >
        {currentAlbum ? "Update Album" : "Add New Album"}
      </button>
    </form>
  );
};

export default AddAlbumComponent;
