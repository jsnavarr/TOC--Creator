import tokenService from './tokenService';

const BASE_URL = '/api/contents/';

export default {
  create,
  index
};

function index() {
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  };
  console.log('calling fetch');
  return fetch(BASE_URL, options).then(res => res.json());
}

function create(object) {
  // state.input_keywords = keywords;
  console.log('state ', object);
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      // Add this header - don't forget the space after Bearer
      'Authorization': 'Bearer ' + tokenService.getToken()
    },
    body: JSON.stringify(object)

    // body.keywords: toJSON(keywords),
    // keywords: keywords
  };

  return fetch(BASE_URL, options).then(res => res.json());
}

