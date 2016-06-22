(function(module) {
  var repoView = {};
  var userView = {};
  /* TODO: Let's compile our new template!
       Save the result of invoking Handlebars in this 'repoCompiler' variable
       that we will pass to the append method below. */
  var repoCompiler = function(repo) {
    var template = Handlebars.compile($('#repo-template').text());
    return template(repo);
  };

  var userCompiler = function(user) {
    var template = Handlebars.compile($('#github-info-template').text());
    return template(user);
  };// Finish the Handlebars method here!

  repoView.renderRepos = function() {
    $('#about ul').empty().append(
      repos.withTheAttribute('name')  // TODO: experiment changing this attribute field!
      .map(repoCompiler)
    );
  };

  userView.renderUser = function() {
    $('#github-info').append(userCompiler(user.allUser));
  };
/* TODO: Call the function that loads (or 'requests') our repo data.
    Pass in some view function as a higher order callback, so our repos
    will render after the data is loaded. */
  repos.requestRepos(repoView.renderRepos);
  user.requestUser(userView.renderUser);

  module.repoView = repoView;
  module.userView = userView;

})(window);
