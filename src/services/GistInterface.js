const BASE_URL     = 'https://api.github.com/gists';
const AUTH_ENCODED = window.btoa(`${process.env.REACT_APP_GITHUB_USERNAME}:${process.env.REACT_APP_GIST_KEY}`);
const GIST_HEADERS = new Headers({
  Accept       : 'application/vnd.github.v3+json',
  Authorization: `Basic ${AUTH_ENCODED}`
});

const getAllGists = () => {
  return fetch(BASE_URL, {
    method : 'GET',
    headers: GIST_HEADERS
  });
}

const getSingleGist = (gistId) => {
  const singleGistUrl = `${BASE_URL}/${gistId}`;

  return fetch(singleGistUrl, {
    method : 'GET',
    headers: GIST_HEADERS
  });
}

const postGist = (gistData) => {
  const requestBody = JSON.stringify({
    files: gistData
  });

  return fetch(BASE_URL, {
    method : 'POST',
    headers: GIST_HEADERS,
    body   : requestBody
  });
}

const updateGist = (gistData, gistId) => {
  const updateUrl   = `${BASE_URL}/${gistId}`;
  const requestBody = JSON.stringify({
    files: gistData
  });

  return fetch(updateUrl, {
    method : 'PATCH',
    headers: GIST_HEADERS,
    body   : requestBody
  });
}

const deleteGist = (gistId) => {
  const deleteUrl = `${BASE_URL}/${gistId}`;

  return fetch(deleteUrl, {
    method : 'DELETE',
    headers: GIST_HEADERS
  });
}

export {
  deleteGist,
  getAllGists,
  postGist,
  getSingleGist,
  updateGist
}