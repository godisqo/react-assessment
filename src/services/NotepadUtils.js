import { deleteGist, getAllGists, getSingleGist, postGist, updateGist } from './GistInterface.js'

/**
 * NOTE: For simplicity, this filename will be used to reference a user's notepad gist data.
 * It's possible a user may have more than one of these setup, but this app will only be using the
 * first available gist based on this filename.
 *
 * When a gist is created for the first time for a user, it will be created with this filename
 * so it is easily referenced when grabbed in the future.
 */
const CUSTOM_GIST_FILENAME = 'notepadAppGistData';

/**
 * Parses the JSON response from a user's gists
 * @param {[Object]} gistData
 * @returns {string | null}
 */
const parseResponseForNotepadGistId = (gistData) => {
  for (var i = 0; i < gistData.length; i++) {
    let filenameKeys = Object.keys(gistData[i].files);

    // Gist should only have a single parent filename
    if (filenameKeys.length > 1) {
      continue;
    }

    // If the custom gist filename key is detected, we found the notepad app
    if (filenameKeys.indexOf(CUSTOM_GIST_FILENAME) > -1) {
      return gistData[i].id;
    }
  }

  return null;
}

/**
 * Checks for any existing notepads in user's gist
 * @returns Promise
 */
const getNotepads = async () => {
  try {
    const allGistsResponse = await getAllGists();

    if (!allGistsResponse.ok) {
      throw new Error(`HTTP error for GET all gists: ${allGistsResponse.status}`);
    }

    const gistArray     = await allGistsResponse.json();
    const notepadGistId = parseResponseForNotepadGistId(gistArray);

    // If a gist with the filename indicator is not found, a notepad gist has not been created yet
    if (notepadGistId === null) {
      return null;
    }

    const notepadGistResponse = await getSingleGist(notepadGistId);

    if (!allGistsResponse.ok) {
      throw new Error(`HTTP error for GET single gist: ${notepadGistResponse.status}`);
    }

    const singleGist = await notepadGistResponse.json();

    const retrievedData = {
      gistId  : notepadGistId,
      gistData: JSON.parse(singleGist.files[CUSTOM_GIST_FILENAME].content)
    };

    return retrievedData;
  } catch (error) {
    console.error(`There was an error: ${error}`);
  }
};

const updateNotepad = async (notepadData, gistId) => {
  const structuredData = {
    [CUSTOM_GIST_FILENAME]: {
      content: JSON.stringify(notepadData)
    }
  }

  try {
    const updateResult = await updateGist(structuredData, gistId);

    if (!updateResult.ok) {
      throw new Error(`HTTP error for PATCH single gist: ${updateResult.status}`);
    }
  } catch (error) {
    console.error(`There was an error: ${error}`);
  }
};

const createNotepad = async (gistData) => {
  const stringData     = JSON.stringify(gistData);
  const structuredData = {
      [CUSTOM_GIST_FILENAME]: {
        content: stringData
      }
  }

  try {
    const postResult = await postGist(structuredData);

    if (!postResult.ok) {
      throw new Error(`HTTP error for GET all gists: ${postResult.status}`);
    }
  } catch (error) {
    console.error(`There was an error: ${error}`);
  }
}

const deleteNotepad = async (gistId) => {
  try {
    const deleteResult = await deleteGist(gistId);

    if (!deleteResult.ok) {
      throw new Error(`HTTP error for GET all gists: ${deleteResult.status}`);
    }
  } catch (error) {
    console.error(`There was an error: ${error}`);
  }
}

export {
  getNotepads,
  updateNotepad,
  createNotepad,
  deleteNotepad
}