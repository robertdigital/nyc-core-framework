$(document).ready(function () {

    ////////////////////////////////////////
    // Mutation observer - watch for RTL
    ////////////////////////////////////////

    var target = document.querySelector('html');

    var observer = new MutationObserver( function(mutations) {
        mutations.forEach( function() {
            var classes = target.getAttribute('class');
            var single_class = 'translated-rtl';
            if (classes.includes(single_class)) {
                target.setAttribute('dir', 'rtl');
            } else {
                target.setAttribute('dir', 'ltr');
            }
        });
    });

    var config = {
        attributes: true,
        attributeFilter: ['class']
    }
    
    observer.observe(target, config);

    ////////////////////////////////////////
    // Language, Search, and Menu Toggle
    ////////////////////////////////////////

    $('#global-language').on('show.bs.collapse', function () {
        $('#global-search').collapse('hide');
        $('#nav-primary').collapse('hide');
    });

    $('#global-search').on('show.bs.collapse', function () {
        $('#global-language').collapse('hide');
        $('#nav-primary').collapse('hide');
    });

    $('#nav-primary').on('show.bs.collapse', function () {
        $('#global-search').collapse('hide');
        $('#global-language').collapse('hide');
    });

    ////////////////////////////////////////
    // Language and Search Toggle Focus
    ////////////////////////////////////////

    $('#global-language').on('shown.bs.collapse', function () {
        $('.goog-te-combo').focus();
    }).on('show.bs.collapse', function () {
        $('.goog-te-combo').blur();
    });

    $('#global-search').on('shown.bs.collapse', function () {
        document.getElementById('global-search-bar').focus();
    }).on('show.bs.collapse', function () {
        document.getElementById('global-search-bar').blur();
    });

    ////////////////////////////////////////
    // Back to top
    ////////////////////////////////////////

    var scroll_speed = 800;

    $('#back-to-top').click(function (e) {

        e.preventDefault();

        $('body, html').animate({
            scrollTop: 0
        }, scroll_speed);
    });

});

////////////////////////////////////////
// Google Translate Links
////////////////////////////////////////

$('.lang-select').click(function (e) {
    e.preventDefault();
    var lang = $(this).attr('data-lang')
    setLanguage(lang);
});

function setLanguage(theLang) {
    var theSelect = $('.goog-te-combo');
    var db = theSelect.get(0);
    theSelect.val(theLang);
    fireEvent(db, 'change');
}

function fireEvent(element, event) {
    if (document.createEventObject) {
        var evt = document.createEventObject();
        return element.fireEvent('on' + event, evt)
    } else {
        var evt = document.createEvent("HTMLEvents");
        // event type, bubbling, cancelable
        evt.initEvent(event, false, true); 
        return !element.dispatchEvent(evt);
    }
}