// решил использовать доп проверку загрузки и стрелочную функцию, потому что без них проект 50/50 ломается
$(document).ready(() => {
    /**
     * Добавление фотографий в галерею
     */
    const images = [
        'https://media1.tenor.com/m/LNFqGmG-wIMAAAAC/tomorrow-%D0%B7%D0%B0%D0%B2%D1%82%D1%80%D0%B0.gif',
        'https://media1.tenor.com/m/UMqiOqWh0moAAAAC/elephant-green.gif',
        'https://media1.tenor.com/m/iche4ijyDRUAAAAd/bayan.gif',

    ]; // не зависит от кол-ва слайдов, можно добавлять до бесконечности
    
    let currentIndex = 0;
    let slideshowInterval = 0;

    /**
     * Добавление новых фотографий в галерею ( в случае добавления )
     * показывающих текущее фото.
     * Берёт фото из @constant images
     */
    const updateGallery = () => {
        $('#currentImage').attr('src', images[currentIndex]);
        updateIndicator();
        updateButtons();
    };
    /**
     * Обновление и добавление индикатора текущего фото
     */
    const updateIndicator = () => {
        $('.indicator').empty();
        images.forEach((_, index) => {
            const dot = $('<span></span>').toggleClass('active', index === currentIndex);
            $('.indicator').append(dot);
        });
    };
    /**
     * Изменение статуса кнопок, позволяющее переводить их в неактивные режимы ( в дальнейшем полезно для :hover у кнопки )
     */
    const updateButtons = () => {
        $('#prevBtn').prop('disabled', currentIndex === 0);
        $('#nextBtn').prop('disabled', currentIndex === images.length - 1);
    };
     /**
     * Клик на кнопку, мотающую назад
     */
    $('#prevBtn').click(() => {
        if (currentIndex > 0) {
            currentIndex--;
            updateGallery();
        }
    });
    /**
     * Клик на кнопку, мотающую вперёд
     */
    $('#nextBtn').click(() => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateGallery();
        }
    });
    /**
     * Кнопка запуска слайд-шоу
     */
    $('#toggleSlideshow').click(() => {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
            slideshowInterval = 0;
            $('#toggleSlideshow').text(' Play');
            $('#toggleSlideshow').removeClass('fa-solid fa-pause');
            $('#toggleSlideshow').toggleClass('fa-solid fa-play');
        } else {
            $('#toggleSlideshow').text(' Stop');
            $('#toggleSlideshow').removeClass('fa-solid fa-play');
            $('#toggleSlideshow').toggleClass('fa-solid fa-pause');
            startSlideshow();
        }
    });

    /**
     * Слайд-шоу
     * 
     */
    const startSlideshow = () => {
        slideshowInterval = setInterval(() => {
            if (currentIndex < images.length - 1) {
                currentIndex++;
                updateGallery();
            } else {
                clearInterval(slideshowInterval);
                slideshowInterval = 0;
                $('#toggleSlideshow').text(' Play');
                $('#toggleSlideshow').removeClass('fa-solid fa-pause');
                $('#toggleSlideshow').toggleClass('fa-solid fa-play');
            }
        }, 1000);
    };
    /**
     * Кнопка запуска полноэкранного режима ( EXPAND ).
     */
    $('#toggleFullscreen').click(() => {
        const isFullscreen = document.fullscreenElement;
        if (isFullscreen) {
            document.exitFullscreen();
            $('#toggleFullscreen').text(' Expand');
            $('#toggleFullscreen').removeClass('fa-solid fa-down-left-and-up-right-to-center');
            $('#toggleFullscreen').toggleClass('fa-solid fa-expand')
        } else {
            document.documentElement.requestFullscreen();
            $('#toggleFullscreen').text(' Dexpand');
            $('#toggleFullscreen').removeClass('fa-solid fa-expand');
            $('#toggleFullscreen').toggleClass('fa-solid fa-down-left-and-up-right-to-center')
        }
    });
    // вызов галереи
    updateGallery();
});
