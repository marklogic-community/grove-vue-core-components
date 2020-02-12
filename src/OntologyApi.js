var api = '/api/ontology/';

// TODO: consider refactoring out to utils library with identical
// function in grove-vue-visjs-graph
function buildUrl(path, params) {
  var url = new URL(api + path, window.location.href);
  if (params) {
    Object.keys(params).forEach(key => {
      if (Array.isArray(params[key])) {
        params[key].map(param => url.searchParams.append(key, param));
      } else {
        url.searchParams.append(key, params[key]);
      }
    });
  }
  return url;
}

// // copied from Angular.js
// function isObject(value) {
//   // http://jsperf.com/isobject4
//   return value !== null && typeof value === 'object';
// }

export default {
  name: 'OntologyApi',
  getHierarchy(ontology) {
    return fetch(buildUrl(ontology + '/hierarchy'), {
      method: 'GET',
      credentials: 'same-origin'
    }).then(
      response => {
        return response.json().then(json => {
          return { isError: false, response: json };
        });
      },
      error => {
        return { isError: true, error: error };
      }
    );
  }
};
