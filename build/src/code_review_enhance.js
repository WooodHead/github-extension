function listenWindowScroll() {
  var $document = $(document);
  var $actionButton = $('.git_action_button_wrapper');
  $(window).scroll(function() {
    var $currentTop = $document.scrollTop();
    if ($currentTop > 300) {
      $actionButton.addClass('active');
    } else {
      $actionButton.removeClass('active');
    }
  });
}

function addScrollButton() {
  var scrollButton = $(actionButtonTemplate());
  $('body').append(scrollButton);
  bindButtonAction();
}

function bindButtonAction() {
  var $scrollButton = $('.github_scroll_top');
  $scrollButton.on('click', function() {
    $('html, body').animate({
      scrollTop: 0
    }, 'slow');
  });
}

function actionButtonTemplate() {
  return "<div class='git_action_button_wrapper'>" +
  scrollButtonTemplate() +
  topBarButtonTemplate() +
  "</div>";
}

function scrollButtonTemplate() {
  return "<div class='git_action_button github_scroll_top'>" +
  "<div class='scroll_top_icon'></div>" +
  "</div>";
}

function topBarButtonTemplate() {
  return "<div class='code_review_tab_wrapper'>" + getTopbarButton() + "</div>";
}

function getTopbarButton(){
  var $topbar = $('.tabnav-pr').find('.tabnav-tabs');
  var tabs = [];
  $topbar.find('.tabnav-tab').each(function(index, tab) {
    var href = $(tab).attr('href');
    var svg = $(tab).find('svg')[0].outerHTML;
    tabs.push({
      href: href,
      svg: svg
    });
  });
  var tabTemplates = [];
  tabs.forEach(function(tab, index) {
    tabTemplates.push(topBarTemplate(tab));
  });
  return tabTemplates.join("");
}

function topBarTemplate(tabObj) {
  return "<a href='" + tabObj.href + "' class='git_action_button code_review_tab'>" +
  "<div class='code_review_icon'>" + tabObj.svg + "</div>" +
  "<a>";
}

function matchUrl(url) {
  return url.match(/\/pull\//) || url.match(/\/compare\//);
}

function initial() {
  var url = window.location.href;
  if (matchUrl(url)) {
    addScrollButton();
    listenWindowScroll();
  }
}

initial();
