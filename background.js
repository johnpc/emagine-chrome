chrome.browserAction.onClicked.addListener(function(activeTab)
{
    var newURL = "https://www.emagine-entertainment.com/theatres/emagine-saline/";
    chrome.tabs.create({ url: newURL });
});
