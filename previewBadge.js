dev = true;
client_id = "44361aaca81d0d37fa071536376d14d4";
root_url = "https://soundcloud.com";
selectors = ".userImageBadge, .soundTitle__username, .userBadge__title, .commentItem > .sc-media-image, .commentItem > .commentItem__content > .commentItem__body > .sc-text-light, .commentBadge__body > a, .userNetworkInfo__imageLink";


function forceVisibility(el) {
  //may be best to determine which elements to change on a per-class basis (like findLink below)
  //also would be nice to make this a toggle-style deal, returning doc to original state.
  return true;
}

function findLink(el) {
  var jel = $(el);
  if (jel.hasClass('userImageBadge')) {
    if (jel.hasClass('userBadge__avatar') || jel.hasClass('small')) {
      link = $('a', jel).attr('href');
    } else if (jel.hasClass('xlarge')) {
      link = $('h1', jel.parent().parent()).text().trim().split(' ')[0].toLowerCase(); //might be preferable to simply unbind the handler for these, esp if we can verify they only show up on own_profile pages.
      link = '/' + link;
    }
  } else if (jel.hasClass('userBadge__title')) {
    link = $('a', jel).attr('href'); //same as that thing above - maybe merge those as default (final else?) 
  } else if (el.hasAttribute('href')) {
    link = jel.attr('href');
  } else if (jel.hasClass('sc-text-light')) {
    link = jel.text().trim().toLowerCase();
    link = '/' + link;
  }

  return link;
}

function buildPreview(el) {
  user = findLink(el);
  SC.get('/resolve', 
    {url: root_url + user}, 
    function(res) {
      setTimeout(function() {
        var prvw = badgeTemplate(res);
        $(el).after(prvw);
        }, 750);
    });
}

function cl(msg) {if (dev) {console.log(msg);}}

$(function() {
  SC.initialize({client_id: client_id});
  $('body').on('mouseenter', 
    selectors + ':not(.previewBadge)', 
    function(event) { 
      forceVisibility(this);
      buildPreview(this); 
      });
  if (!dev) {
  $('body').on('mouseleave', 
    selectors + '.previewBadge', 
      function(event) {
        if ($(this).hasClass('previewBadge')) {
          $(this.parent).remove(this);
        } else {
          //  setTimeout(function() {
          $(this).siblings().remove('.previewBadge');
          //      }, 750);
        }
  });
  }
  if (dev) {
    $('body').prepend("<button class='clearPreview' onclick='#'>Clear Badges</button>");
    $('.clearPreview').on('click', function() {$('.previewBadge').remove()});
  }
        //todo: stop execution on buildPreview if mouseleave before setTimeout.
        //todo: figure out something that both prevents recursion
        ///////   AND doesn't remove the badge until mouse has left 
        ///////   BOTH the triggering element AND the badge.
});
