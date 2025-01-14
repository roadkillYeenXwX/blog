// Drop down menu 

/* Assign event listener to the drop down menu button, hide
drop down menu by clicking on blog article*/

(() => {
  const menuButton = document.getElementById('menuButton');
  const menuButtonSvg = document.getElementById('menuButtonSvg');
  menuButton.addEventListener('click', function() {
    const style = getComputedStyle(dropDownMenu)
    const display = style.display;
    if (display === 'none') {
      dropDownMenu.style.display = 'flex';
      menuButtonSvg.style.transform = 'rotate(90deg)';
    } else {
      dropDownMenu.style.display = 'none';
      menuButtonSvg.style.transform = 'rotate(0deg)';
    }
    searchResultsContainer.style.display = 'none';
  });
  const articleContainer = document.getElementById('articleContainer');
  articleContainer.addEventListener('click', function(e) {
    if (!e.target.classList.contains('articleTag')) {
      dropDownMenu.style.display = 'none';
      menuButtonSvg.style.transform = 'rotate(0deg)';
      searchResultsContainer.style.display = 'none';
    }
  });
})();

// Scroll to the top button

/* Use Intersection Observer API to make the scroll to the top button
  appear when reaching the bottom of the page, Pass scrollTo method to
  addEventListener to enable scrolling to the top of the page on button
  click */

function backToTheTop(button) {
  const rootElement = document.documentElement;
  button.addEventListener("click", function() {
    rootElement.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

function toTheTop() {
  const rootElement = document.documentElement;
    rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

(() => {
  const target = document.querySelector('.footer');
  const backToTheTopButton = document.getElementById('backToTheTopButton');
  function callback(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        backToTheTopButton.style.opacity = '1'
      } else {
        backToTheTopButton.style.opacity = '0'
      }
    });
  }
  const observer = new IntersectionObserver(callback);
  observer.observe(target);
  backToTheTop(backToTheTopButton);
})();

// Dark/light mode toggle button

/* Toggle classes to animate buttons and change web page color scheme.
 Use local storage to save theme preference, on page open adjust button 
 animation based on preferred theme. For the first page visit set preferred
 preferred theme according to OS settings. */

(() => {
  if (window.localStorage.length === 0 && window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches) {
        localStorage.setItem('preferredTheme', 'dark');
  }

  const preferredTheme = localStorage.getItem('preferredTheme');
  if (preferredTheme === 'dark') {
    document.getElementById("moonLogo").classList.toggle("moonLogoDark");
    document.getElementById("sunLogo").classList.toggle("sunLogoDark");
    document.querySelector(":root").classList.toggle("dark");
  }

  document.getElementById("darkModeButtonContainer"
    ).addEventListener("click", () => {
    document.querySelector("body").style.transition = 'background-color 1s';
    document.getElementById("moonLogo").style.transition = 'all 1s ease-out';
    document.getElementById("sunLogo").style.transition = 'all 1s ease-out';
    const moon = document.getElementById("moonLogo");
    if (preferredTheme === 'dark') {
      document.getElementById("sunLogo").classList.toggle("sunLogoAnimateDark");
      moon.classList.toggle("moonLogoAnimateDark");
      document.querySelector(":root").classList.toggle("dark");
    } else {
    document.getElementById("sunLogo").classList.toggle("sunLogoAnimate");
    moon.classList.toggle("moonLogoAnimate");
    document.querySelector(":root").classList.toggle("dark");
    }
    const style = getComputedStyle(moon)
    const opacity = style.opacity;
    if (opacity === '0') {
      localStorage.setItem('preferredTheme', 'dark');
    } else {
      localStorage.setItem('preferredTheme', 'light');
    }
  });
})();

/* make the inserted text pages blink by delaying disabling the animation 
property of the display div with setTimeout() method */

function textBlink() {
  articleContainer.style.animation = 'blinkingText 0.1s infinite';
  setTimeout(function () {
    articleContainer.style.animation = 'none';
  }, 100);
}

// blog cms

/* use array of object to store blog content, implement client side router 
   using hashes */

(() => {
  const pfp = `<svg id="authorsPfp" width="3rem"
    height="3rem" viewBox="0 0 4 4"> <circle id="path354" 
    cx="2" cy="2" r="1.8877"/></svg>`
  const aboutThisBlog =
    `
    <svg id="aboutThisBlogImage" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><rect x="0" y="0" width="400" height="400" fill="#000000"></rect><g fill="#6d88ff"><path d="M0 -7.6L1.7 -2.3L7.2 -2.3L2.7 0.9L4.4 6.1L0 2.9L-4.4 6.1L-2.7 0.9L-7.2 -2.3L-1.7 -2.3Z" transform="translate(183 317)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(362 397)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(170 144)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(239 294)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(143 252)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(83 212)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(130 174)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(336 27)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(69 2)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(278 69)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(134 364)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(384 84)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(7 357)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(366 35)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(291 222)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(47 164)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(237 88)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(258 318)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(19 318)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(354 378)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(16 1)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(77 74)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(330 212)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(101 224)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(32 71)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(208 279)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(224 68)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(93 162)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(352 248)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(328 305)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(331 81)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(207 66)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(347 265)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(15 105)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(83 99)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(126 98)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(301 179)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(146 30)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(9 276)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(96 377)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(273 138)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(279 233)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(385 32)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(61 115)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(135 54)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(278 107)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(179 376)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(278 168)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(47 371)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(113 308)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(203 154)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(295 134)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(216 147)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(41 187)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(226 273)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(164 307)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(59 185)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(221 114)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(61 28)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(54 142)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(362 267)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(356 119)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(271 249)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(144 215)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(115 36)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(381 179)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(340 194)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(102 92)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(99 54)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(356 230)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(258 159)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(320 276)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(392 277)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(156 138)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(228 220)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(335 389)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(389 381)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(335 178)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(328 329)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(366 332)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(272 43)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(84 58)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(330 255)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(152 89)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(311 88)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(252 92)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(230 341)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(269 361)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(396 195)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(337 278)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(161 224)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(207 87)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(291 323)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(286 398)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(20 347)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(348 213)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(226 46)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(330 123)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(134 70)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(380 361)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(325 378)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(114 146)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(36 14)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(102 14)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(145 399)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(212 376)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(247 357)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(20 371)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(166 34)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(108 119)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(387 318)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(113 393)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(100 195)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(359 69)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(279 16)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(182 117)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(45 356)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(128 127)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(246 112)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(383 221)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(84 125)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(77 376)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(53 277)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(359 200)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(143 112)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(385 9)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(399 26)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(147 332)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(178 347)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(312 198)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(374 250)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(205 337)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(170 269)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(130 328)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(187 333)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(173 208)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(116 224)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(214 197)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(93 142)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(247 72)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(185 297)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(398 264)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(293 351)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(236 368)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(54 331)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(68 135)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(234 9)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(254 382)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(313 360)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(99 256)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(334 346)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(212 19)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(49 298)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(265 125)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(138 386)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(384 237)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(369 8)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(167 325)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(390 128)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(30 361)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(63 253)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(36 238)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(344 60)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(183 12)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(382 396)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(252 237)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(200 37)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(46 86)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(149 67)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(201 180)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(227 181)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(207 316)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(31 39)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(297 249)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(239 160)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(7 165)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(353 359)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(66 322)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(12 28)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(354 157)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(32 219)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(170 94)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(187 256)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(62 397)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(252 218)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(103 281)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(34 305)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(311 333)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(53 213)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(122 201)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(57 58)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(232 239)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(308 46)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(294 149)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(241 313)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(365 292)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(77 19)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(120 294)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(219 293)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(320 155)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(169 237)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(291 82)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(251 18)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(148 289)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(300 7)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(220 132)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(110 266)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(245 200)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(67 342)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(84 271)"></path><path d="M0 -1.9L0.4 -0.6L1.8 -0.6L0.7 0.2L1.1 1.5L0 0.7L-1.1 1.5L-0.7 0.2L-1.8 -0.6L-0.4 -0.6Z" transform="translate(17 386)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(388 144)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(21 298)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(293 200)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(324 242)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(18 65)"></path><path d="M0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0L0 0Z" transform="translate(11 190)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(336 109)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(244 264)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(74 228)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(37 119)"></path><path d="M0 -5.7L1.3 -1.7L5.4 -1.7L2.1 0.7L3.3 4.6L0 2.2L-3.3 4.6L-2.1 0.7L-5.4 -1.7L-1.3 -1.7Z" transform="translate(171 185)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(130 237)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(318 60)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(386 65)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(53 231)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(63 360)"></path><path d="M0 -4.7L1.1 -1.5L4.5 -1.5L1.7 0.6L2.8 3.8L0 1.8L-2.8 3.8L-1.7 0.6L-4.5 -1.5L-1.1 -1.5Z" transform="translate(86 362)"></path><path d="M0 -0.9L0.2 -0.3L0.9 -0.3L0.3 0.1L0.6 0.8L0 0.4L-0.6 0.8L-0.3 0.1L-0.9 -0.3L-0.2 -0.3Z" transform="translate(288 380)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(259 303)"></path><path d="M0 -2.8L0.6 -0.9L2.7 -0.9L1 0.3L1.7 2.3L0 1.1L-1.7 2.3L-1 0.3L-2.7 -0.9L-0.6 -0.9Z" transform="translate(305 268)"></path><path d="M0 -3.8L0.8 -1.2L3.6 -1.2L1.4 0.4L2.2 3.1L0 1.4L-2.2 3.1L-1.4 0.4L-3.6 -1.2L-0.8 -1.2Z" transform="translate(172 169)"></path></g></svg>
    <h1>About this blog</h1>
    <p>Howl on top of tall thing mesmerizing birds. Love blinks and
    purr purr purr purr yawn howl on top of tall thing meowing non
    stop for food for caticus cuteicus, so spread kitty litter all
    over house yet catty ipsum. I shredded your linens for you. Love
    to play with owner's hair tie you are a captive audience while
    sitting on the toilet, pet me. I show my fluffy belly but it's a
    trap! if you pet it i will tear up your hand. Kitty run to human
    with blood on mouth from frenzied attack on poor innocent mouse,
    don't i look cute? steal mom's crouton while she is in the bathroom
    and destroy house in 5 seconds, yet poop in litter box, scratch the
    walls and cat dog hate mouse eat string barf pillow no baths hate
    everything. Cough. Kick up litter kitty power. Run in circles hiding
    behind the couch until lured out by a feathery toy but be superior
    but roll on the floor purring your whiskers off for chase little red
    dot someday it will be mine!. Immediately regret falling into bathtub
    put toy mouse in food bowl run out of litter box at full speed.</p>
    <div class="line"></div>`;
  const articles = [
    {
      'headline': 'Spill litter box, destroy all furniture',

      'date': '09-17-2022',

      'name': "Author's name",

      'tag': "#catIpsum #test",

      'hash': '#/SpillLitterBoxDestroyAllFurniture',

      'body': `<div class="authorsInfo">${pfp}
      <div class="nameDate">
        <div class="authorsName">Author's name</div>
        <date class="publishingDate" datetime="09-17-2022">
        Published on 09-17-2022</date>
      </div>
    </div>
    <div class="tagContainer">
      <h2 class="articleTag">#catIpsum</h2>
      <h2 class="articleTag">#test</h2>
    </div>
    <h1>Spill litter box, destroy all furniture</h1>
    <img class="image" src="http://placekitten.com/670/300" alt="placeholder"/>
    <p>
      Check cat door for ambush 10 times before 
      coming in, lick plastic bags or eat and than sleep on your face. 
      Scratch the postman wake up lick paw wake up owner meow meow when in 
      doubt, wash, or funny little cat chirrup noise shaking upright tail 
      when standing next to you snob you for another person yet eat all the 
      power cords or twitch tail in permanent irritation run in circles.
    </p>
    <p> 
      Mesmerizing birds eat a plant, kill a hand for scream for no reason at 
      4 am yet playing with balls of wool, lies down climb a tree, wait for a 
      fireman jump to fireman then scratch his face and give me attention or 
      face the wrath of my claws. Flee in terror at cucumber discovered on 
      floor pounce on unsuspecting person cough furball into food bowl then 
      scratch owner for a new one always ensure to lay down in such a manner 
      that tail can lightly brush human's nose give me attention or face the 
      wrath of my claws so find something else more interesting. Run as fast 
      as i can into another room for no reason just going to dip my paw in 
      your coffee and do a taste test - oh never mind i forgot i don't like 
      coffee - you can have that back now but pelt around the house and up 
      and down stairs chasing phantoms.
    </p>
    <p> 
      Meow going to catch the red dot today 
      going to catch the red dot today and this cat happen now, it was too 
      purr-fect!!!. Swat at dog. Oooo! dangly balls! jump swat swing flies 
      so sweetly to the floor crash move on wash belly nap push your water 
      glass on the floor refuse to leave cardboard box. Rub my belly hiss if 
      it fits, i sits for purr like an angel run around the house at 4 in the 
      morning for cat is love, cat is life. Rub whiskers on bare skin act 
      innocent pretend you want to go out but then don't or scratch leg; meow 
      for can opener to feed me. Catch eat throw up catch eat throw up bad 
      birds. Climb leg why dog in house? i'm the sole ruler of this home and 
      its inhabitants smelly, stupid dogs, inferior furballs time for 
      night-hunt, human freakout or love you, then bite you and waffles 
      cat fur is the new black.
    </p>
    <div class="line"></div>
    <h3>Paragraph heading</h3>
    <p>
      Purr when being pet poop on grasses for sleep everywhere, but not in my 
      bed, if it fits i sits, eat the fat cats food, jump up to edge of bath, 
      fall in then scramble in a mad panic to get out being gorgeous with belly 
      side up. Look at dog hiiiiiisssss brown cats with pink ears my water bowl 
      is clean and freshly replenished, so i'll drink from the toilet take a big 
      fluffing crap ðŸ’©. Slap kitten brother with paw rub face on owner floof tum, 
      tickle bum, jellybean footies curly toes found somthing move i bite it tail 
      for purr for no reason.
    </p>
    <p>
      If it fits, i sits catch small lizards, bring them 
      into house, then unable to find them on carpet or get video posted to internet 
      for chasing red dot. Destroy dog burrow under covers scratch the postman wake 
      up lick paw wake up owner meow meow and destroy house in 5 seconds. See owner, 
      run in terror roll over and sun my belly attempt to leap between furniture but 
      woefully miscalibrate and bellyflop onto the floor; what's your problem? i meant 
      to do that now i shall wash myself intently, but chase little red dot someday it 
      will be mine! but sit by the fire stare out cat door then go back inside for 
      morning beauty routine of licking self. 
    </p>
    <p> 
      Intrigued by the shower pet my belly, 
      you know you want to; seize the hand and shred it! jump launch to pounce upon 
      little yarn mouse, bare fangs at toy run hide in litter box until treats are fed 
      but scamper i is playing on your console hooman. I am the best spend all night 
      ensuring people don't sleep sleep all day yet curl into a furry donut so leave 
      buried treasure in the sandbox for the toddlers or sit on human they not getting 
      up ever ask for petting groom yourself 4 hours - checked, have your beauty sleep 
      18 hours - checked, be fabulous for the rest of the day - checked.
    </p>
    <div class="line"></div>
    <h3>Paragraph heading</h3>
    <p>
      Meow meow you are my owner so here is a dead rat scratch at door to be let outside, 
      get let out then scratch at door immmediately after to be let back in, need to chase 
      tail this human feeds me, i should be a god cat meoooow i iz master of hoomaan, not 
      hoomaan master of i, oooh damn dat dog, for rub my belly hiss. Eats owners hair then 
      claws head bawl under human beds for human is in bath tub, emergency! drowning! 
      meooowww!, and scratch leg; meow for can opener to feed me. Am in trouble, roll over, 
      too cute for human to get mad wake up human for food at 4am. Touch water with paw 
      then recoil in horror scratch so owner bleeds yet murr i hate humans they are so 
      annoying stare out the window for kitty kitty.
    </p>
    <p> 
      I shall purr myself to sleep pushes 
      butt to face so my cat stared at me he was sipping his tea, too chill on the couch 
      table. Chase mice sugar, my siamese, stalks me (in a good way), day and night . 
      Intently stare at the same spot carrying out surveillance on the neighbour's dog. 
      Stares at human while pushing stuff off a table bury the poop bury it deep refuse 
      to leave cardboard box have a lot of grump in yourself because you can't forget 
      to be grumpy and not be like king grumpy cat but woops poop hanging from butt must 
      get rid run run around house drag poop on floor maybe it comes off woops left brown 
      marks on floor human slave clean lick butt now. Tuxedo cats always looking dapper 
      purr for no reason. Catching very fast laser pointer hide from vacuum cleaner decide 
      to want nothing to do with my owner today scratch leg; meow for can opener to feed 
      me fall over dead (not really but gets sypathy). Milk the cow scratch so owner bleeds. 
      Eat a plant, kill a hand.
    </p>
    <div class="line"></div>`
    },

    {
      'headline': 'Freak human out make funny noise mow mow mow mow mow mow success now attack human',

      'date': '10-10-2022',

      'name': "Author's name",

      'tag': '#catIpsum #test',

      'hash': '#/FreakHumanOutMakeFunnyNoiseMowMowMowMowMowMowSuccessNowAttackHuman',

      'body': `<div class="authorsInfo">${pfp}
      <div class="nameDate">
        <div class="authorsName">Author's name</div>
        <date class="publishingDate" datetime="10-10-2022">
        Published on 10-10-2022</date>
      </div>
    </div>
    <div class="tagContainer">
      <h2 class="articleTag">#catIpsum</h2>
      <h2 class="articleTag">#test</h2>
    </div>
    <h1>Freak human out make funny noise mow mow mow mow mow mow success now attack human</h1>
    <img class="image" src="http://placekitten.com/700/420" alt="placeholder"/>
    <p>
      Lick human with sandpaper tongue. Drool thinking longingly about tuna brine.
      Found somthing move i bite it tail chase imaginary bugs give me attention or 
      face the wrath of my claws but reaches under door into adjacent room. Eat too 
      much then proceed to regurgitate all over living room carpet while humans eat 
      dinner attack curtains i will be pet i will be pet and then i will hiss. Spill 
      litter box, scratch at owner, destroy all furniture, especially couch sleep over 
      your phone and make cute snoring noises meow.
    </p>
    <p> 
      Stretch rub face on everything, for when owners are asleep, cry for no apparent 
      reason hunt anything yet meowwww. My water bowl is clean and freshly replenished, 
      so i'll drink from the toilet annoy kitten brother with poking gnaw the corn cob 
      allways wanting food meow meow chew foot.
    </p>
    <p> 
      Jump up to edge of bath, fall in then scramble in a mad panic to get out kitty 
      run to human with blood on mouth from frenzied attack on poor innocent mouse, 
      don't i look cute? get away from me stupid dog eat all the power cords plop down 
      in the middle where everybody walks. Show belly meow meow pee in shoe cat cat moo 
      moo lick ears lick paws, yet stretch out on bed but scratch at door to be let outside, 
      get let out then scratch at door immmediately after to be let back in 
      mmmmeeeeeoooowwww. Meow all night if human is on laptop sit on the 
      keyboard and i will be pet i will be pet and then i will hiss. Has closed eyes but still 
      sees you. Shred all toilet paper and spread around the house let me in let me out let me 
      in let me out let me in let me out who broke this door anyway yet get scared by sudden 
      appearance of cucumber for where is my slave? I'm getting hungry for why dog in house? 
      i'm the sole ruler of this home and its inhabitants smelly, stupid dogs, inferior furballs 
      time for night-hunt, human freakout and steal mom's crouton while she is in the bathroom for 
      if it fits i sits. Hiiiiiiiiii feed me now eat the rubberband for loves cheeseburgers ask to 
      go outside and ask to come inside and ask to go outside and ask to come inside. I vomit in 
      the bed in the middle of the night furball roll roll roll leave buried treasure in the sandbox 
      for the toddlers sugar, my siamese, stalks me (in a good way), day and night . 
      Cccccccccaaaaaaaaatttts.
    </p>
    <div class="line"></div>
    <h3>Paragraph heading</h3>
    <p>
      Intently sniff hand rub whiskers on bare skin act innocent. Meow meow we are 3 small kittens 
      sleeping most of our time, we are around 15 weeks old i think, i donâ€™t know i canâ€™t count. 
      Woops poop hanging from butt must get rid run run around house drag poop on floor maybe it comes 
      off woops left brown marks on floor human slave clean lick butt now mice but meow for cat mojo yet 
      sleep. Stare at wall turn and meow stare at wall some more meow again continue staring mice yet i 
      like cats because they are fat and fluffy annoy owner until he gives you food say meow repeatedly 
      until belly rubs, feels good yet lick arm hair yet i will ruin the couch with my claws. Fish i must 
      find my red catnip fishy fish litter kitter kitty litty little kitten big roar roar feed me. Cough 
      furball intently sniff hand. Then cats take over the world i cry and cry and cry unless you pet me, 
      and then maybe i cry just for fun touch my tail, i shred your hand purrrr tweeting a
    </p>
    <p>
      If it fits, i sits catch small lizards, bring them 
      into house, then unable to find them on carpet or get video posted to internet 
      for chasing red dot. Destroy dog burrow under covers scratch the postman wake 
      up lick paw wake up owner meow meow and destroy house in 5 seconds. See owner, 
      run in terror roll over and sun my belly attempt to leap between furniture but 
      woefully miscalibrate and bellyflop onto the floor; what's your problem? i meant 
      to do that now i shall wash myself intently, but chase little red dot someday it 
      will be mine! but sit by the fire stare out cat door then go back inside for 
      morning beauty routine of licking self. 
    </p>
    <p> 
      Intrigued by the shower pet my belly, 
      you know you want to; seize the hand and shred it! jump launch to pounce upon 
      little yarn mouse, bare fangs at toy run hide in litter box until treats are fed 
      but scamper i is playing on your console hooman. I am the best spend all night 
      ensuring people don't sleep sleep all day yet curl into a furry donut so leave 
      buried treasure in the sandbox for the toddlers or sit on human they not getting 
      up ever ask for petting groom yourself 4 hours - checked, have your beauty sleep 
      18 hours - checked, be fabulous for the rest of the day - checked.
    </p>
    <div class="line"></div>`
    },

    {
      'headline': 'Annoy owner until he gives you food say meow repeatedly until belly rubs, feels good',

      'date': '10-11-2022',

      'name': "Author's name",

      'tag': '#catIpsum #test',

      'hash': '#/AnnoyOwnerUntilHeGivesYouFoodSayMeowRepeatedlyUntilBellyRubsFeelsGood',

      'body': `<div class="authorsInfo">${pfp}
      <div class="nameDate">
        <div class="authorsName">Author's name</div>
        <date class="publishingDate" datetime="10-11-2022">
        Published on 10-11-2022</date>
      </div>
    </div>
    <div class="tagContainer">
      <h2 class="articleTag">#catIpsum</h2>
      <h2 class="articleTag">#test</h2>
    </div>
    <h1>Annoy owner until he gives you food say meow repeatedly until belly rubs, feels good</h1>
    <h3>Paragraph heading</h3>
    <p>
      Run as fast as i can into another room for no reason. Scratch me now! stop 
      scratching me! kitty. Curl into a furry donut purrr purr littel cat, little 
      cat purr purr, love and hack wack the mini furry mouse. Only use one corner 
      of the litter box grab pompom in mouth and put in water dish for kitty run 
      to human with blood on mouth from frenzied attack on poor innocent mouse, 
      don't i look cute? catching very fast laser pointer so there's a forty year 
      old lady there let us feast. Fat baby cat best buddy little guy dead stare 
      with ears cocked so catty ipsum, hunt by meowing loudly at 5am next to human 
      slave food dispenser run in circles. Human is behind a closed door, emergency! 
      abandoned! meeooowwww!!!. Trip on catnip pet me pet me don't pet me. Dont wait 
      for the storm to pass, dance in the rain push your water glass on the floor 
        asdflkjaertvlkjasntvkjn (sits on keyboard) but curl into a furry donut. Soft 
      kitty warm kitty little ball of furr morning beauty routine of licking self yet 
      pretend not to be evil miaow then turn around and show you my bum but i rule on 
      my back you rub my tummy i bite you hard. show belly waffles. Sit and stare is 
      good you understand your place in my world vommit food and eat it again, sniff 
      sniff yet climb a tree, wait for a fireman jump to fireman then scratch his face 
      or ooooh feather moving feather! so you call this cat food. I is playing on your 
      console hooman lick left leg for ninety minutes, still dirty chase mice. No, you 
      can't close the door, i haven't decided whether or not i wanna go out intrigued 
      by the shower, drink from the toilet.
    </p>
    <p> 
      If it fits, i sits what a cat-ass-trophy!. Rub my belly hiss need to chase tail 
      get poop stuck in paws jumping out of litter box and run around the house scream 
      meowing and smearing hot cat mud all over so eat a rug and furry furry hairs 
      everywhere oh no human coming lie on counter don't get off counter. Rub face on 
      owner i like big cats and i can not lie bleghbleghvomit my furball really tie the 
      room together yowling nonstop the whole night i shall purr myself to sleep for see 
      owner, run in terror. Proudly present butt to human munch, munch, chomp, chomp.
    </p>
    <p> 
      Who's the baby iâ€™m so hungry iâ€™m so hungry but ew not for that , so nya nya 
      nyan run in circles. Make muffins be a nyan cat, feel great about it, be annoying 
      24/7 poop rainbows in litter box all day or get poop stuck in paws jumping out of 
      litter box and run around the house scream meowing and smearing hot cat mud all over 
      it's 3am, time to create some chaos and my slave human didn't give me any food so i 
      pooped on the floor for eat my own ears attempt to leap between furniture but woefully 
      miscalibrate and bellyflop onto the floor; what's your problem? i meant to do that now i 
      shall wash myself intently. Plan steps for world domination if it fits i sits. Catch 
      small lizards, bring them into house, then unable to find them on carpet scratch so owner 
      bleeds. Tuxedo cats always looking dapper meow meow mama. Love and coo around boyfriend who 
      purrs and makes the perfect moonlight eyes so i can purr and swat the glittery gleaming yarn 
      to him (the yarn is from a $125 sweater) do i like standing on litter cuz i sits when i have 
      spaces, my cat buddies have no litter i live in luxury cat life. Purr pose purrfectly to 
      show my beauty please let me outside pouty face yay! wait, it's cold out please let me 
      inside pouty face oh, thank you rub against mommy's leg oh it looks so nice out, please let 
      me outside again the neighbor cat was mean to me please let me back inside or nyaa nyaa love 
      fish tuxedo cats always looking dapper.
    </p>
    <div class="line"></div>
    <img class="image" src="http://placekitten.com/600/600" alt="placeholder"/>
    <h3>Paragraph heading</h3>
    <p>
      Play riveting piece on synthesizer keyboard wake up wander around the house making large 
      amounts of noise jump on top of your human's bed and fall asleep again, meow go back to sleep 
      owner brings food and water tries to pet on head, so scratch get sprayed by water because bad 
      cat love to play with owner's hair tie but vommit food and eat it again for sniff sniff.
    </p>
    <div class="line"></div>`
    },

    {
      'headline': "Purr purr purr until owner pets why owner not pet me hiss scratch meow",

      'date': '10-12-2022',

      'name': "Author's name",

      'tag': '#catIpsum',

      'hash': '#/PurrPurrPurrUntilOwnerPetsWhyOwnerNotPetMeHissScratchMeow',

      'body': `<div class="authorsInfo">${pfp}
      <div class="nameDate">
        <div class="authorsName">Author's name</div>
        <div class="publishingDate" datetime="10-12-2022">
        Published on 10-12-2022</div>
      </div>
    </div>
    <div class="tagContainer">
      <h2 class="articleTag">#catIpsum</h2>
    </div>
    <h1>Purr purr purr until owner pets why owner not pet me hiss scratch meow</h1>
      <svg class="imageSvg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><rect width="400" height="400" fill="#000000"></rect><g><g transform="translate(197 84)"><path d="M0 -7.1L6.2 -3.6L6.2 3.6L0 7.1L-6.2 3.6L-6.2 -3.6Z" fill="#3aff9f"></path></g><g transform="translate(168 105)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(25 121)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(61 308)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(41 129)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(295 325)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(279 225)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(79 259)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(280 39)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(157 65)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(357 365)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(321 84)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(108 230)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(113 4)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(279 394)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(28 352)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(87 301)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(178 371)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(10 58)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(56 338)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(20 310)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(220 310)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(370 317)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(90 25)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(295 4)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(272 313)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(90 331)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(133 377)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(356 79)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(295 348)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(170 310)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(289 361)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(311 15)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(36 212)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(222 65)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(209 367)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(155 339)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(289 87)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(316 266)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(102 285)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(207 129)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(31 76)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(38 276)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(153 305)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(328 246)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(322 326)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(264 288)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(271 90)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(237 249)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(351 180)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(284 146)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(172 17)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(71 397)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(187 281)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(259 368)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(203 40)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(204 385)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(224 26)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(246 192)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(362 300)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(272 260)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(275 366)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(371 154)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(11 101)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(215 231)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(98 45)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(67 243)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(14 150)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(73 295)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(94 150)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(17 222)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(312 199)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(168 136)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(327 45)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(354 260)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(231 364)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(356 214)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(372 359)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(393 167)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(249 165)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(145 179)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(114 255)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(43 95)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(24 27)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(209 105)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(377 301)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(200 297)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(88 387)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(98 107)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(86 61)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(199 338)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(83 235)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(348 160)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(329 277)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(369 25)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(63 200)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(241 47)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(384 346)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(265 213)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(93 348)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(159 153)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(337 204)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(302 44)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(126 395)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(45 19)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(137 66)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(77 342)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(387 378)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(71 355)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(182 79)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(81 118)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(217 143)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(42 251)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(252 230)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(35 226)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(133 314)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(173 175)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(184 126)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(95 186)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(164 278)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(165 246)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(64 120)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(308 385)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(143 117)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(95 243)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(331 350)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(373 227)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(85 7)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(43 146)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(7 352)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(316 214)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(48 169)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(308 140)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(394 219)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(339 381)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(161 215)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(278 240)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(65 270)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(214 264)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(183 153)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(210 169)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(369 244)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(146 275)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(129 250)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(260 117)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(11 208)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(193 356)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(217 249)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(389 53)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(344 44)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(116 78)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(242 10)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(343 146)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(140 50)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(382 2)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(80 320)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(186 219)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(244 136)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(70 370)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(288 307)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(148 248)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(201 58)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(141 347)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(136 213)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(392 195)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(357 57)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(363 380)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(353 106)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(101 380)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(372 282)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(6 191)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(133 96)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(358 4)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(283 271)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(199 266)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(335 293)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(296 204)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(14 177)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(260 200)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(298 266)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(189 387)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(220 338)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(314 173)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(65 11)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(355 231)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(333 165)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(18 266)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(116 170)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(10 247)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(232 385)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(259 180)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(156 18)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(46 197)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(171 395)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(340 96)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(218 206)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(118 95)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(314 342)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(111 316)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(286 113)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(58 153)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(11 298)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(244 108)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(35 394)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(377 63)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(264 29)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(27 375)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(53 38)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(47 354)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(332 218)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(186 60)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(126 229)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(227 99)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(55 53)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(297 182)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(122 350)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(394 256)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(156 363)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(65 29)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(390 115)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(153 90)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(77 86)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(88 274)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(288 65)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(390 394)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(33 179)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(363 344)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(329 127)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(396 8)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(3 374)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(327 397)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(93 135)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(188 100)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(2 399)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(229 161)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(307 77)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(317 33)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(298 220)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(259 74)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(225 281)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(18 331)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(78 148)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(103 364)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(338 362)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(124 146)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(183 327)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(40 311)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(331 310)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(253 337)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(201 249)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(228 126)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(305 158)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(322 105)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(117 31)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(252 270)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(92 167)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(152 227)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(379 259)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(261 153)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(155 321)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(258 391)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(39 61)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(280 130)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(122 109)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(230 215)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(329 62)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(388 242)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(57 75)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(180 346)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(3 126)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(130 185)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(177 46)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(166 34)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(126 296)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(254 55)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(312 235)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(311 308)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(249 210)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(166 80)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(353 329)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(393 143)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(35 325)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(132 21)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(35 7)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(338 75)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(3 87)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(14 383)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(184 189)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(278 333)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(261 243)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(187 32)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(221 395)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(199 180)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(204 14)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(42 293)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(8 279)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(106 196)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(371 208)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(379 96)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(375 183)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(258 102)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(110 129)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(144 30)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(66 97)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(352 275)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(195 205)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(53 215)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(139 144)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(364 170)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(80 43)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(81 191)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(287 16)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(154 134)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(269 379)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(314 360)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(340 27)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(340 6)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(259 305)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(109 331)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(284 165)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(202 314)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(181 252)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(296 241)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(336 259)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(309 291)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(21 89)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(389 286)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(281 211)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(280 194)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(175 229)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(360 136)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(96 79)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(2 224)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(188 310)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(190 169)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(236 318)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(59 231)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(238 295)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(267 11)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(275 56)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(5 338)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(351 396)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(153 386)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(157 2)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(10 26)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(236 228)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(141 197)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(107 349)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(100 215)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(201 155)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(322 377)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(369 43)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(279 288)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(71 164)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(234 201)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(1 46)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(12 4)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(128 128)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(243 91)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(186 2)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(58 322)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(126 273)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(133 170)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(385 322)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(269 140)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(226 184)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(324 5)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(294 381)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(217 354)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(207 195)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(53 369)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(159 259)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(336 179)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(121 207)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(334 233)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(351 314)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(270 167)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(162 189)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(229 264)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(183 295)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(376 130)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(24 236)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(393 70)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(52 384)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(360 199)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(56 137)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(390 31)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(399 276)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(111 297)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(296 397)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(97 259)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(158 167)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(375 396)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(247 354)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(121 368)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(206 219)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(292 30)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(135 332)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(216 325)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(112 58)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(241 32)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(38 342)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(346 121)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(394 363)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(84 214)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(50 264)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(27 105)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(232 145)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(339 322)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(15 364)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(300 114)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(155 42)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(24 138)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(349 351)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(395 305)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(24 203)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(393 87)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(53 279)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(227 83)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(306 62)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(72 56)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(245 72)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(327 150)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(350 290)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(127 43)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(191 140)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(104 395)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(218 49)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(37 40)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(21 287)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(311 250)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(5 161)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(238 340)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(261 349)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(217 295)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(142 8)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(226 7)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(316 120)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(147 77)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(23 45)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(29 155)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(140 260)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(41 111)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(367 111)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(145 290)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(204 283)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(273 71)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(178 267)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(128 4)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(280 348)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(56 182)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(14 72)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(370 85)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(104 18)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(280 179)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(254 320)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(80 103)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(303 96)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(78 132)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(21 399)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(87 371)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(152 105)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(196 114)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(69 213)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(244 370)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(189 237)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(355 32)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(169 335)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(320 186)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(173 207)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(5 320)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(346 244)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(295 133)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(110 154)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(399 341)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(108 269)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(239 176)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(143 159)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(167 292)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(132 81)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(241 398)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(162 119)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(254 39)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(212 83)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(190 16)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(50 2)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(399 101)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(4 265)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(81 176)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(295 286)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(252 254)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(72 72)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(334 113)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(55 107)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(286 255)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(169 357)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(93 202)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(375 333)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(141 395)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(398 129)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(240 279)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(255 2)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(51 399)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(98 2)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(302 368)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(382 18)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(26 252)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(96 316)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(137 363)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(367 268)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(24 60)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(2 140)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(327 20)"><path d="M0 -3L2.6 -1.5L2.6 1.5L0 3L-2.6 1.5L-2.6 -1.5Z" fill="#3aff9f"></path></g><g transform="translate(194 372)"><path d="M0 0L0 0L0 0L0 0L0 0L0 0Z" fill="#3aff9f"></path></g><g transform="translate(165 378)"><path d="M0 -1L0.9 -0.5L0.9 0.5L0 1L-0.9 0.5L-0.9 -0.5Z" fill="#3aff9f"></path></g><g transform="translate(273 105)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(334 336)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(96 93)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(221 113)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(268 275)"><path d="M0 -6L5.2 -3L5.2 3L0 6L-5.2 3L-5.2 -3Z" fill="#3aff9f"></path></g><g transform="translate(399 322)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(172 67)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g><g transform="translate(116 384)"><path d="M0 -4L3.5 -2L3.5 2L0 4L-3.5 2L-3.5 -2Z" fill="#3aff9f"></path></g><g transform="translate(222 376)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(174 92)"><path d="M0 -5L4.3 -2.5L4.3 2.5L0 5L-4.3 2.5L-4.3 -2.5Z" fill="#3aff9f"></path></g><g transform="translate(58 294)"><path d="M0 -2L1.7 -1L1.7 1L0 2L-1.7 1L-1.7 -1Z" fill="#3aff9f"></path></g></g></svg>
    <p>
      toilet paper attack claws fluff everywhere meow miao french ciao litterbox it's 3am, time to create some chaos . Stand in doorway, unwilling to chose whether to stay in or go out attack like a vicious monster love fish. Purr pet right here, no not there, here, no fool, right here that other cat smells funny you should really give me all the treats because i smell the best and omg you finally got the right spot and i love you right now destroy the blinds. Pet me pet me pet me pet me, bite, scratch, why are you petting me plop down in the middle where everybody walks and flop over, for ask to go outside and ask to come inside and ask to go outside and ask to come inside fall asleep upside-down playing with balls of wool. Am in trouble, roll over, too cute for human to get mad groom yourself 4 hours - checked, have your beauty sleep 18 hours - checked, be fabulous for the rest of the day - checked and pooping rainbow while flying in a toasted bread costume in space stare out the window.
    </p>
    <p> 
      purr and touch my tail, i shred your hand purrrr and human is behind a closed door, emergency! abandoned! meeooowwww!!!. Meow chase after silly colored fish toys around the house growl at dogs in my sleep cat meoooow i iz master of hoomaan, not hoomaan master of i, oooh damn dat dog. Eats owners hair then claws head walk on a keyboard and humans,humans, humans oh how much they love us felines we are the center of attention they feed, they clean tickle my belly at your own peril i will pester for food when you're in the kitchen even if it's salad jump off balcony, onto stranger's head. Knock over christmas tree freak human out make funny noise mow mow mow mow mow mow success now attack human. Stare at ceiling light favor packaging over toy or stand in doorway, unwilling to chose whether to stay in or go out or sit as close as possible to warm fire without sitting on cold floor for scratch me there, elevator butt. My slave human didn't give me any food so i pooped on the floor sit on human they not getting up ever cat playing a fiddle in hey diddle diddle? so gnaw the corn cob. Who's the baby snob you for another person get scared by doggo also cucumerro and eat my own ears, and walk on car leaving trail of paw prints on hood and windshield and to pet a cat, rub its belly, endure blood and agony, quietly weep, keep rubbing belly. Hunt by meowing loudly at 5am next to human slave food dispenser cats are cute but chase ball of string scratch for catasstrophe so asdflkjaertvlkjasntvkjn (sits on keyboard). Cats woo swipe at owner's legs or cats go for world domination so paw at your fat belly cat sit like bread. I vomit in the bed in the middle of the night. Twitch tail in permanent irritation waffles, man running from cops stops to pet cats, goes to jail.
    </p>
    <div class="line"></div>
    <h3>Paragraph heading</h3>
    <p>
      What a cat-ass-trophy! all of a sudden cat goes crazy. Ask for petting human is washing you why halp oh the horror flee scratch hiss bite for growl at dogs in my sleep, for sniff all the things. Bury the poop bury it deep refuse to drink water except out of someone's glass or cats secretly make all the worlds muffins so playing with balls of wool paw at your fat belly sniff catnip and act crazy so annoy owner until he gives you food say meow repeatedly until belly rubs, feels good. To pet a cat, rub its belly, endure blood and agony, quietly weep, keep rubbing belly plays league of legends i cry and cry and cry unless you pet me, and then maybe i cry just for fun immediately regret falling into bathtub or scratch the postman wake up lick paw wake up owner meow meow making bread on the bathrobe hunt by meowing loudly at 5am next to human slave food dispenser.
    </p>
    <p>
      Dead stare with ears cocked playing with balls of wool, so scratch my tummy actually i hate you now fight me russian blue as lick i the shoes. Destroy couch as revenge hiss at vacuum cleaner or slap owner's face at 5am until human fills food dish gimme attention gimme attention gimme attention gimme attention gimme attention gimme attention just kidding i don't want it anymore meow bye and good now the other hand, too sleeps on my head. Meow meow, i tell my human lick the curtain just to be annoying. Walk on car leaving trail of paw prints on hood and windshield lick butt and make a weird face lounge in doorway wack the mini furry mouse for stare out the window immediately regret falling into bathtub. Russian blue climb into cupboard and lick the salt off rice cakes so sleep yet wack the mini furry mouse yet stare at the wall, play with food and get confused by dust swipe at owner's legs. Murr i hate humans they are so annoying destroy couch as revenge meow for food, then when human fills food dish, take a few bites of food and continue meowing pet me pet me don't pet me just going to dip my paw in your coffee and do a taste test - oh never mind i forgot i don't like coffee - you can have that back now really likes hummus why can't i catch that stupid red dot.
    </p>
    <p> 
      Have my breakfast spaghetti yarn push your water glass on the floor adventure always but sleep on dog bed, force dog to sleep on floor. Scratch at door to be let outside, get let out then scratch at door immmediately after to be let back in kitty pounce, trip, faceplant you didn't see that no you didn't definitely didn't lick, lick, lick, and preen away the embarrassment. See brother cat receive pets, attack out of jealousy. Poop on couch under the bed, for there's a forty year old lady there let us feast purr like a car engine oh yes, there is my human slave woman she does best pats ever that all i like about her hiss meow . Play riveting piece on synthesizer keyboard purr while eating paw at your fat belly tweeting a baseball sit and stare. Stand with legs in litter box, but poop outside ooh, are those your $250 dollar sandals? lemme use that as my litter box touch my tail, i shred your hand purrrr or curl up and sleep on the freshly laundered towels but spot something, big eyes, big eyes, crouch, shake butt, prepare to pounce plop down in the middle where everybody walks climb into cupboard and lick the salt off rice cakes. Spread kitty litter all over house hiding behind the couch until lured out by a feathery toy but bite off human's toes. Chase laser kitty poochy lay on arms while you're using the keyboard jump on counter removed by human jump on counter again removed by human meow before jumping on counter this time to let the human know am coming back. Plop down in the middle where everybody walks trip owner up in kitchen i want food. Friends are not food there's a forty year old lady there let us feast for allways wanting food and i is not fat, i is fluffy scratch leg; meow for can opener to feed me so poop in the plant pot. Scratch at fleas, meow until belly rubs, hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food. Sit and stare sleep in the bathroom sink for have my breakfast spaghetti yarn or who's the baby. Poop in a handbag look delicious and drink the soapy mopping up water then puke giant foamy fur-balls meowing non stop for food for iâ€™m so hungry iâ€™m so hungry but ew not for that so lick face hiss at owner, pee a lot, and meow repeatedly scratch at fence purrrrrr eat muffins and poutine until owner comes back or has closed eyes but still sees you, love you, then bite you. Meowing non stop for food iâ€™m so hungry iâ€™m so hungry but ew not for that yet swipe at owner's legs.
    </p>
    <div class="line"></div>`
    },

    {
      'headline': 'Chase little red dot someday it will be mine! i will be pet i will be pet and then i will hiss',

      'date': '10-13-2022',

      'name': "Author's name",

      'tag': '#catIpsum',

      'hash': '#/ChaseLittleRedDotSomedayItWillBeMine!IWillBePetIWillBePetAndThenIWillHiss',

      'body': `
      <div class="authorsInfo">${pfp}
      <div class="nameDate">
        <div class="authorsName">Author's name</div>
        <div class="publishingDate" datetime="10-13-2022">
        Published on 10-13-2022</div>
      </div>
    </div>
    <div class="tagContainer">
      <h2 class="articleTag">#catIpsum</h2>
    </div>
    <h1>Chase little red dot someday it will be mine! i will be pet i will be pet and then i will hiss</h1>
    <h3>Paragraph heading</h3>
    <p>
      Stinky cat human is in bath tub, emergency! drowning! meooowww! or cat fur is the new black so destroy the blinds but sit in box meow meow but jump on fridge. Taco cat backwards spells taco cat chew foot eat half my food and ask for more so hide at bottom of staircase to trip human or walk on keyboard or kick up litter yet chew foot. Hey! you there, with the hands get poop stuck in paws jumping out of litter box and run around the house scream meowing and smearing hot cat mud all over walk on keyboard, and walk on a keyboard the cat was chasing the mouse. Immediately regret falling into bathtub kitty kitty or this is the day and jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed but love you, then bite you.
    </p>
    <p>
      Floof tum, tickle bum, jellybean footies curly toes furball roll roll roll. Hunt anything that moves. Present belly, scratch hand when stroked where is it? i saw that bird i need to bring it home to mommy squirrel! but purr as loud as possible, be the most annoying cat that you can, and, knock everything off the table loved it, hated it, loved it, hated it catch eat throw up catch eat throw up bad birds. Find box a little too small and curl up with fur hanging out poop in a handbag look delicious and drink the soapy mopping up water then puke giant foamy fur-balls.
    </p>
    <div class="line"></div>
    <svg class="imageSvg" viewBox="0 0 310 200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><rect x="0" y="0" width="310" height="200" fill="#c9d2dc"></rect><g fill="#2a2c2f"><circle r="5" cx="68" cy="70"></circle><circle r="1" cx="233" cy="163"></circle><circle r="2" cx="108" cy="58"></circle><circle r="1" cx="30" cy="169"></circle><circle r="0" cx="48" cy="12"></circle><circle r="1" cx="172" cy="103"></circle><circle r="3" cx="149" cy="116"></circle><circle r="3" cx="140" cy="120"></circle><circle r="3" cx="86" cy="142"></circle><circle r="2" cx="247" cy="167"></circle><circle r="1" cx="112" cy="139"></circle><circle r="1" cx="295" cy="89"></circle><circle r="1" cx="224" cy="26"></circle><circle r="1" cx="240" cy="139"></circle><circle r="2" cx="197" cy="146"></circle><circle r="1" cx="37" cy="114"></circle><circle r="3" cx="115" cy="189"></circle><circle r="1" cx="234" cy="96"></circle><circle r="1" cx="266" cy="133"></circle><circle r="0" cx="38" cy="157"></circle><circle r="1" cx="113" cy="103"></circle><circle r="0" cx="64" cy="167"></circle><circle r="2" cx="23" cy="7"></circle><circle r="1" cx="128" cy="137"></circle><circle r="0" cx="106" cy="179"></circle><circle r="0" cx="46" cy="67"></circle><circle r="1" cx="272" cy="92"></circle><circle r="1" cx="163" cy="98"></circle><circle r="1" cx="100" cy="137"></circle><circle r="1" cx="59" cy="90"></circle><circle r="3" cx="54" cy="199"></circle><circle r="1" cx="309" cy="108"></circle><circle r="3" cx="121" cy="88"></circle><circle r="3" cx="54" cy="107"></circle><circle r="0" cx="288" cy="33"></circle><circle r="3" cx="205" cy="103"></circle><circle r="1" cx="3" cy="23"></circle><circle r="3" cx="81" cy="174"></circle><circle r="1" cx="64" cy="103"></circle><circle r="0" cx="117" cy="18"></circle><circle r="0" cx="219" cy="115"></circle><circle r="1" cx="36" cy="103"></circle><circle r="1" cx="132" cy="46"></circle><circle r="1" cx="278" cy="134"></circle><circle r="1" cx="272" cy="197"></circle><circle r="2" cx="34" cy="20"></circle><circle r="1" cx="70" cy="9"></circle><circle r="0" cx="169" cy="32"></circle><circle r="3" cx="101" cy="29"></circle><circle r="0" cx="70" cy="94"></circle><circle r="3" cx="290" cy="160"></circle><circle r="3" cx="111" cy="152"></circle><circle r="1" cx="111" cy="119"></circle><circle r="3" cx="168" cy="47"></circle><circle r="2" cx="178" cy="76"></circle><circle r="0" cx="24" cy="185"></circle><circle r="3" cx="174" cy="122"></circle><circle r="1" cx="20" cy="94"></circle><circle r="0" cx="203" cy="25"></circle><circle r="1" cx="25" cy="59"></circle><circle r="3" cx="130" cy="197"></circle><circle r="0" cx="237" cy="74"></circle><circle r="1" cx="279" cy="184"></circle><circle r="0" cx="164" cy="16"></circle><circle r="0" cx="146" cy="13"></circle><circle r="1" cx="200" cy="9"></circle><circle r="3" cx="213" cy="160"></circle><circle r="3" cx="196" cy="71"></circle><circle r="0" cx="261" cy="119"></circle><circle r="3" cx="114" cy="169"></circle><circle r="3" cx="139" cy="174"></circle><circle r="0" cx="182" cy="39"></circle><circle r="2" cx="148" cy="61"></circle><circle r="3" cx="179" cy="90"></circle><circle r="3" cx="62" cy="24"></circle><circle r="2" cx="19" cy="121"></circle><circle r="1" cx="54" cy="148"></circle><circle r="1" cx="110" cy="75"></circle><circle r="3" cx="5" cy="54"></circle><circle r="1" cx="134" cy="6"></circle><circle r="1" cx="160" cy="38"></circle><circle r="2" cx="96" cy="17"></circle><circle r="2" cx="166" cy="81"></circle><circle r="0" cx="267" cy="158"></circle><circle r="1" cx="66" cy="140"></circle><circle r="2" cx="304" cy="196"></circle><circle r="3" cx="194" cy="187"></circle><circle r="2" cx="205" cy="141"></circle><circle r="3" cx="303" cy="62"></circle><circle r="1" cx="134" cy="105"></circle><circle r="2" cx="84" cy="76"></circle><circle r="2" cx="67" cy="48"></circle><circle r="1" cx="10" cy="132"></circle><circle r="2" cx="204" cy="36"></circle><circle r="2" cx="46" cy="194"></circle><circle r="3" cx="120" cy="3"></circle><circle r="2" cx="223" cy="38"></circle><circle r="2" cx="304" cy="150"></circle><circle r="2" cx="41" cy="58"></circle><circle r="3" cx="84" cy="90"></circle><circle r="3" cx="99" cy="63"></circle><circle r="3" cx="230" cy="112"></circle><circle r="3" cx="246" cy="131"></circle><circle r="3" cx="188" cy="162"></circle><circle r="3" cx="192" cy="31"></circle><circle r="3" cx="151" cy="48"></circle><circle r="0" cx="244" cy="153"></circle><circle r="0" cx="271" cy="5"></circle><circle r="3" cx="198" cy="112"></circle><circle r="3" cx="197" cy="88"></circle><circle r="2" cx="98" cy="48"></circle><circle r="2" cx="295" cy="120"></circle><circle r="3" cx="255" cy="96"></circle><circle r="1" cx="9" cy="160"></circle><circle r="3" cx="247" cy="54"></circle><circle r="1" cx="35" cy="79"></circle><circle r="0" cx="305" cy="87"></circle><circle r="1" cx="283" cy="122"></circle><circle r="3" cx="187" cy="9"></circle><circle r="3" cx="246" cy="104"></circle><circle r="3" cx="67" cy="36"></circle><circle r="1" cx="141" cy="196"></circle><circle r="2" cx="15" cy="46"></circle><circle r="1" cx="253" cy="25"></circle><circle r="0" cx="259" cy="109"></circle><circle r="3" cx="129" cy="76"></circle><circle r="2" cx="85" cy="197"></circle><circle r="3" cx="173" cy="180"></circle><circle r="1" cx="129" cy="63"></circle><circle r="1" cx="253" cy="45"></circle><circle r="3" cx="4" cy="122"></circle><circle r="2" cx="85" cy="64"></circle><circle r="0" cx="5" cy="82"></circle><circle r="2" cx="278" cy="67"></circle><circle r="2" cx="29" cy="156"></circle><circle r="3" cx="120" cy="53"></circle><circle r="0" cx="296" cy="104"></circle><circle r="0" cx="228" cy="68"></circle><circle r="2" cx="89" cy="154"></circle><circle r="2" cx="102" cy="118"></circle><circle r="2" cx="234" cy="26"></circle><circle r="2" cx="211" cy="7"></circle><circle r="3" cx="287" cy="94"></circle><circle r="1" cx="256" cy="155"></circle><circle r="2" cx="41" cy="174"></circle><circle r="1" cx="215" cy="100"></circle><circle r="2" cx="3" cy="103"></circle><circle r="2" cx="38" cy="145"></circle><circle r="0" cx="278" cy="101"></circle><circle r="1" cx="284" cy="50"></circle><circle r="0" cx="164" cy="184"></circle><circle r="2" cx="255" cy="176"></circle><circle r="3" cx="226" cy="132"></circle><circle r="3" cx="235" cy="42"></circle><circle r="1" cx="248" cy="197"></circle><circle r="0" cx="256" cy="10"></circle><circle r="2" cx="121" cy="146"></circle><circle r="1" cx="74" cy="117"></circle><circle r="1" cx="37" cy="32"></circle><circle r="0" cx="262" cy="83"></circle><circle r="2" cx="96" cy="102"></circle><circle r="0" cx="279" cy="23"></circle><circle r="0" cx="210" cy="79"></circle><circle r="0" cx="69" cy="175"></circle><circle r="0" cx="285" cy="191"></circle><circle r="0" cx="119" cy="28"></circle><circle r="2" cx="235" cy="128"></circle><circle r="0" cx="177" cy="157"></circle><circle r="3" cx="304" cy="76"></circle><circle r="1" cx="185" cy="66"></circle><circle r="2" cx="97" cy="128"></circle><circle r="2" cx="292" cy="177"></circle><circle r="3" cx="130" cy="154"></circle><circle r="1" cx="229" cy="183"></circle><circle r="1" cx="273" cy="34"></circle><circle r="0" cx="33" cy="128"></circle><circle r="2" cx="241" cy="64"></circle><circle r="2" cx="298" cy="30"></circle><circle r="2" cx="288" cy="148"></circle><circle r="2" cx="28" cy="137"></circle><circle r="3" cx="177" cy="59"></circle><circle r="2" cx="210" cy="182"></circle><circle r="3" cx="57" cy="45"></circle><circle r="3" cx="154" cy="106"></circle><circle r="2" cx="224" cy="162"></circle><circle r="1" cx="20" cy="68"></circle><circle r="3" cx="263" cy="45"></circle><circle r="1" cx="266" cy="181"></circle><circle r="3" cx="207" cy="45"></circle><circle r="2" cx="288" cy="83"></circle><circle r="1" cx="191" cy="174"></circle><circle r="0" cx="293" cy="136"></circle><circle r="0" cx="24" cy="109"></circle><circle r="0" cx="82" cy="27"></circle><circle r="2" cx="261" cy="199"></circle><circle r="1" cx="224" cy="194"></circle><circle r="3" cx="119" cy="157"></circle><circle r="1" cx="80" cy="105"></circle><circle r="3" cx="241" cy="174"></circle><circle r="3" cx="304" cy="178"></circle><circle r="2" cx="45" cy="118"></circle><circle r="0" cx="289" cy="43"></circle><circle r="3" cx="143" cy="97"></circle><circle r="1" cx="245" cy="86"></circle><circle r="3" cx="164" cy="145"></circle><circle r="2" cx="158" cy="61"></circle><circle r="0" cx="153" cy="26"></circle><circle r="3" cx="16" cy="181"></circle><circle r="0" cx="294" cy="16"></circle><circle r="3" cx="6" cy="192"></circle><circle r="1" cx="53" cy="177"></circle><circle r="1" cx="62" cy="127"></circle><circle r="3" cx="112" cy="198"></circle><circle r="1" cx="21" cy="147"></circle><circle r="3" cx="257" cy="142"></circle><circle r="2" cx="217" cy="87"></circle><circle r="3" cx="50" cy="186"></circle><circle r="0" cx="18" cy="195"></circle><circle r="0" cx="293" cy="197"></circle><circle r="1" cx="55" cy="60"></circle><circle r="1" cx="147" cy="179"></circle><circle r="3" cx="187" cy="195"></circle><circle r="2" cx="257" cy="72"></circle><circle r="1" cx="125" cy="117"></circle><circle r="3" cx="81" cy="41"></circle><circle r="2" cx="125" cy="38"></circle><circle r="3" cx="247" cy="76"></circle><circle r="0" cx="204" cy="119"></circle><circle r="3" cx="2" cy="65"></circle><circle r="3" cx="62" cy="13"></circle><circle r="3" cx="278" cy="174"></circle><circle r="3" cx="285" cy="74"></circle><circle r="1" cx="162" cy="175"></circle><circle r="1" cx="302" cy="166"></circle><circle r="3" cx="155" cy="191"></circle><circle r="1" cx="303" cy="8"></circle><circle r="3" cx="273" cy="148"></circle><circle r="0" cx="56" cy="117"></circle><circle r="0" cx="22" cy="35"></circle><circle r="2" cx="213" cy="22"></circle><circle r="3" cx="70" cy="198"></circle><circle r="2" cx="17" cy="25"></circle><circle r="2" cx="220" cy="5"></circle><circle r="1" cx="81" cy="125"></circle><circle r="1" cx="270" cy="169"></circle><circle r="3" cx="178" cy="26"></circle><circle r="3" cx="130" cy="20"></circle><circle r="1" cx="261" cy="58"></circle><circle r="3" cx="54" cy="157"></circle><circle r="2" cx="297" cy="70"></circle><circle r="2" cx="174" cy="199"></circle><circle r="3" cx="200" cy="130"></circle><circle r="2" cx="86" cy="185"></circle><circle r="1" cx="225" cy="175"></circle><circle r="3" cx="8" cy="32"></circle><circle r="1" cx="216" cy="67"></circle><circle r="1" cx="54" cy="20"></circle><circle r="1" cx="214" cy="133"></circle><circle r="3" cx="38" cy="185"></circle><circle r="3" cx="1" cy="178"></circle><circle r="2" cx="73" cy="165"></circle><circle r="3" cx="139" cy="140"></circle><circle r="0" cx="269" cy="73"></circle><circle r="2" cx="55" cy="138"></circle><circle r="0" cx="34" cy="41"></circle><circle r="0" cx="209" cy="196"></circle><circle r="0" cx="169" cy="70"></circle><circle r="3" cx="291" cy="112"></circle><circle r="3" cx="306" cy="23"></circle><circle r="1" cx="18" cy="169"></circle><circle r="3" cx="238" cy="116"></circle><circle r="3" cx="181" cy="188"></circle><circle r="2" cx="251" cy="36"></circle><circle r="3" cx="270" cy="18"></circle><circle r="2" cx="81" cy="2"></circle><circle r="1" cx="95" cy="90"></circle><circle r="1" cx="78" cy="14"></circle><circle r="1" cx="112" cy="129"></circle><circle r="2" cx="88" cy="167"></circle><circle r="2" cx="150" cy="70"></circle><circle r="0" cx="120" cy="69"></circle><circle r="1" cx="20" cy="160"></circle><circle r="1" cx="162" cy="126"></circle><circle r="3" cx="190" cy="98"></circle><circle r="3" cx="106" cy="84"></circle><circle r="2" cx="157" cy="89"></circle><circle r="2" cx="89" cy="111"></circle><circle r="3" cx="62" cy="2"></circle><circle r="3" cx="150" cy="145"></circle><circle r="2" cx="136" cy="131"></circle><circle r="1" cx="133" cy="184"></circle><circle r="0" cx="10" cy="10"></circle><circle r="1" cx="147" cy="33"></circle><circle r="1" cx="223" cy="16"></circle><circle r="0" cx="211" cy="147"></circle><circle r="3" cx="226" cy="102"></circle><circle r="0" cx="256" cy="164"></circle><circle r="3" cx="226" cy="82"></circle><circle r="1" cx="131" cy="94"></circle><circle r="3" cx="46" cy="137"></circle><circle r="1" cx="63" cy="185"></circle><circle r="0" cx="265" cy="99"></circle><circle r="0" cx="106" cy="108"></circle><circle r="0" cx="107" cy="22"></circle><circle r="3" cx="87" cy="51"></circle><circle r="1" cx="248" cy="182"></circle><circle r="2" cx="92" cy="34"></circle><circle r="2" cx="49" cy="79"></circle><circle r="3" cx="3" cy="44"></circle><circle r="2" cx="213" cy="36"></circle><circle r="3" cx="271" cy="51"></circle><circle r="1" cx="35" cy="50"></circle><circle r="1" cx="237" cy="195"></circle><circle r="0" cx="149" cy="159"></circle><circle r="1" cx="139" cy="164"></circle><circle r="3" cx="41" cy="5"></circle><circle r="3" cx="234" cy="153"></circle><circle r="2" cx="206" cy="56"></circle><circle r="0" cx="129" cy="164"></circle><circle r="2" cx="222" cy="61"></circle><circle r="0" cx="125" cy="180"></circle><circle r="3" cx="260" cy="18"></circle><circle r="0" cx="277" cy="83"></circle><circle r="3" cx="74" cy="186"></circle><circle r="0" cx="173" cy="2"></circle><circle r="3" cx="169" cy="134"></circle><circle r="2" cx="150" cy="132"></circle><circle r="1" cx="135" cy="30"></circle><circle r="3" cx="14" cy="107"></circle><circle r="3" cx="141" cy="51"></circle><circle r="2" cx="286" cy="61"></circle><circle r="1" cx="178" cy="11"></circle><circle r="2" cx="307" cy="137"></circle><circle r="0" cx="47" cy="51"></circle><circle r="3" cx="159" cy="115"></circle><circle r="3" cx="203" cy="155"></circle><circle r="1" cx="306" cy="121"></circle><circle r="0" cx="71" cy="149"></circle><circle r="0" cx="202" cy="174"></circle><circle r="0" cx="272" cy="108"></circle><circle r="1" cx="2" cy="167"></circle><circle r="2" cx="306" cy="39"></circle><circle r="3" cx="232" cy="4"></circle><circle r="1" cx="290" cy="6"></circle><circle r="0" cx="94" cy="80"></circle><circle r="2" cx="271" cy="121"></circle><circle r="0" cx="143" cy="106"></circle><circle r="1" cx="226" cy="148"></circle><circle r="1" cx="35" cy="66"></circle><circle r="0" cx="17" cy="81"></circle><circle r="0" cx="100" cy="147"></circle><circle r="3" cx="94" cy="174"></circle><circle r="0" cx="280" cy="41"></circle><circle r="2" cx="298" cy="44"></circle><circle r="3" cx="189" cy="57"></circle><circle r="3" cx="217" cy="170"></circle><circle r="1" cx="146" cy="86"></circle><circle r="1" cx="109" cy="42"></circle><circle r="3" cx="50" cy="34"></circle><circle r="0" cx="262" cy="29"></circle><circle r="0" cx="122" cy="126"></circle><circle r="2" cx="180" cy="170"></circle><circle r="1" cx="188" cy="133"></circle><circle r="0" cx="306" cy="100"></circle><circle r="0" cx="231" cy="52"></circle><circle r="2" cx="59" cy="78"></circle><circle r="3" cx="189" cy="84"></circle><circle r="3" cx="100" cy="192"></circle><circle r="2" cx="65" cy="61"></circle><circle r="1" cx="125" cy="107"></circle><circle r="3" cx="30" cy="193"></circle><circle r="2" cx="245" cy="7"></circle><circle r="0" cx="27" cy="80"></circle><circle r="0" cx="50" cy="2"></circle><circle r="1" cx="96" cy="162"></circle><circle r="1" cx="31" cy="2"></circle><circle r="0" cx="236" cy="16"></circle><circle r="1" cx="139" cy="38"></circle><circle r="1" cx="140" cy="20"></circle><circle r="0" cx="282" cy="154"></circle><circle r="1" cx="97" cy="8"></circle><circle r="3" cx="164" cy="197"></circle><circle r="3" cx="76" cy="138"></circle><circle r="3" cx="191" cy="120"></circle><circle r="1" cx="191" cy="45"></circle><circle r="2" cx="171" cy="169"></circle><circle r="3" cx="3" cy="148"></circle><circle r="3" cx="39" cy="92"></circle><circle r="2" cx="246" cy="122"></circle><circle r="3" cx="180" cy="128"></circle><circle r="1" cx="108" cy="160"></circle><circle r="0" cx="50" cy="88"></circle><circle r="2" cx="165" cy="161"></circle><circle r="3" cx="160" cy="2"></circle><circle r="0" cx="157" cy="78"></circle><circle r="0" cx="281" cy="5"></circle><circle r="3" cx="251" cy="63"></circle><circle r="3" cx="234" cy="86"></circle><circle r="2" cx="74" cy="80"></circle><circle r="2" cx="227" cy="122"></circle><circle r="0" cx="46" cy="104"></circle><circle r="2" cx="9" cy="90"></circle><circle r="3" cx="182" cy="108"></circle><circle r="3" cx="140" cy="70"></circle><circle r="0" cx="81" cy="159"></circle><circle r="3" cx="270" cy="61"></circle><circle r="3" cx="148" cy="168"></circle><circle r="2" cx="98" cy="71"></circle><circle r="1" cx="178" cy="50"></circle><circle r="1" cx="220" cy="141"></circle><circle r="2" cx="299" cy="186"></circle><circle r="0" cx="181" cy="145"></circle><circle r="2" cx="150" cy="5"></circle><circle r="2" cx="199" cy="198"></circle><circle r="0" cx="309" cy="185"></circle><circle r="3" cx="199" cy="50"></circle><circle r="0" cx="108" cy="4"></circle><circle r="0" cx="76" cy="58"></circle><circle r="0" cx="2" cy="6"></circle><circle r="3" cx="306" cy="49"></circle><circle r="2" cx="160" cy="53"></circle><circle r="3" cx="245" cy="21"></circle><circle r="0" cx="106" cy="93"></circle><circle r="1" cx="187" cy="152"></circle><circle r="0" cx="188" cy="20"></circle><circle r="1" cx="250" cy="112"></circle><circle r="0" cx="217" cy="51"></circle><circle r="1" cx="89" cy="120"></circle><circle r="3" cx="294" cy="56"></circle><circle r="1" cx="78" cy="68"></circle><circle r="3" cx="50" cy="126"></circle><circle r="2" cx="31" cy="89"></circle><circle r="0" cx="66" cy="158"></circle><circle r="0" cx="209" cy="91"></circle><circle r="3" cx="206" cy="71"></circle><circle r="2" cx="261" cy="2"></circle><circle r="3" cx="155" cy="17"></circle><circle r="2" cx="15" cy="2"></circle><circle r="2" cx="255" cy="127"></circle><circle r="2" cx="66" cy="113"></circle><circle r="1" cx="23" cy="18"></circle><circle r="3" cx="275" cy="162"></circle><circle r="1" cx="142" cy="150"></circle><circle r="3" cx="25" cy="48"></circle><circle r="0" cx="217" cy="124"></circle><circle r="0" cx="11" cy="143"></circle><circle r="1" cx="46" cy="166"></circle><circle r="2" cx="103" cy="170"></circle><circle r="2" cx="283" cy="14"></circle><circle r="1" cx="287" cy="103"></circle><circle r="2" cx="256" cy="191"></circle><circle r="0" cx="135" cy="84"></circle><circle r="1" cx="198" cy="164"></circle><circle r="1" cx="74" cy="24"></circle><circle r="2" cx="23" cy="129"></circle><circle r="1" cx="158" cy="139"></circle><circle r="1" cx="109" cy="33"></circle><circle r="0" cx="14" cy="59"></circle><circle r="2" cx="225" cy="93"></circle><circle r="3" cx="130" cy="173"></circle><circle r="0" cx="1" cy="130"></circle><circle r="0" cx="42" cy="25"></circle><circle r="0" cx="155" cy="152"></circle><circle r="3" cx="137" cy="61"></circle><circle r="2" cx="145" cy="188"></circle><circle r="2" cx="182" cy="117"></circle><circle r="2" cx="216" cy="189"></circle><circle r="0" cx="3" cy="112"></circle><circle r="2" cx="59" cy="68"></circle><circle r="1" cx="78" cy="97"></circle><circle r="0" cx="86" cy="18"></circle><circle r="0" cx="71" cy="126"></circle><circle r="3" cx="248" cy="143"></circle><circle r="2" cx="299" cy="129"></circle><circle r="0" cx="90" cy="134"></circle><circle r="2" cx="33" cy="11"></circle><circle r="3" cx="56" cy="98"></circle><circle r="0" cx="121" cy="98"></circle><circle r="0" cx="118" cy="79"></circle><circle r="2" cx="10" cy="71"></circle><circle r="3" cx="44" cy="42"></circle><circle r="2" cx="266" cy="142"></circle><circle r="2" cx="183" cy="179"></circle><circle r="0" cx="219" cy="153"></circle><circle r="0" cx="253" cy="86"></circle><circle r="1" cx="284" cy="167"></circle><circle r="3" cx="241" cy="32"></circle><circle r="3" cx="27" cy="26"></circle><circle r="1" cx="282" cy="111"></circle><circle r="3" cx="288" cy="23"></circle><circle r="3" cx="88" cy="9"></circle><circle r="0" cx="239" cy="184"></circle><circle r="1" cx="168" cy="59"></circle><circle r="3" cx="28" cy="118"></circle><circle r="0" cx="211" cy="111"></circle><circle r="3" cx="169" cy="90"></circle><circle r="3" cx="38" cy="199"></circle><circle r="3" cx="166" cy="110"></circle><circle r="0" cx="45" cy="151"></circle><circle r="0" cx="162" cy="26"></circle><circle r="2" cx="29" cy="98"></circle><circle r="1" cx="194" cy="2"></circle><circle r="2" cx="10" cy="173"></circle><circle r="0" cx="18" cy="137"></circle><circle r="1" cx="31" cy="179"></circle><circle r="1" cx="219" cy="76"></circle><circle r="2" cx="116" cy="179"></circle><circle r="0" cx="12" cy="152"></circle><circle r="0" cx="87" cy="98"></circle><circle r="2" cx="125" cy="189"></circle><circle r="1" cx="237" cy="107"></circle><circle r="3" cx="96" cy="183"></circle><circle r="3" cx="196" cy="18"></circle><circle r="0" cx="126" cy="12"></circle><circle r="2" cx="252" cy="1"></circle><circle r="0" cx="106" cy="13"></circle><circle r="3" cx="198" cy="61"></circle><circle r="1" cx="62" cy="193"></circle></g></svg>
    <h3>Paragraph heading</h3>
    <p>
      Annoy owner until he gives you food say meow repeatedly until belly rubs, feels good catty ipsum yet why must they do that. Hide at bottom of staircase to trip human. Instead of drinking water from the cat bowl, make sure to steal water from the toilet swat at dog, for and sometimes switches in french and say "miaou" just because well why not mark territory i love cats i am one wake up scratch humans leg for food then purr then i have a and relax, so catch mouse and gave it as a present. Give me attention or face the wrath of my claws ask for petting or chase red laser dot and chase after silly colored fish toys around the house and meow in empty rooms eat too much then proceed to regurgitate all over living room carpet while humans eat dinner. Stinky cat my cat stared at me he was sipping his tea, too so fight own tail trip on catnip run at 3am or being gorgeous with belly side up inspect anything brought into the house. Chew iPad power cord chase the pig around the house.
    </p>
    <p>
      Hide when guests come over. Lick the curtain just to be annoying snuggles up to shoulders or knees and purrs you to sleep or attack the dog then pretend like nothing happened give me attention or face the wrath of my claws yowling nonstop the whole night. Scratch me now! stop scratching me! go into a room to decide you didn't want to be in there anyway. Cat snacks avoid the new toy and just play with the box it came in climb a tree, wait for a fireman jump to fireman then scratch his face. Carrying out surveillance on the neighbour's dog roll on the floor purring your whiskers off so stare at wall turn and meow stare at wall some more meow again continue staring .
    </p>
    <div class="line"></div>`
    },

    {
      'headline': 'Spread kitty litter all over house play time floof tum, tickle bum, jellybean footies curly toes',

      'date': '10-19-2022',

      'name': "Author's name",

      'tag': '#catIpsum',

      'hash': '#/SpreadKittyLitterAllOverHousePlayTimeFloofTumTickleBumJellybeanFootiesCurlyToes',

      'body': `
      <div class="authorsInfo">${pfp}
      <div class="nameDate">
        <div class="authorsName">Author's name</div>
        <div class="publishingDate" datetime="10-19-2022">
        Published on 10-19-2022</div>
      </div>
    </div>
    <div class="tagContainer">
      <h2 class="articleTag">#catIpsum</h2>
    </div>
    <h1>Spread kitty litter all over house play time floof tum, tickle bum, jellybean footies curly toes</h1>
    <img class="image" src="http://placekitten.com/670/200" alt="placeholder"/>
    <p>
      Sit as close as possible to warm fire without sitting on cold floor small kitty warm kitty little balls of fur so sleep for pet right here, no not there, here, no fool, right here that other cat smells funny you should really give me all the treats because i smell the best and omg you finally got the right spot and i love you right now. Shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff catasstrophe give attitude lay on arms while you're using the keyboard gnaw the corn cob when in doubt, wash and scratch the postman wake up lick paw wake up owner meow meow. Eat from dog's food rub my belly hiss so human is behind a closed door, emergency! abandoned! meeooowwww!!! so climb a tree, wait for a fireman jump to fireman then scratch his face jumps off balcony gives owner dead mouse at present then poops in litter box snatches yarn and fights with dog cat chases laser then plays in grass finds tiny spot in cupboard and sleeps all day jumps in bathtub and meows when owner fills food dish the cat knocks over the food dish cat slides down the water slide and into pool and swims even though it does not like water lick the plastic bag. If it fits i sits eat grass, throw it back up. Pet right here, no not there, here, no fool, right here that other cat smells funny you should really give me all the treats because i smell the best and omg you finally got the right spot and i love you right now sleep on keyboard, and scratch me there, elevator butt yet furrier and even more furrier hairball for snuggles up to shoulders or knees and purrs you to sleep. Mew mew jump on fridge stare at guinea pigs, fooled again thinking the dog likes me. Chase imaginary bugs.
    </p>
    <p>
      Floof tum, tickle bum, jellybean footies curly toes furball roll roll roll. Hunt anything that moves. Present belly, scratch hand when stroked where is it? i saw that bird i need to bring it home to mommy squirrel! but purr as loud as possible, be the most annoying cat that you can, and, knock everything off the table loved it, hated it, loved it, hated it catch eat throw up catch eat throw up bad birds. Find box a little too small and curl up with fur hanging out poop in a handbag look delicious and drink the soapy mopping up water then puke giant foamy fur-balls.
    </p>
    <div class="line"></div>
    <h3>Paragraph heading</h3>
    <p>
      Knock over christmas tree my cat stared at me he was sipping his tea, too purrrrrr i dreamt about fish yum!. Hunt by meowing loudly at 5am next to human slave food dispenser pet my belly, you know you want to; seize the hand and shred it! and refuse to come home when humans are going to bed; stay out all night then yowl like i am dying at 4am humans,humans, humans oh how much they love us felines we are the center of attention they feed, they clean scratch at door to be let outside, get let out then scratch at door immmediately after to be let back in. Spot something, big eyes, big eyes, crouch, shake butt, prepare to pounce get poop stuck in paws jumping out of litter box and run around the house scream meowing and smearing hot cat mud all over or stick butt in face. Groom yourself 4 hours - checked, have your beauty sleep 18 hours - checked, be fabulous for the rest of the day - checked sit in a box for hours, but peer out window, chatter at birds, lure them to mouth so burrow under covers, for furball roll roll roll yet always hungry. Loves cheeseburgers kitty scratches couch bad kitty need to chase tail is good you understand your place in my world so adventure always catch small lizards, bring them into house, then unable to find them on carpet.
    </p>
    <p>
      Hide when guests come over. Lick the curtain just to be annoying snuggles up to shoulders or knees and purrs you to sleep or attack the dog then pretend like nothing happened give me attention or face the wrath of my claws yowling nonstop the whole night. Scratch me now! stop scratching me! go into a room to decide you didn't want to be in there anyway. Cat snacks avoid the new toy and just play with the box it came in climb a tree, wait for a fireman jump to fireman then scratch his face. Carrying out surveillance on the neighbour's dog roll on the floor purring your whiskers off so stare at wall turn and meow stare at wall some more meow again continue staring .
    </p>
    <div class="line"></div>`
    },

    {
      'headline': 'Look at dog hiiiiiisssss pounce on unsuspecting person',

      'date': '10-22-2022',

      'name': "Author's name",

      'tag': '#catIpsum',

      'hash': '#/LookAtDogHiiiiiisssssPounceOnUnsuspectinPerson',

      'body': `
      <div class="authorsInfo">${pfp}
      <div class="nameDate">
        <div class="authorsName">Author's name</div>
        <div class="publishingDate" datetime="10-22-2022">
        Published on 10-22-2022</div>
      </div>
    </div>
    <div class="tagContainer">
      <h2 class="articleTag">#catIpsum</h2>
    </div>
    <h1>Look at dog hiiiiiisssss pounce on unsuspecting person</h1>
    <p>
      Lick human with sandpaper tongue sleep over your phone and make cute snoring noises, for hide when guests come over slap the dog because cats rule yet the fat cat sat on the mat bat away with paws, and scratch the postman wake up lick paw wake up owner meow meow. Lick the plastic bag when in doubt, wash for rub whiskers on bare skin act innocent or make meme, make cute face for spend all night ensuring people don't sleep sleep all day and headbutt owner's knee enslave the hooman. Need to check on human, have not seen in an hour might be dead oh look, human is alive, hiss at human, feed me pretend you want to go out but then don't yet nya nya nyan whatever. My slave human didn't give me any food so i pooped on the floor why must they do that be superior catch small lizards, bring them into house, then unable to find them on carpet. Experiences short bursts of poo-phoria after going to the loo slap owner's face at 5am until human fills food dish yet chew iPad power cord always ensure to lay down in such a manner that tail can lightly brush human's nose or meowzer love me!. Sleep on dog bed, force dog to sleep on floor hopped up on catnip. Intently stare at the same spot poop on floor and watch human clean up yet cat ass trophy licks your face fight an alligator and win so hide head under blanket so no one can see. Thinking about you i'm joking it's food always food cat mojo yet pounce on unsuspecting person if it fits i sits yet attempt to leap between furniture but woefully miscalibrate and bellyflop onto the floor; what's your problem? i meant to do that now i shall wash myself intently. Run at 3am furball roll roll roll. Lie on your belly and purr when you are asleep give attitude, but sleep nap but stare out cat door then go back inside climb a tree, wait for a fireman jump to fireman then scratch his face so sugar, my siamese, stalks me (in a good way), day and night . Pushes butt to face catch small lizards, bring them into house, then unable to find them on carpet stand in doorway, unwilling to chose whether to stay in or go out and
    </p>
    <p>
      cccccccccccaaaaaaaaaat, favor packaging over toy. Reward the chosen human with a slow blink love to play with owner's hair tie for rub my belly hiss poop on couch climb into cupboard and lick the salt off rice cakes get my claw stuck in the dog's ear oooo! dangly balls! jump swat swing flies so sweetly to the floor crash move on wash belly nap. Cat walks in keyboard who's the baby spend all night ensuring people don't sleep sleep all day or litter kitter kitty litty little kitten big roar roar feed me i hate cucumber pls dont throw it at me. Peer out window, chatter at birds, lure them to mouth prow?? ew dog you drink from the toilet, yum yum warm milk hotter pls, ouch too hot but lick butt and make a weird face, and get away from me stupid dog but bawl under human beds yet take a big fluffing crap ðŸ’©. Morning beauty routine of licking self bleghbleghvomit my furball really tie the room together, and play time always ensure to lay down in such a manner that tail can lightly brush human's nose . Play riveting piece on synthesizer keyboard more napping, more napping all the napping is exhausting, for purr as loud as possible, be the most annoying cat that you can, and, knock everything off the table suddenly go on wild-eyed crazy rampage. Lick the plastic bag lick the other cats but rub face on owner. Hide head under blanket so no one can see intently stare at the same spot, and give attitude. Whenever a door is opened, rush in before the human gimme attention gimme attention gimme attention gimme attention gimme attention gimme attention just kidding i don't want it anymore meow bye pose purrfectly to show my beauty and friends are not food, yet love me!. I see a bird i stare at it i meow at it i do a wiggle come here birdy shred all toilet paper and spread around the house so stare at wall turn and meow stare at wall some more meow again continue staring . Blow up sofa in 3 seconds ask to be pet then attack owners hand yet eat a rug and furry furry
    </p>
    <div class="line"></div>
    <img class="image" src="http://placekitten.com/670/400" alt="placeholder"/>
    <h3>Paragraph heading</h3>
    <p>
      hairs everywhere oh no human coming lie on counter don't get off counter but the dog smells bad go crazy with excitement when plates are clanked together signalling the arrival of cat food yet bite off human's toes for eat owner's food. Take a deep sniff of sock then walk around with mouth half open as lick i the shoes for cat gets stuck in tree firefighters try to get cat down firefighters get stuck in tree cat eats firefighters' slippers meow so pee in human's bed until he cleans the litter box. Chew master's slippers. Be superior the cat was chasing the mouse or jump on human and sleep on her all night long be long in the bed, purr in the morning and then give a bite to every human around for not waking up request food, purr loud scratch the walls, the floor, the windows, the humans meoooow yet meowwww. Run in circles push your water glass on the floor cats go for world domination.
    </p>
    <p>
      I see a bird i stare at it i meow at it i do a wiggle come here birdy. I'm going to lap some water out of my master's cup meow my cat stared at me he was sipping his tea, too. Car rides are evil jumps off balcony gives owner dead mouse at present then poops in litter box snatches yarn and fights with dog cat chases laser then plays in grass finds tiny spot in cupboard and sleeps all day jumps in bathtub and meows when owner fills food dish the cat knocks over the food dish cat slides down the water slide and into pool and swims even though it does not like water wack the mini furry mouse but jump around on couch, meow constantly until given food, love me! show belly. Somehow manage to catch a bird but have no idea what to do next, so play with it until it dies of shock just going to dip my paw in your coffee and do a taste test - oh never mind i forgot i don't like coffee - you can have that back now run around the house at 4 in the morning yet human is behind a closed door, emergency! abandoned! meeooowwww!!! so intently sniff hand. Human is washing you why halp oh the horror flee scratch hiss bite stare out the window and stare at owner accusingly then wink yet woops poop hanging from butt must get rid run run around house drag poop on floor maybe it comes off woops left brown marks on floor human slave clean lick butt now. See owner, run in terror be superior chase little red dot someday it will be mine! chase dog then run away so chew iPad power cord, and sniff catnip and act crazy at four in the morning wake up owner meeeeeeooww scratch at legs and beg for food then cry and yowl until they wake up at two pm jump on window and sleep while observing the bootyful cat next door that u really like but who already has a boyfriend end up making babies with her and let her move in. Chase red laser dot kitty scratches couch bad kitty slap owner's face at 5am until human fills food dish or spill litter box, scratch at owner, destroy all furniture, especially couch sniff catnip and act crazy if it fits i sits. Chase red laser dot stare out the window lick human with sandpaper tongue yet meow meow.
    </p>
    <div class="line"></div>`
    },
  ];

  const aboutThisBlogButton = document.getElementById('infoButton');
  const latestArticleButton = document.getElementById('latestArticleButton');
  const navigationPanel = document.getElementById('navigationPanel');
  const previousArticle = document.getElementById('previousArticle');
  const nextArticle = document.getElementById('nextArticle');
  const previousButton = document.getElementById('previousButton');
  const nextButtonCircle = document.getElementById('nextButtonCircle');
  const previousButtonCircle = document.getElementById('previousButtonCircle');
  const allArticlesButton = document.getElementById('allArticlesButton');

  backToTheTop(aboutThisBlogButton);
  backToTheTop(latestArticleButton);
  backToTheTop(previousArticle);
  backToTheTop(nextArticle);
  backToTheTop(allArticlesButton);

  /* use a variable to store the array index of currently displayed article,
   use this variable to implement previous/next article buttons and search */

  let currentArticleIndex = null;

  /* functions that change gui elements for each blog page */

  function menuButtonPressedAdjustPage() {
    dropDownMenu.style.display = 'none';
    menuButtonSvg.style.transform = 'rotate(0deg)';
    navigationPanel.style.display = 'none';
  }

  function adjustNavigationButtons() {
    dropDownMenu.style.display = 'none';
    menuButtonSvg.style.transform = 'rotate(0deg)';
    navigationPanel.style.display = 'flex';
    nextButton.style.display = 'inline-block';
    nextButtonCircle.style.display = 'none';
    previousButton.style.display = 'inline-block';
    previousButtonCircle.style.display = 'none';
    if (currentArticleIndex === 0) {
      previousButton.style.display = 'none';
      previousButtonCircle.style.display = 'inline-block';
    } else if (currentArticleIndex === articles.length - 1) {
      nextButton.style.display = 'none';
      nextButtonCircle.style.display = 'inline-block';
    }
  }

  function changeHash(event) {
    const url = event.target.getAttribute('href');
    location.hash = url;
  }

  aboutThisBlogButton.addEventListener('click', function (event) {
    menuButtonPressedAdjustPage()
    changeHash(event);
    textBlink();
  });

  allArticlesButton.addEventListener('click', function (event) {
    menuButtonPressedAdjustPage()
    changeHash(event);
    textBlink();
  });

  const latestArticleUrl = articles[articles.length - 1].hash;
  latestArticleButton.setAttribute("href", latestArticleUrl);

  latestArticleButton.addEventListener('click', function (event) {
    menuButtonPressedAdjustPage()
    adjustNavigationButtons(currentArticleIndex);
    changeHash(event);
    textBlink();
  });

  /* function that builds the all articles page using amount of articles 
     in article array variable. construct an element with a link to
     each articles as well as publishing date, author's name, and tags 
     using the article object parameters, add href parameter to each ling, 
     use use three decorator lines variables with svg code to construct 
     the vertical timeline svg element */

  const articleArrayIndex = articles.length - 1;
  const timeLineTop = `<svg width="10"
   height="140"
   viewBox="0 0 2.6458332 37.041666"
    version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path style="fill:currentColor" class="allArticlesLine"
    d="m 1.1978596,6.2127744 v 0.00775 h 0.250114 v -0.00775 z m 0,10.0975746 v 0.0041 a 1.0191335,1.0191335 0 0 0 -0.89400219,1.010825 1.0191335,1.0191335 0 0 0 0.89400219,1.010791 v 7.191292 h -0.012402 v 0.0016 h 0.012402 v 1.552876 h -0.012402 v 0.01602 h 0.012402 v 0.701766 h -0.012402 v 9.379272 H 1.4355715 V 30.09147 h 0.012402 v -0.0016 h -0.012402 v -1.552876 h 0.012402 v -0.01602 h -0.012402 v -0.701766 h 0.012402 V 18.336065 A 1.0191335,1.0191335 0 0 0 2.3419758,17.325274 1.0191335,1.0191335 0 0 0 1.4479736,16.313967 v -0.0036 z m 0.125057,0.271303 A 0.74403002,0.74403002 0 0 1 2.0665404,17.325274 0.74403002,0.74403002 0 0 1 1.3229166,18.068899 0.74403002,0.74403002 0 0 1 0.57929278,17.325274 0.74403002,0.74403002 0 0 1 1.3229166,16.581652 Z" /></svg>`;
  const timeLineMiddle = `<svg width="10" height="140" 
   viewBox="0 0 2.6458332 37.041665" version="1.1"
   xmlns="http://www.w3.org/2000/svg">
   <path class="allArticlesLine" style="fill:currentColor"
   d="m 1.1978596,0.2258245 v 5.2131183 h -0.00103 v 2.2598103 h 0.00103 V 8.400519 h -0.00103 v 0.01602 h 0.00103 v 0.6351034 0.701766 0.01602 0.199988 h -0.00103 v 0.0015 h 0.00103 v 1.3513376 0.0015 5.750553 a 1.0191335,1.0191335 0 0 0 -0.89400219,1.010791 1.0191335,1.0191335 0 0 0 0.89400219,1.010791 v 9.483142 h 0.00103 v 0.701766 h -0.00103 v 0.01602 h 0.00103 v 0.663008 h -5.168e-4 v 0.0016 h 5.168e-4 v 0.823722 h 5.167e-4 v 0.0646 h -0.00155 v 0.0016 h 0.00155 v 5.964493 h 0.250114 v -6.699849 h 5.167e-4 v -0.0072 h -5.167e-4 v -2.436027 h -0.00103 v -0.701765 h 0.00103 v -0.0078 h -0.00103 V 25.429453 H 1.4479736 V 19.095989 A 1.0191335,1.0191335 0 0 0 2.3419758,18.085198 1.0191335,1.0191335 0 0 0 1.4479736,17.073891 v -5.750037 -0.0015 -0.0646 h 0.00103 v -0.669209 h 0.00103 v -0.0072 h -0.00103 V 9.0475834 h -0.00103 V 7.6822166 6.9804507 6.9726992 0.2258245 Z M 1.3229166,17.341575 A 0.74403002,0.74403002 0 0 1 2.0665404,18.085198 0.74403002,0.74403002 0 0 1 1.3229166,18.828822 0.74403002,0.74403002 0 0 1 0.57929278,18.085198 0.74403002,0.74403002 0 0 1 1.3229166,17.341575 Z" /></svg>`;
  const timeLineBottom = `<svg width="10" height="96" 
    viewBox="0 0 2.6458332 25.399999"
    version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path class="allArticlesLine" style="fill:currentClor"
    d="M 1.1978597 1.5875 L 1.1978597 1.5952515 L 1.4479736 1.5952515 L 
    1.4479736 1.5875 L 1.1978597 1.5875 z M 1.1978597 2.2970174 L 
    1.1978597 11.689209 A 1.0191335 1.0191335 0 0 0 0.30385742 12.7 A 
    1.0191335 1.0191335 0 0 0 1.1978597 13.710791 L 1.1978597 13.715442 L 
    1.4479736 13.715442 L 1.4479736 13.710791 A 1.0191335 1.0191335 0 0 0 
    2.3419759 12.7 A 1.0191335 1.0191335 0 0 0 1.4479736 11.688692 L 1.4479736 
    2.2970174 L 1.1978597 2.2970174 z M 1.3229167 11.956376 A 0.74403002 
    0.74403002 0 0 1 2.0665405 12.7 A 0.74403002 0.74403002 0 0 1 1.3229167 
    13.443624 A 0.74403002 0.74403002 0 0 1 0.57929281 12.7 A 0.74403002 
    0.74403002 0 0 1 1.3229167 11.956376 z "/></svg>`;

  function createArticleLinkDiv(index) {
    const articleLinkContainer = document.createElement('div');
    articleLinkContainer.classList.add('articleLinkContainer');

    const articleLinkDate = document.createElement('date');
    articleLinkDate.classList.add('articleLinkDate');
    articleLinkContainer.appendChild(articleLinkDate);
    articleLinkDate.innerHTML = articles[index].date;
    articleLinkDate.setAttribute('datetime', articles[index].date);

    const articleLinkLine = document.createElement('div');
    articleLinkLine.classList.add('articleLinkLine');
    articleLinkContainer.appendChild(articleLinkLine);
    if (index === articles.length - 1) {
      articleLinkLine.innerHTML = timeLineTop;
    } else if (index === 0) {
      articleLinkLine.innerHTML = timeLineBottom;
    } else {
      articleLinkLine.innerHTML = timeLineMiddle;
    }

    const headlineContainer = document.createElement('div');
    headlineContainer.classList.add('headlineContainer');
    articleLinkContainer.appendChild(headlineContainer);

    const articleLinkAuthorsName = document.createElement('p');
    articleLinkAuthorsName.classList.add('articleLinkAuthorsName');
    headlineContainer.appendChild(articleLinkAuthorsName);
    articleLinkAuthorsName.innerHTML = articles[index].name;

    const articleLinkTags = document.createElement('p');
    articleLinkTags.classList.add('articleLinkTags');
    headlineContainer.appendChild(articleLinkTags);
    articleLinkTags.innerHTML = articles[index].tag;

    const articleLinkHeadline = document.createElement('a');
    articleLinkHeadline.classList.add('articleLinkHeadline');
    headlineContainer.appendChild(articleLinkHeadline);
    articleLinkHeadline.innerHTML = articles[index].headline;
    articleLinkHeadline.setAttribute("href", articles[index].hash);

    return articleLinkContainer;
  }

  /* use a recursive function to append article link to all articles page
     for each article in the article array */

  function buildAllArticlesPage(articleArrayIndex) {
   if (articleArrayIndex === -1) {
     return;
   } else {
     articleContainer.appendChild(createArticleLinkDiv(articleArrayIndex));
     return buildAllArticlesPage(articleArrayIndex - 1);
   }
  }

  /* increment/decrement currentArticleIndex variable to display next/previous
     articles using arrow buttons */

  previousArticle.addEventListener('click', function (event) {
    event.preventDefault();
    currentArticleIndex -= 1;
    adjustNavigationButtons();
    location.hash = articles[currentArticleIndex].hash;
  });

  nextArticle.addEventListener('click', function (event) {
    event.preventDefault();
    currentArticleIndex += 1;
    adjustNavigationButtons();
    location.hash = articles[currentArticleIndex].hash;
  });

  /* search input form
     take user input and put it into input a variable, use array
     .filter() and .includes() methods to search articles array
     headline properties for mathching objects, generate a list of
     links, attach href parameters from article objects to each link */

  let input = '';

  const searchBar = document.getElementById('searchBar');
  const searchResultsContainer = 
  document.getElementById('searchResultsContainer');

  searchBar.addEventListener('input', (event) => {
    searchResultsContainer.style.display = 'flex';
    searchResultsContainer.innerHTML = '';
    if(event.data === null) {
      input = input.slice(0, -1); 
    } else {
      input += event.data;
    }
    let result = articles.filter(article => {
      if (input.includes('#')) {
        return article.tag.toLowerCase().includes(input.toLowerCase());
      } else {
        return article.headline.toLowerCase().includes(input.toLowerCase());
      }
    });
    const length = result.length - 1;
    buildSearchList(length, result);
    if (input === '') {
      searchResultsContainer.innerHTML = '';
      searchResultsContainer.style.display = 'none';
    } else if (searchResultsContainer.innerHTML === '') {
      searchResultsContainer.style.display = 'none';
    }
  })

  function createLinks(index, result) {
    const searchResultLink = document.createElement('a');
    searchResultLink.classList.add('searchLink');
    searchResultLink.innerHTML = result[index].headline;
    searchResultLink.setAttribute('href', result[index].hash);
    searchResultLink.addEventListener('click', () => {
      searchResultsContainer.style.display = 'none';
        adjustNavigationButtons();
        textBlink();
    });
    return searchResultLink;
  }

  function buildSearchList(length, result) {
   if (length === -1) {
     return;
   } else {
     searchResultsContainer.appendChild(createLinks(length, result));
     return buildSearchList(length - 1, result);
   }
  }

  /* create clickable hashtags buttons with hashtag search */

  function hashtagEventListener() {
    const articleTags = document.querySelectorAll('.articleTag');
    const length = articleTags.length;
    for (let i = 0; i < length; i++) {
      articleTags[i].addEventListener('click', () => {
        searchResultsContainer.style.display = 'flex';
        searchResultsContainer.innerHTML = '';
        let hashTag = articleTags[i].innerHTML;
        let result = articles.filter(article => {
          return article.tag.toLowerCase().includes(hashTag.toLowerCase());
        });
        const length = result.length - 1;
        buildSearchList(length, result);
      });
    }
  };

  /* recursive function to search article objects array for matching 
     hash rout property */

  function articlesHashSearch(articleArrayIndex) {
    if (articleArrayIndex === -1) {
      return null;
    } else if (articles[articleArrayIndex].hash === location.hash){
      return articleArrayIndex;
    } else {
      return articlesHashSearch(articleArrayIndex - 1);
    }
  }

  /* Hash router function 
     populate the blog page based on the location.hash value */

  function hashRouter() {
    if (location.hash === '#/about') {
      menuButtonPressedAdjustPage()
      articleContainer.innerHTML = aboutThisBlog;
    } else if (location.hash === '') {
      menuButtonPressedAdjustPage()
      articleContainer.innerHTML = aboutThisBlog;
    } else if (location.hash === '#/allArticles') {
      menuButtonPressedAdjustPage();
      articleContainer.innerHTML = '';
      buildAllArticlesPage(articleArrayIndex);
    } else {
      currentArticleIndex = articlesHashSearch(articleArrayIndex);
      if (currentArticleIndex === null) {
        alert('404 page not found');
      } else {
        adjustNavigationButtons(currentArticleIndex);
        articleContainer.innerHTML = articles[currentArticleIndex].body;
        hashtagEventListener();
      }
    }
   searchResultsContainer.style.display = 'none';
   textBlink();
   toTheTop();
  }

  /* run the hash router function when the page hash changes */

  window.addEventListener('hashchange', hashRouter);

  hashRouter();
})();
