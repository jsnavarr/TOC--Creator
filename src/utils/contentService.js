import tokenService from './tokenService';

const BASE_URL = '/api/contents/';

export default {
  create,
  index,
  show,
  deleteContent, 
  openContent,
};

function index() {
  // console.log('user in index ', user);
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    },
    // body: JSON.stringify({user_id: user._id})
  };
  // console.log('calling fetch');
  return fetch(BASE_URL, options).then(res => res.json());
}

function show(user_id) {
  // console.log('user in index ', user);
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    },
    user_id: JSON.stringify({user_id: user_id})
  };
  // console.log('calling fetch for show', user_id);
  return fetch(BASE_URL+'user/'+user_id, options).then(res => res.json());
}

function openContent(content_id) {
  console.log('open content ', content_id);
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    },
    content_id: JSON.stringify({content_id: content_id})
  };
  console.log('open content ', options.content_id);
  // console.log('calling fetch for show', user_id);
  return fetch(BASE_URL+content_id, options).then(res => res.json());
}

function deleteContent(id) {
  // console.log('user in index ', user);
  const options = {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    },
    user_id: JSON.stringify({id: id})
  };
  // console.log('calling fetch for delete', id);
  return fetch(BASE_URL+id, options).then(res => res.json());
}

function create(object) {
  // state.input_keywords = keywords;
  // console.log('state ', object);
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      // Add this header - don't forget the space after Bearer
      'Authorization': 'Bearer ' + tokenService.getToken()
    },
    body: JSON.stringify(object)
  };

  return fetch(BASE_URL, options).then(res => res.json());
}

