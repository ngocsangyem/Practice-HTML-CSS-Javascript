$(function() {
    $('.card').mousemove(function(event) {
        let parentWidth = $(this).width();
        let parentHeight = $(this).height();
        let parentMouseX = event.pageX - $(this).offset().left;
        let parentMouseY = event.pageY - $(this).offset().top;
        let x = (parentWidth / 2 - parentMouseX) / 15;
        let y = (parentHeight / 2 - parentMouseY) / 15;

        // console.log({ x }, { y });

        $(this).css({
            transform:
                'rotateX(' +
                y +
                'deg) rotateY(' +
                2 * x +
                'deg) translateZ(50px)',
            transition: 'all .15s ease'
        });

        $(this)
            .find('.card__img')
            .css({
                transform:
                    'scale(1.05) translateX(' +
                    -5 * x +
                    'px) translateY(' +
                    -5 * y +
                    'px)',
                transition: 'all .15s ease'
            });
    });

    $('.card').mouseleave(function(event) {
        $(this).css({
            transform: 'rotateX(0) rotateY(0)',
            transition: 'all .6s ease'
        });

        $(this)
            .find('.card__img')
            .css({
                transform:
                    'scale(1) translateX(0px) translateY(0px) translateZ(0)',
                transition: 'all .6s ease'
            });
    });
});
