(function(module) {

  // Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
  var articleView = {};

  var renderArticleInfo = function(article, scriptTemplateId) {
    var template = Handlebars.compile($(scriptTemplateId).text());

    article.daysAgo = parseInt((new Date() - new Date(article.publishedOn))/60/60/24/1000);
    article.publishStatus = article.publishedOn ? 'published ' + article.daysAgo + ' days ago' : '(draft)';
    article.body = marked(article.body);

    return template(article);
  };

  articleView.handleAuthorFilter = function() {
    $('#author-filter').on('change', function() {
      if ($(this).val()) {
        $('article').hide();
        $('article[data-author="' + $(this).val() + '"]').fadeIn();
      } else {
        $('article').fadeIn();
        $('article.template').hide();
      }
      $('#category-filter').val('');
    });
  };

  articleView.handleCategoryFilter = function() {
    $('#category-filter').on('change', function() {
      if ($(this).val()) {
        $('article').hide();
        $('article[data-category="' + $(this).val() + '"]').fadeIn();
      } else {
        $('article').fadeIn();
        $('article.template').hide();
      }
      $('#author-filter').val('');
    });
  };

  articleView.setTeasers = function() {
    $('h2').prev('p').remove();
    $('h2').next('p').remove();
    $('.article-body *:nth-of-type(n+2)').hide();
    $('article').on('click', 'a.read-on', function(e) {
      e.preventDefault();
      if($(this).text() === 'Read on →') {
        $(this).parent().find('*').fadeIn();
        $(this).html('Show Less &larr;');
      } else {
        $('body').animate({
          scrollTop: ($(this).parent().offset().top)
        },200);
        $(this).html('Read on &rarr;');
        $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
      }
    });
  };

  articleView.renderIndexPage = function() {
    $('#ajax-spinner').fadeOut();
    $('#filters').fadeIn();
    Article.allArticles.forEach(function(a){
      if($('#category-filter option:contains("'+ a.category + '")').length === 0) {
        $('#category-filter').append(renderArticleInfo(a, '#category-filter-template'));
      };
      if($('#author-filter option:contains("'+ a.author + '")').length === 0) {
        $('#author-filter').append(renderArticleInfo(a, '#author-filter-template'));
      };
      $('#articles').append(renderArticleInfo(a, '#article-template'));
    });

    articleView.handleCategoryFilter();
    articleView.handleAuthorFilter();
    articleView.setTeasers();
  };

  module.articleView = articleView;
})(window);
