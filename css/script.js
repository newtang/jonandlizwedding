$(function() {
    if ($("#nav").length) {
        var activeNav = $("#nav").find('.active');
        $("#nav a").click(function() {
            activeNav.removeClass('active');
            $(this).addClass('active');
        });
    }
    
    if ($(".wedding-party").length) {
        maxWidth = 299;
        minWidth = 150;

        $("#banner-set-1 a").hover(
            function(){
                if (!$(this).hasClass("active")) {
                    $(lastBlock1)
        	            .attr('class','')
                        .animate({width: minWidth+"px"}, { queue:false, duration:400 })
        	            .find('p img')
        	                .animate({marginLeft: "-63px"}, { queue:false, duration:400})
        	            .end()
        	            .find('p span')
        	                .fadeOut(400);
        	        $(this)
        	            .attr('class', 'active')
        	            .animate({width: maxWidth+"px"}, { queue:false, duration:400})
        	            .find('p img')
        	                .animate({marginLeft: "0"}, { queue:false, duration:400})
        	            .end()
         	            .find('p span')
         	                .fadeIn(400);
        	        lastBlock1 = this;
                }
            }
        );
        lastBlock1 = $("#a1");
        
        $("#banner-set-2 a").hover(
            function(){
                if (!$(this).hasClass("active")) {
                    $(lastBlock2)
        	            .attr('class','')
                        .animate({width: minWidth+"px"}, { queue:false, duration:400 })
        	            .find('p img')
        	                .animate({marginLeft: "-63px"}, { queue:false, duration:400})
        	            .end()
        	            .find('p span')
        	                .fadeOut(400);
        	        $(this)
        	            .attr('class', 'active')
        	            .animate({width: maxWidth+"px"}, { queue:false, duration:400})
        	            .find('p img')
        	                .animate({marginLeft: "0"}, { queue:false, duration:400})
        	            .end()
         	            .find('p span')
         	                .fadeIn(400);
        	        lastBlock2 = this;
                }
            }
        );
        lastBlock2 = $("#a2");
    }
    
    $("#contact-us").colorbox({
        inline: true,
        height: 400,
        href: "#contact-us-content",
        transition: "none",
        width: 600
    });
    
    $("#rsvp").colorbox({
        inline: true,
        height: 400,
        href: "#rsvp-content",
        transition: "none",
        width: 600
    });
    
    if ($("#add-comment").length) {
        $("#add-comment").bind('click', function() {
            $("li.add-comment").slideToggle();
            return false;
        });
        
        $('#name, #comment').focus(function() {
            if ($(this).data('orig') == undefined) {
                $(this).data('orig', $(this).attr('value'));
                $(this).attr('value', '');
            } else if ($(this).data('orig') == $(this).attr('value')) {
                $(this).attr('value', '');
            }
        });
        $('#name, #comment').blur(function() {
            if ($(this).attr('value') == '') {
                $(this).attr('value', $(this).data('orig'));
            }
        });
        
        $("#add-comment-form").bind('submit', function() {
            if (($('#name').val() != '') && ($('#name').val() != 'Your name') && ($('#comment').val() != '') && ($('#comment').val() != 'Your comment')) {
                $("#comment-modal").toggle();
                $.post('/guestbook/post/',
                    {
                        'name': $("#name").val(),
                        'comment': $("#comment").val()
                    },
                    function(data) {
                        $("li.add-comment").after('' +
                            '<li class="group disabled" id="comment-' + data.id + '">' +
                            '    <dt style="color: green;">' +
                            '        ' + data.name +
                            '        <span>' + data.created + '</span>' +
                            '    </dt>' +
                            '    <dd>' +
                            '        ' + data.comment +
                            '    </dd>' +
                            '</li>');
                            $("#comment-modal").toggle();
                        $("#comment-" + data.id ).slideToggle();
                        $("li.add-comment").slideToggle();
                    },
                    'json');
            } 
            return false;
        });
    }
    
    $("#contact-form").bind('submit', function() {
        if (($('#name').val() != '') && ($('#email').val() != '') && ($('#message').val() != '')) {
            $("#contact-modal").toggle();
            $.post('/contact-us/post/',
                {
                    'name': $("#name").val(),
                    'email': $("#email").val(),
                    'message': $("#message").val()
                },
                function(data) {
                    $("#contact-form").html("<p style='color: green;'>Thanks! We've received your message, and will get back to you ASAP.");
                    $("#contact-modal").toggle();
                },
                'json');
        } 
        return false;
    });
})
