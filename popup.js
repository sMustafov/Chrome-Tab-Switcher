var func = (function () {
    chrome.windows.getAll({populate:true},function(windows){
        windows.forEach(function(window){
            console.log(window)
            window.tabs.forEach(function(tab){
                $("ul").append($("<div class='element'>")
                    .append($("<a>")
                        .attr('href', tab.url)
                        .text(tab.title + ' ' + tab.url)));
            });
        });
    });
});

func();

$(document).on('keyup', '#box', function () {
    var valThis = this.value.toLowerCase(),
        lenght  = this.value.length;
    $('.navList>div').each(function () {
        var text  = $(this).text(),
            textL = text.toLowerCase(),
            htmlR = '<b>' + text.substr(0, lenght) + '</b>' + text.substr(lenght);
        (textL.indexOf(valThis) != -1) ? $(this).show() : $(this).hide();
    });

});


$(document).on('click', ".navList>div>a", function () {
    var tabId;
    var windowId;
    var attrUrl = $(this).attr('href');
    chrome.tabs.query({}, function (tabs) {
        for (var i = 0; i < tabs.length; i++) {
            if(tabs[i].selected = true){
                tabs[i].selected = false;
            }
            if(tabs[i].url === attrUrl){
                tabs[i].selected = true;
                tabId = tabs[i].id;
                windowId = tabs[i].windowId;
                console.log(tabs[i])
            }
        }
        chrome.windows.update(windowId, {focused: true});
        chrome.tabs.update(tabId, {selected: true});
    });
});