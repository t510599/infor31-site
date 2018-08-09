/* DOM Objects */
var slate = $('#refreshPlaceholder');
var modal = $('.ts.modal');

/* System variables */
var host = "/ajax/course";
var courses = [];

/* Templates */
var courseTemplate = 
`<div class="ts card" data-course="{{ name }}">
    <div class="secondary very padded extra content">
        <div class="ts icon header">
            <i class="{{ icon }}"></i>
        </div>
    </div>
    <div class="content">
        <div class="header">{{ name }}</div>
        <div class="meta">{{ time }}</div>
    </div>
    <div class="ts bottom attached fluid buttons">
        <button class="ts primary button">了解更多</button>
    </div>
</div>`;
var contentTemplate =
`<div class="ts medium image">
    <img src="{{ image }}" />
</div>
<div class="description">
    <p>{{ description }}</p>
</div>
`

function getCourse(){
    var loader = $('#refreshPlaceholder .ts.loader');
    slate.show();
    slate.attr('data-refresh','false');
    slate.children('.empty,.refresh').css('display','none')
    $('#courseData').html('');
    if (!loader.hasClass('active')) {
        loader.addClass('active');
    }
    function run(){
        $.ajax({
            url: host,
            type: 'get',
            cache: false,
            contentType: false,
            processData: false
        }).done((data) => {
            try {
                parseCourse(data);
            } catch (error) {
                console.error('An error occurred when parsing course data.');
                console.error(error);
                console.warn(data);
                slate.show();
                slate.children('.refresh').show();
                slate.attr('data-refresh','true');
                $('#courseData').html('');
            }
        }).fail((jqXHR) => {
            console.error('An error occurred when getting course data. Status: '+jqXHR.status);
            slate.children('.refresh').show();
            slate.children('.empty').css('display','none');
            slate.attr('data-refresh','true');
        });
        if (loader.hasClass('active')) {
            loader.removeClass('active');
        }
    }
    setTimeout(run,1200);
}

function parseCourse(json){
    if (json.length < 1) {
        $('#refreshPlaceholder').children('.empty').show();
        slate.children('.refresh').css('display','none');
        return undefined;
    } else {
        slate.children('.empty').css('display','none');
        slate.children('.refresh').css('display','none');
        slate.css('display','none');
        json.forEach((course) => {
            if (course.time == "") {
                textNode = courseTemplate.replace(/{{ name }}/g,course.name).replace('{{ icon }}',course.icon).replace('{{ time }}','敬請期待');
                $('#courseData').append(textNode)
                $('#courseData .ts.card[data-course="{{ name }}"] .button'.replace('{{ name }}',course.name)).html('敬請期待');
                $('#courseData .ts.card[data-course="{{ name }}"] .button'.replace('{{ name }}',course.name)).addClass('disabled')
            } else {
                textNode = courseTemplate.replace(/{{ name }}/g,course.name).replace('{{ icon }}',course.icon).replace('{{ time }}','時間: '+course.time);
                $('#courseData').append(textNode)
                $('#courseData .ts.card[data-course="{{ name }}"] .button'.replace('{{ name }}',course.name)).click(function() {
                    modal.children('.header').html(course.name);
                    modal.children('.content').html(contentTemplate.replace('{{ image }}',course.image).replace('{{ description }}',course.description))
                    ts('.ts.modal').modal('show');
                });
            }
        });
    }
}

function hasShownOnTheScreen() {
    return ($('#courses').offset().top <= $(window).height() - $('#courses').outerHeight());
    // because of pusher, offset is strange
}

$('#refreshPlaceholder').click(function() {
    if (this.dataset.refresh == "true") {
        getCourse();
    } else {
        return undefined;
    }
});

// start first time fetching when the section is shown on the screen
$('.pusher').bind('scroll.courseLoading',function() {
    if ( hasShownOnTheScreen() ){
        $('.pusher').unbind('scroll.courseLoading');
        getCourse();
    }
});