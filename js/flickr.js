var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

function grid() {
    $('.grid').packery({
        itemSelector: '.grid-item',
        gutter: 10
    });
};
var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

function displayPhotos(data) {
    $("#up").hide();
    if ($.isEmptyObject(data.items) === false) {
        var photoHTML = "<ul class='grid'>";
        $.each(data.items, function (i, photo) {
            photoHTML += '<li>';
            photoHTML += '<a href="' + photo.link + '">';
            photoHTML += '<img src="' + photo.media.m + '" class="grid-item" ></a></li>';
        });
        photoHTML += '</ul>';
        $('#photos').html(photoHTML);
    } else {
        $('#photos').html('<p id="nothing">Your search returned no results.</p>');
    }
};
$('#search').keyup(function (event) {
    var query = $("#search").val();
    var flickrOptions = {
        tags: query,
        format: "json"
    };
    delay(function () {
        $.getJSON(flickrAPI, flickrOptions, displayPhotos);
        window.setInterval(function () {
            grid();
        }, 200);
        setTimeout(function () { //calls click event after a certain time
            $("#up").show();
        }, 2000);
    }, 300);
});
var query2;
var clickableWords = function () {
    $('#ideas span').each(function () {
        $(this).click(function () {
            var query2 = ($(this).text());
            $("#search").val(query2);
            var flickrOptions = {
                tags: query2,
                format: "json"
            };
            $.getJSON(flickrAPI, flickrOptions, displayPhotos);
            window.setInterval(function () {
                grid();
            }, 200);
            setTimeout(function () { //calls click event after a certain time
                $("#up").show();
            }, 2000);
        });
    });
};
$("#ideas").jQCloud(word_array, {
    afterCloudRender: setTimeout('clickableWords()', 200)
});
