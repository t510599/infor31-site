/* Create menu */
$('#defaultMenu').append($('#bannerMenu').html());
$('#defaultMenu > * > a:first-child').addClass('active'); // logo
$('#defaultMenu').css('width',$('#content').width());

/* sidebar */
$('.mobile.only.right.item').each((i,e)=>{ //sidebar icon
    $(e).on('click',()=>{
        ts('.ts.sidebar').sidebar({
            dimPage: true,
            scrollLock: true,
            closable: false
        }).sidebar('toggle');
        setTimeout(()=>{
            $('.pusher').attr('data-sidebar-closing','true'); // closable: false hack!
        },450);
    });
});
$('#bannerMenu .right.menu .item').each((i,e)=>{
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
        $('#defaultMenu').css('visibility','visible').css('opacity','1'); // transition purpose
    } else {
        $('#defaultMenu').css('visibility','hidden').css('opacity','0'); // transition purpose
    }
});

/* resize listener */
$(window).on('resize',() => {
    setTimeout(()=>{$('#defaultMenu').css('width',$('#content').width());},500); // delay for a while
});
/* Menu end */

/* tab menu */
ts('#desktopTab .item').tab();
ts('#mobileTab .item').tab();
['#desktopTab','#mobileTab'].forEach((selector)=>{ // synchronize the desktop tab and the mobile tab
    $(selector).click(function(e){
        var tabName = e.target.dataset.tab;
        $('a[data-tab="{{ tabName }}"]:not(.active)'.replace('{{ tabName }}',tabName)).each((i,e)=>{
            $(e).addClass('active');
        });
    });
});

/* tab marquee */
tabs = [];
$('#desktopTab .item').each((i,e)=>{
    tabs.push(e);
});
function marquee() {
    tabs = tabs.concat(tabs.splice(0,1)); // move the first one to the last
    tabs[0].click();
};
var marqueeTimer = setInterval(marquee,6500);
/* tab end */

/* Banner image filter */
setTimeout(()=>{$('.filter').css("background-color","rgba(0,0,0,0.4)");},500);