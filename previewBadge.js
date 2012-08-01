dev = true;
client_id = "44361aaca81d0d37fa071536376d14d4";
root_url = "https://soundcloud.com";

template = 

$(function() {
    SC.initialize({client_id: client_id});
    getUserInfo('/agalma');
});


function showPreview(el) {
    var link = findLink(el);
    var user = getUserInfo(link);
    var prvw = buildPreview(user);
    $(el).appendChild(prvw);
}

function getUserInfo(username) {
    SC.get('/resolve', {url: root_url + username}, function(res) {user_obj = res;});
    return user_obj;
}

function findLink(el) {

}

function buildPreview(user) {

}

function cl(msg) {if (dev) {console.log(msg);}}
