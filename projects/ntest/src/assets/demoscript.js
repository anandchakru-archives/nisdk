var htmlStyle = document.querySelector('html').style;
var bgPhoto = document.querySelector('#nlib-r-bg-photo');
var bgPhotoSrc = bgPhoto && 'url(\'' + bgPhoto.getAttribute('src') + '\')';
if (bgPhotoSrc) {
  htmlStyle.backgroundImage = bgPhotoSrc;
  htmlStyle.backgroundPosition = 'center center';
  htmlStyle.backgroundRepeat = 'no-repeat';
  htmlStyle.backgroundAttachment = 'fixed';
  htmlStyle.backgroundSize = 'cover';
}