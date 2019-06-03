let photoModalRoot = document.querySelector('#photo-modal-root');
let modalImg = document.querySelector('.photo-modal-img');
let arrowRight = document.querySelector('#arrow-right');
let arrowLeft = document.querySelector('#arrow-left');
let photoCloseBtn = document.querySelector('#close-photo-modal-btn');


document.onkeydown = function(evt) {
  evt = evt || window.event;
  console.log(evt.key);
  console.log(evt);
  var isEscape = false;
  var isLeft = false;
  var isRight = false;

  if ("key" in evt) {

    switch (evt.key) {
      case 'Escape':
      case 'Esc':
        isEscape = true;
		break;
      case 'ArrowLeft':
        isLeft = true;
		break;
      case 'ArrowRight':
        isRight = true;
		break;
      // extra safeguard
      default:
        switch (evt.keyCode) {
          case 27:
            isEscape = true;
            break;
          case 37:
	        isLeft = true;
            break;
	      case 39:
            isRight = true;
            break;
	    };
        break;
	}
  }
  let photoModalOpened = (containsClass(photoModalRoot, 'display-block'));

  if (isEscape) {
    if (photoModalOpened) photoCloseBtn.click();
  }
  else if (isLeft) {
	if (photoModalOpened) arrowLeft.click();
  }
  else if (isRight) {
	if (photoModalOpened) arrowRight.click();
  }
};


/* Modal with photos */

let photos = document.querySelectorAll('.activity-photo');
console.log(photos);
let currentPhotoIndex;

const photographLarge = (photo) => {
  const { src, alt } = photo;
  return src.slice(0, -10) + src.slice(-4);
}

for (let j = 0; j < photos.length; j++) {
  photos[j].addEventListener('click', function(e) {
	  e.stopPropagation();
	  console.log('a photo was clicked');
	  //photoModalRoot.style.display = "block";
	  toggleOn(photoModalRoot, 'display-block');
	  modalImg.src = photographLarge(photos[j]);
	  currentPhotoIndex = j;
  });
}

arrowRight.addEventListener('click', function(e) {
  e.stopPropagation();
  let nextIndex = (currentPhotoIndex + 1) % photos.length;
  let nextPhoto = photos[nextIndex];
  nextPhoto.click();
});
arrowLeft.addEventListener('click', function(e) {
  e.stopPropagation();
  let previousIndex = (currentPhotoIndex - 1) % photos.length;
  if (previousIndex < 0) previousIndex = photos.length - 1;	  
  let previousPhoto = photos[previousIndex];
  previousPhoto.click();
});


photoCloseBtn.addEventListener('click', function(e) {
  //photoModalRoot.style.display = "none";
  toggleOff(photoModalRoot, 'display-block');
});

//When the user clicks anywhere outside of the modal, close it
photoModalRoot.addEventListener('click', function(e) {
  //photoModalRoot.style.display = "none";
  photoCloseBtn.click();
});


