/* Create menu */
$('#defaultMenu').append($('#bannerMenu').html());
$('#defaultMenu > * > a:first-child').addClass('active'); // logo
$('#defaultMenu').css('width',$('#content').width());

/* sidebar */
$('.mobile.only.right.item').each((i,e) => { // sidebar icon
    $(e).on('click',() => {
        ts('.ts.sidebar').sidebar({
            dimPage: true,
            scrollLock: true,
            closable: false
        }).sidebar('toggle');
        setTimeout(() => {
            $('.pusher').attr('data-sidebar-closing','true'); // closable: false hack!
        },450);
    });
});
$('#bannerMenu .right.menu .item').each((i,e) => {
    $(e).clone().appendTo('.ts.sidebar');
});
$('.ts.sidebar a.right.aligned.item').click(function() { // close icon
    $('.pusher').attr('data-sidebar-closing',''); // clear attribute
    ts('.ts.sidebar').sidebar('toggle');
});

/* Default menu show & hide */
$('.pusher').scroll(function() {
    var scrollVal = $(this).scrollTop();
    if ( scrollVal > $('#banner').outerHeight() ){
        $('#defaultMenu').css('visibility','visible');
    } else {
        $('#defaultMenu').css('visibility','hidden');
    }
});

/* resize listener */
var resizeTimer;
$(window).on('resize',() => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {$('#defaultMenu').css('width',$('#content').width());},100); // delay for a while
});
/* Menu end */

/* marquee menu */
ts('#desktopTab .item').tab();
ts('#mobileTab .item').tab();
['#desktopTab','#mobileTab'].forEach((selector) => { // synchronize the desktop tab and the mobile tab
    $(selector).click(function(e) {
        var tabName = e.target.dataset.tab;
        $(`a[data-tab="${tabName}"]:not(.active)`).each((i,e) => {
            $(e).addClass('active');
        });
    });
});

/* marquee */
var tabs = Array.from(document.querySelectorAll('#desktopTab .item'));
function marquee() {
    tabs = tabs.concat(tabs.splice(0,1)); // move the first one to the last
    tabs[0].click();
};
var marqueeTimer = setInterval(marquee,6500);
/* marquee end */

/* Banner image filter */
setTimeout(() => {$('.filter').css("background-color","rgba(0,0,0,0.4)");},500);