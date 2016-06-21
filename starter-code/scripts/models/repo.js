(function(module) {
  var repos = {};
  var user = {};

  repos.allRepos = [];
  user.allUser = [];

  repos.requestRepos = function(callback) {
    /* TODO: How would you like to fetch your repos? Someone say AJAX?!
      Do not forget to call the callback! */
    $.ajax({
      url: 'https://api.github.com/users/meganreardon/repos' + '?per_page=10' + '&sort=updated',
      type: 'GET',
      headers: {'Authorization': 'token ' + githubToken},
      success: function(data) {
        console.log(data);
        repos.allRepos = data;
        callback();
      }
    });
  };

  user.requestUser = function(callback) {
    /* TODO: How would you like to fetch your repos? Someone say AJAX?!
      Do not forget to call the callback! */
    $.ajax({
      url: 'https://api.github.com/users/meganreardon',
      type: 'GET',
      headers: {'Authorization': 'token ' + githubToken},
      success: function(data) {
        console.log(data);
        repos.allUser = data;
        callback();
      }
    });
  };

  repos.withTheAttribute = function(myAttr) {
    return repos.allRepos.filter(function(aRepo) {
      return aRepo[myAttr];
    });
  };

  user.withTheAttribute = function(myAttr) {
    return user.allUser.filter(function(aRepo) {
      return aRepo[myAttr];
    });
  };

  module.repos = repos;
  module.user = user;
})(window);
