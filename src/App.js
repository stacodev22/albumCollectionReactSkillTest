// ~ Imports Statements
import React, { useEffect } from "react";

// ~ Styling
import "./App.css";

// ~ import all Components
import NavbarComponent from "./Components/NavbarComponent/NavbarComponent";
import AlbumListComponent from "./Components/AlbumListComponent/AlbumListComponent";

// ~ Import react-redux hook
import { useDispatch } from "react-redux";

// ~ import Selector State and Async Function
import { fetchAllAlbums } from "./Redux/AblumToolKit";

// # Main App Component Function
const App = () => {
  // & Dispatch Variable
  const dispatch = useDispatch();

  // % Mount or execute allAlbums when App Mount
  useEffect(() => {
    dispatch(fetchAllAlbums());
  }, [dispatch]);

  // # Render Function
  return (
    <div>
      <NavbarComponent />
      <AlbumListComponent />
    </div>
  );
};

export default App;
