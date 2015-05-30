// Example using XMLHttpRequest as a promise with the Adapter pattern
// SRC - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

(function () {
  
  // Expose public API
  function fetchMdnAPI($http) {
    var mdnAPI, 
      payload, 
      callback;

    console.log('Getting Promise docs...');
    
    mdnAPI = 'https://developer.mozilla.org/en-US/search.json';
    payload = {
      'topic': 'js',
      'q': 'Promise'
    };
    
    callback = {
      success : function(data){
        console.log(1, 'success', JSON.parse(data));
      },
      error : function(data){
        console.log(2, 'error', JSON.parse(data));
      }
    };
    
    $http(mdnAPI)
      .get(payload)
      .then(callback.success)
      .catch(callback.error);
  }

  window.fetchMdnAPI = fetchMdnAPI;

}());
