dev = true;
client_id = "44361aaca81d0d37fa071536376d14d4";
root_url = "https://soundcloud.com";
selectors = ".userImageBadge, .soundTitle__username, .userBadge__title, .commentItem > .sc-media-image, .commentItem > .commentItem__content > .commentItem__body > .sc-text-light, .commentBadge__body > a, .userNetworkInfo__imageLink";

$(function() {
    SC.initialize({client_id: client_id});
    // testing :p
    buildPreview('/agalma');
    $('body').on('mouseenter', selectors, function(event) { 
        var link = findLink(this);
        var prvw = buildPreview(link);        
    });
    // todo: add binding for mouseleave to hide the thing.
});


function findLink(el) {
    var jel = $(el);
    if (jel.hasClass('userImageBadge')) {
        if (jel.hasClass('userBadge__avatar') || jel.hasClass('small')) {
            link = $('a', jel).attr('href');
        } else if (jel.hasClass('xlarge')) {
        link = $('h1', jel.parent().parent()).text().trim().split(' ')[0].toLowerCase; //might be preferable to simply unbind the handler for these, esp if we can verify they only show up on own_profile pages.
        }
    } else if (jel.hasClass('userBadge__title')) {
        link = $('a', jel).attr('href'); //same as that thing above - maybe merge those as default (final else?) 
    } else if (el.hasAttribute('href')) {
        link = jel.attr('href');
    } else if (jel.hasClass('sc-text-light')) {
        link = jel.text().trim().toLowerCase();
    }

    return link;
}

function buildPreview(user) {
    SC.get('/resolve', {url: root_url + user}, function(res) {cl(res);});
}

function cl(msg) {if (dev) {console.log(msg);}}
