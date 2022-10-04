import {
  data
} from "jquery";

import gsap from "gsap";
import {
  TweenLite,
  Power1
} from "gsap/gsap-core";

import LocomotiveScroll from "locomotive-scroll";

// Array JSON

const collectionsInformations = [
  {
    id: 1,
    titleCollection: "Summer",
    nameThumb: 'https://images.unsplash.com/photo-1660299678227-30da3150f1f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
  },
  {
    id: 2,
    titleCollection: "Spring",
    nameThumb: 'https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    id: 3,
    titleCollection: "Moonlight",
    nameThumb: 'https://images.unsplash.com/photo-1533962630115-0d5352dbb66f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80'
  }
]

// Global Variables

const getThumbnailsContainer = document.querySelector('.collections--cards');

// Home Part

function initHomeView() {

  // Transition at the start

  TweenLite.from(document.querySelector('.welcome--section h3'), 0.5, {
    translateY: -20,
    autoAlpha: 0,
    ease: Power1.easeInOut,
  });

  TweenLite.from(document.querySelector('.welcome--section h1'), 0.5, {
    translateY: -20,
    autoAlpha: 0,
    ease: Power1.easeInOut,
  }, 0.25);

  TweenLite.from(document.querySelector('.welcome--section p'), 0.5, {
    translateY: -20,
    autoAlpha: 0,
    ease: Power1.easeInOut,
  }, 0.5);

  gsap.from(document.querySelector('.welcome--section button'), 0.5, {
    translateY: -20,
    autoAlpha: 0,
    ease: Power1.easeOut,
  }, 0.75);

  document.querySelectorAll('.welcome--section .right img').forEach(img => {
    TweenLite.from(img, 1, {
      translateX: 0,
      translateY: 50,
      autoAlpha: 0,
      ease: Power1.easeInOut,
    }, '-=0.5');
  })

  // Creating Parallax Effect

  document.addEventListener('mousemove', parallax);

  function parallax(e) {
    this.querySelectorAll('.left, .right img').forEach(img => {
      const speed = img.getAttribute('data-parallax-speed');

      const x = (window.innerWidth - e.pageX * speed) / 70
      const y = (window.innerHeight - e.pageY * speed) / 70

      TweenLite.to(img, 1, {
        translateX: x,
        translateY: y,
        ease: Power1.easeOut,
      });
    })
  }

  // Transition on Button

  const getButton = document.querySelector('.welcome--section button');

  getButton.addEventListener('click', (e) => transitionStart('.welcome--section', '.collections--section'));

  function transitionStart(currentActive, nextActive) {

    TweenLite.to(document.querySelector(currentActive), 1, {
      translateY: -50,
      autoAlpha: 0,
      ease: Power1.easeInOut,
    });

    setTimeout(() => {
      document.querySelector(currentActive).classList.replace('section--active', 'section--inactive')
    }, 1000);

    initCollectionsView();

    setTimeout(() => {
      document.querySelector(nextActive).classList.replace('section--inactive', 'section--active')
    }, 1000);
  }

}

function initCollectionPicturesView(currentSectionActive, nextSectionActive, collectionId) {

  // Create Transition
  TweenLite.to(document.querySelector(currentSectionActive), 1, {
    translateY: -50,
    autoAlpha: 0,
    ease: Power1.easeInOut,
  });

  document.querySelector('.collections--section .collections--informations .container h3').style.animation = 'opacityMoveOut 1s 1 0s cubic-bezier(0.42, 0, 0, 1) both';
  document.querySelector('.collections--section .collections--informations .container h1').style.animation = 'opacityMoveOut 1s 1 0.3s cubic-bezier(0.42, 0, 0, 1) both';
  document.querySelector('.collections--section .collections--informations .container button').style.animation = 'opacityMoveOut 1s 1 0.6s cubic-bezier(0.42, 0, 0, 1) both';

  setTimeout(() => {
    document.querySelector(currentSectionActive).classList.replace('section--active', 'section--inactive')
  }, 1000);

  setTimeout(() => {
    document.querySelector(nextSectionActive).classList.replace('section--inactive', 'section--active')
  }, 1000);
}

// Create Thumbnail Class for initCollectionsView()

class Card {
  constructor(dataId, dataTitle, dataImg) {
    this.dataId = dataId;
    this.dataTitle = dataTitle;
    this.dataImg = dataImg
  }

  createCard() {
    return this.dataId, this.dataTitle, this.dataImg
  }
}

function createCards() {

  collectionsInformations.forEach(function (element, index) {
    
    let thumbnail = new Card(collectionsInformations[index].id, collectionsInformations[index].titleCollection, collectionsInformations[index].nameThumb)
    thumbnail.createCard();

    getThumbnailsContainer.innerHTML += '<div class="section" data-scroll-section data-id=' + thumbnail.dataId + ' data-redirection="collection--'+ thumbnail.dataTitle + ' collection--'+ thumbnail.dataId +'"><div data-scroll="" data-scroll-repeat="true" data-scroll-call="first"></div><div class="card" data-scroll-direction="vertical"><img src=' + thumbnail.dataImg + '></img></div></div>';
  });
}

createCards();

function initCollectionsView() {

  let getInformationsThumbnailsContainer = document.querySelector('.collections--informations');

  // Generate Dynamic HTML at the start

  getInformationsThumbnailsContainer.innerHTML = '<div class="container"><h3>Collection</h3><h1>'+ collectionsInformations[0].titleCollection +'</h1><button> Voir cette collection </button></div>';

  // Get Current Button of Collection

  let getInformationsThumbnailsButton = document.querySelector('.collections--informations button');

  // Transition to PicturesCollectionView

  getInformationsThumbnailsButton.onclick = () => {
    initCollectionPicturesView('.collections--section', '.collection--pictures', collectionsInformations[0].id);
  }
  
  // Get all elements after the HTML generated

  const getCollectionTitle = document.querySelector('.collections--informations h1');
  const getHeadingTitle = document.querySelector('.collections--informations h3');
  const getButton = document.querySelector('.collections--informations button');

  //  Animations each element at the start

  getHeadingTitle.style.animation = 'opacityMoveIn 1s 1 cubic-bezier(0.42, 0, 0, 1) .7s both'
  getCollectionTitle.style.animation = 'opacityMoveIn 1s 1 cubic-bezier(0.42, 0, 0, 1) .9s both';
  getButton.style.animation = 'opacityMoveIn 1s 1 cubic-bezier(0.42, 0, 0, 1) 1.1s both';
  getThumbnailsContainer.style.animation = 'opacityMoveIn 2s 1 cubic-bezier(0.42, 0, 0, 1) 0s both';

  // Create Parallax on text elements

  document.addEventListener('mousemove', parallax);

  function parallax(e) {
    this.querySelectorAll('.collections--section .collections--informations').forEach(element => {

      const speed = element.getAttribute('data-parallax-speed');

      const x = (window.innerWidth - e.pageX * speed) / 70
      const y = (window.innerHeight - e.pageY * speed) / 70

      TweenLite.to(element, 1, {
        translateX: x, 
        translateY: y,
        ease: Power1.easeOut,
      });
    })
  }

}

window.addEventListener('load', (e) => {
  e.preventDefault();
  initHomeView();
})

window.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault();
})


// Implements Locomotive Scroll Effect

window.addEventListener('load', () => {

  setTimeout(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: !0,
      offset: ["30%", 100],
      scrollFromAnywhere: true,
      multiplier: 1,
      getDirection: true,
      reloadOnContextChange: true,
      smoothMobile: 0,
      smartphone: {
        smooth: !0,
        breakpoint: 766
      },
      tablet: {
        smooth: !0,
        breakpoint: 1010
      },
    });

    scroll.on('scroll', (e) => {
      let getCurrentItem = document.querySelector('.is-inview');

      if (getCurrentItem) {

        let getCurrentItemParentId = getCurrentItem.parentNode.getAttribute('data-id');

        document.querySelector('.collections--section .collections--informations .container h3').style.animation = 'opacityMoveIn 1s 0s 1 cubic-bezier(0.42, 0, 0, 1) both';
        document.querySelector('.collections--section .collections--informations .container h1').style.animation = 'opacityMoveIn 1s 0.3s 1 cubic-bezier(0.42, 0, 0, 1) both';
        document.querySelector('.collections--section .collections--informations .container button').style.animation = 'opacityMoveIn 1s 0.6s 1 cubic-bezier(0.42, 0, 0, 1) both';

        document.querySelector('.collections--section .collections--informations .container h3').textContent = 'Collection'
        document.querySelector('.collections--section .collections--informations .container h1').textContent = collectionsInformations[getCurrentItemParentId - 1].titleCollection
        document.querySelector('.collections--section .collections--informations .container button').onclick = () => {initCollectionPicturesView('.collections--section', '.collection--pictures', collectionsInformations[getCurrentItemParentId - 1].id)}
      } else {
        document.querySelector('.collections--section .collections--informations .container h3').style.animation = 'opacityMoveOut 1s 1 0s cubic-bezier(0.42, 0, 0, 1) both';
        document.querySelector('.collections--section .collections--informations .container h1').style.animation = 'opacityMoveOut 1s 1 0.3s cubic-bezier(0.42, 0, 0, 1) both';
        document.querySelector('.collections--section .collections--informations .container button').style.animation = 'opacityMoveOut 1s 1 0.6s cubic-bezier(0.42, 0, 0, 1) both';
      }

    })
  }, 2000);

})

// Collection Pictures Gallery Part

