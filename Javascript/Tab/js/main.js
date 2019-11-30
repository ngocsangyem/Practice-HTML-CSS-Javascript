const galleryItem = $('.js-gallery-item');

galleryItem.on('click', function() {
    const index = $(this).index('.js-gallery-item');
    const contentItem = $('.js-gallery-content[data-index=' + index + ']');
    const contentList = $('.js-gallery-content-list');

    if ($(this).hasClass('gallery-tab-list-item--active')) {
        console.log('active');

        return;
    }
    $('.gallery-tab-list-item--active').removeClass(
        'gallery-tab-list-item--active'
    );
    $(this).addClass('gallery-tab-list-item--active');

    contentList.animate(
        {
            left: 0 - contentItem.position().left
        },
        300
    );
});
