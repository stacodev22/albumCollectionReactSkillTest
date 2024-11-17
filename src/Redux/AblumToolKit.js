import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ~ import toast for message
import { toast } from "react-toastify";

// & Declare InitialState
const INITIAL_STATE = {
  allAlbums: [],
  activeAlbum: null,
  newAlbumForm: false,
  errorMessage: null,
  isLoading: false,
};

// / Fetch All Albums From API
export const fetchAllAlbums = createAsyncThunk("fetchAllAlbums", async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/albums");
    const data = await response.json();

    return data;
  } catch (error) {
    toast.error("Error to fetch all Albums from API");
  }
});

// + Add New Album
export const addNewAlbum = createAsyncThunk("addNewAlbum", async (album) => {
  try {
    const newAddedAlbum = {
      userId: album.userId,
      id: album.id,
      title: album.title,
    };
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/albums",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAddedAlbum),
      }
    );
    const data = await response.json();

    toast.success(`${newAddedAlbum.title} - new Album Added Successfully`);
    return data;
  } catch (error) {
    toast.error("Error To Add New Album");
  }
});

// / Get Current Album
export const getAlbumById = createAsyncThunk(
  "getCurrentAlbum",
  async (album) => {
    try {
      toast.info(`${album.title} is active Album Now`);
      return album;
    } catch (error) {
      toast.error("Error To Update Album");
    }
  }
);

// * Update Current Album
export const updateAlbumById = createAsyncThunk(
  "updateCurrentAlbum",
  async (updatedAlbum) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums/${updatedAlbum.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAlbum),
        }
      );
      const data = await response.json();

      toast.success(`${updatedAlbum.title} is updated now`);
      return data;
    } catch {
      toast.error("Error To Update Album");
    }
  }
);

// - Delete Album By Id
export const deleteAlbumById = createAsyncThunk(
  "deleteAlbumById",
  async (albumId) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`, {
        method: "DELETE",
      });
      toast.info("Album deteled");
      return albumId;
    } catch {
      toast.error("Error to delete Album");
    }
  }
);

// $ Add New Album Form Handler
export const showNewAlbumForm = createAsyncThunk("newAlbumForm", async () => {
  return true;
});

// - Clear Current Album
export const clearCurrentAlbum = createAsyncThunk(
  "clearCurrentAlbum",
  async () => {
    return true;
  }
);

const createAlbumToolKit = createSlice({
  name: "album",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    // + Add New Album
    builder.addCase(addNewAlbum.fulfilled, (state, action) => {
      if (!Array.isArray(state.allAlbums)) {
        state.allAlbums = []; // Reset to an empty array if it's not an array
      }
      state.allAlbums.push(action.payload);
      state.newAlbumForm = false;
      state.isLoading = false;
    });
    builder.addCase(addNewAlbum.rejected, (state, action) => {
      state.errorMessage = action.payload.error;
      state.isLoading = false;
      state.newAlbumForm = false;
    });
    builder.addCase(addNewAlbum.pending, (state, action) => {
      state.newAlbumForm = false;
      state.isLoading = true;
    });

    // / Fetch All Albums
    builder.addCase(fetchAllAlbums.fulfilled, (state, action) => {
      if (!Array.isArray(state.allAlbums)) {
        state.allAlbums = []; // Reset to an empty array if it's not an array
      }
      state.allAlbums = action.payload;
      state.newAlbumForm = false;
      state.isLoading = false;
    });
    builder.addCase(fetchAllAlbums.rejected, (state, action) => {
      state.errorMessage = action.payload.error;
      state.newAlbumForm = false;
      state.isLoading = false;
    });
    builder.addCase(fetchAllAlbums.pending, (state, action) => {
      state.newAlbumForm = false;
      state.isLoading = true;
    });

    // / Fetch Current Album
    builder.addCase(getAlbumById.fulfilled, (state, action) => {
      state.activeAlbum = action.payload;
      state.newAlbumForm = true;
      state.isLoading = false;
    });
    builder.addCase(getAlbumById.rejected, (state, action) => {
      state.errorMessage = action.payload.error;
      state.newAlbumForm = false;
      state.isLoading = false;
    });
    builder.addCase(getAlbumById.pending, (state, action) => {
      state.newAlbumForm = false;
      state.isLoading = true;
    });
    // * Update Current Album
    builder.addCase(updateAlbumById.fulfilled, (state, action) => {
      const index = state.allAlbums.findIndex(
        (album) => album.id === action.payload.id
      );
      if (index !== -1) {
        state.allAlbums[index] = action.payload; // Update the album in the state
      } else {
        console.error("Album not found in state:", action.payload);
      }
      state.newAlbumForm = false;
      state.isLoading = false;
    });
    builder.addCase(updateAlbumById.rejected, (state, action) => {
      state.errorMessage = action.payload.error;
      state.newAlbumForm = false;
      state.isLoading = false;
    });
    builder.addCase(updateAlbumById.pending, (state, action) => {
      state.newAlbumForm = false;
      state.isLoading = true;
    });

    // - Delete Current Album
    builder.addCase(deleteAlbumById.fulfilled, (state, action) => {
      console.log(action.payload);
      const index = state.allAlbums.findIndex(
        (album) => album.id === action.payload
      );
      if (index !== -1) {
        state.allAlbums.splice(index, 1); // Delete the album in the state
      } else {
        console.error("Album not found in state:", action.payload);
      }
      state.newAlbumForm = false;
      state.isLoading = false;
    });
    builder.addCase(deleteAlbumById.rejected, (state, action) => {
      state.errorMessage = action.payload.error;
      state.newAlbumForm = false;
      state.isLoading = false;
    });
    builder.addCase(deleteAlbumById.pending, (state, action) => {
      state.newAlbumForm = false;
      state.isLoading = true;
    });

    // % Handle AddNewAlbumForm
    builder.addCase(showNewAlbumForm.fulfilled, (state, action) => {
      state.newAlbumForm = action.payload;
      state.isLoading = false;
    });
    builder.addCase(showNewAlbumForm.rejected, (state, action) => {
      state.errorMessage = action.payload.error;
      state.newAlbumForm = false;
      state.isLoading = false;
    });
    builder.addCase(showNewAlbumForm.pending, (state, action) => {
      state.newAlbumForm = false;
      state.isLoading = true;
    });

    // - Clear Current Album
    builder.addCase(clearCurrentAlbum.fulfilled, (state, action) => {
      state.activeAlbum = null;
      state.isLoading = false;
    });
  },
});

// & Export AlbumReducer
export const albumReducer = createAlbumToolKit.reducer;

// & Export All Albums Selector State
export const allAlbumsSelector = (state) => state.albumReducer.allAlbums;

// & Export activeAlbum Selector
export const activeAlbumSelector = (state) => state.albumReducer.activeAlbum;

// & Export newAlbumForm Selector
export const newAlbumformSelector = (state) => state.albumReducer.newAlbumForm;

// & Export Error Message Selector
export const errorMessageSelector = (state) => state.albumReducer.errorMessage;

// & Export isLoading Selector
export const isLoadingSelector = (state) => state.albumReducer.isLoading;
