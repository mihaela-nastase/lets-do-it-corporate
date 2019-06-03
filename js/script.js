var navbarToggler = document.querySelector('.navbar-toggler');
var main = document.querySelector('main');
var navDrawer = document.querySelector('#navbarSupportedContent');
var navList = document.querySelector('#nav-list');
var loginButton = document.querySelector('.login-btn ');
var loginForm = document.querySelector('.login-form');
var loginFormCloseBtn = document.querySelector('#close-btn');
var counters = document.querySelectorAll('.counter');
var logoImage = document.querySelector('.LDIR-icon');
var logoText = document.querySelector('.logo-text');
var header = document.querySelector('#header');

// helper functions
function containsClass(el, className) {
  return el.classList.contains(className);
}
function toggleOn(el, className) {
  return containsClass(el, className) ? '' : el.classList.toggle(className);
}
function toggleOff(el, className) {
  return !containsClass(el, className) ? '' : el.classList.toggle(className);
}
function toggleOnOff(el, className, onOrOff) {
  if (onOrOff === 'on') toggleOn(el, className);
  else if (onOrOff === 'off') toggleOff(el, className);
}


/*Hide/Show header on scroll down/up using pure javascript (I made some changes)
  source: https://www.sysleaf.com/js-toggle-header-on-scroll/
*/

var lastKnownScrollY = 0;
var currentScrollY = 0;
var ticking = false;
var idOfHeader = 'header';
var eleHeader = null;
var logo = null;

const classes = {
  pinned: 'header-pin',
  unpinned: 'header-unpin',
  fixed: 'header-fixed',
  transform: 'header-transform',
};

const { pinned, unpinned, fixed, transform } = classes; // destructuring

function onScroll() {
  currentScrollY = window.pageYOffset;
  requestTick();
}
function requestTick() {
  if (!ticking) {
    requestAnimationFrame(update);
  }
  ticking = true;
}
function update() {
  if (currentScrollY === 0) release();
  else if (currentScrollY < lastKnownScrollY && !containsClass(navDrawer, 'open')) {
    pin();
  } else if (currentScrollY > lastKnownScrollY && !containsClass(navDrawer, 'open')) {
    unpin();
  }
  lastKnownScrollY = currentScrollY;
  ticking = false;
}

function pin() {
  if (!containsClass(eleHeader, pinned) && currentScrollY > 110) {
	toggleOff(eleHeader, unpinned);
    toggleOn(eleHeader, pinned);
  }
}
function unpin() {
  if (!containsClass(eleHeader, unpinned) && currentScrollY > 110) {
    toggleOff(eleHeader, pinned);
    toggleOn(eleHeader, unpinned);

    setTimeout(function() {
	  return (containsClass(eleHeader, unpinned) || containsClass(eleHeader, pinned)) ? toggleOn(eleHeader, transform) : '' ;
	},1000);
  }
}
function release() {
  if (containsClass(eleHeader, pinned) || containsClass(eleHeader, unpinned)) {
	toggleOff(eleHeader, transform);
	toggleOff(eleHeader, pinned);
	toggleOff(eleHeader, unpinned);
  }
}

window.onload = function() {
  eleHeader = document.getElementById(idOfHeader);
  logo = document.querySelector('.logo-text');
  document.addEventListener('scroll', onScroll, false);
}


/* menu button */

toggleOn(navList, 'no-opacity');

// open menu
navbarToggler.addEventListener('click', function(e) {
  toggleOn(navbarToggler, 'disable-clicks');
  // animate drawer
  toggleOn(navDrawer, 'transform');

  setTimeout(function() {

    // change menu button icon
    navbarToggler.classList.toggle('fa-times');
    navbarToggler.classList.toggle('fa-bars');
    toggleOff(navDrawer, 'transform');

  },250);

  // reveal the menu items
  setTimeout(function() {
    if (!containsClass(navDrawer, 'open')) toggleOn(navList, 'no-opacity');
    else toggleOff(navList, 'no-opacity');
  },550);

  navDrawer.classList.toggle('open');

  if (!containsClass(navDrawer, 'open')) {
      setTimeout(function() {
		toggleOff(eleHeader, fixed);
	  },300);
  }
  else if (containsClass(navDrawer, 'open')) toggleOn(eleHeader, fixed);

  toggleOff(navbarToggler, 'disable-clicks'); 
  e.stopPropagation();
});

// helper function
function closeMenu() {
  toggleOn(navDrawer, 'close');
  toggleOn(navbarToggler, 'fa-bars');
  toggleOff(navbarToggler, 'fa-times');
}
function closeLoginForm() {
  toggleOn(loginForm, 'close-login');
}

loginButton.addEventListener('click', function(e) {
  loginForm.classList.toggle('close-login');
  // close the menu when clicking on the login button
  e.stopPropagation();
  closeMenu();
});

loginFormCloseBtn.addEventListener('click', function(e) {
  closeLoginForm();
  e.stopPropagation();
});

// close the menu when clicking on the main content
main.addEventListener('click', function() {
  closeMenu();
  closeLoginForm();
});


// change logo text when hovering over the icon with faces
logoImage.addEventListener('mouseover', function(e) {
  toggleOn(logoText, 'logo-change');
});
logoImage.addEventListener('mouseout', function(e) {
  toggleOff(logoText, 'logo-change');
});


/* counter */
const startCounter = (counter) => {
  let maxNum = Number(counter.innerHTML);
  let dividend = 30;
  let i = 0;
  const count = () => {
    if ( i < maxNum ) {
      i += maxNum / dividend;
	  if ( i > maxNum ) i = maxNum;
	  counter.innerHTML = i.toFixed(0);
	  if (i === maxNum) clearInterval();
	}
  }
  setInterval(count, 70);
}

/* Not doing anything currently */
var counterContainer = document.querySelector('.impact');
var counterPosition = window.pageYOffset || document.documentElement.counterContainer;
console.log(counterContainer);
console.log(counterPosition);

for (counter of counters) {
  startCounter(counter);
}