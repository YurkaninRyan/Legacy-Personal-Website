function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        (new Image()).src = this;
    });
}