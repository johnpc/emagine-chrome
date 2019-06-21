chrome.browserAction.onClicked.addListener(function(activeTab)
{
    var newURL = "http://www.emagine-entertainment.com/showtimes/saline/";
    chrome.tabs.create({ url: newURL });
});
