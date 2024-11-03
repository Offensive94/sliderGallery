// решил использовать доп проверку загрузки и стрелочную функцию, потому что без них проект 50/50 ломается
$(document).ready(() => {
    /**
     * Добавление фотографий в галерею
     */
    const images = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYoVDqALvoJ-bQe3SXJoyb0K0CtnDoFZWyAg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2tq-P8h5UeAsqHlZ4RdQ28NfDdCHv7N-rHQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSxWSk8l2owxF5ix5FmRdIfF-zLeLYNutVhg&s',
        'https://img.freepik.com/free-photo/view-adorable-persian-domestic-cat_23-2151773881.jpg',
        'https://натуралка.рф/files/products/517676504.800x600w.jpg?4fcb562f5f68b37faef6260850cf6c2f',

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
