import React from "react";

// ~ Import react-redux hook
import { useDispatch } from "react-redux";

// ~ import Selector State and Async Function
import { showNewAlbumForm } from "../../Redux/AblumToolKit";

// # Main Component Function
const NavbarComponent = () => {
  // & Dispatch Variable
  const dispatch = useDispatch();

  // + Add New Album
  const handleAddNewAlbumForm = () => {
    dispatch(showNewAlbumForm());
  };

  // # Render Function
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning px-5">
      <a className="navbar-brand p-1" href="/">
        Stacodev
      </a>

      <div className="navbar-nav mr-5" onClick={handleAddNewAlbumForm}>
        <button type="button" className="btn btn-danger ">
          Add New Album
        </button>
      </div>
    </nav>
  );
};

export default NavbarComponent;
