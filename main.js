import $ from 'jquery'
import Scrollbar from 'smooth-scrollbar'

import 'slick-carousel'

import './src/css/style.css'
import './src/css/tailwind.css'

import './node_modules/slick-carousel/slick/slick.css'
import './node_modules/slick-carousel/slick/slick-theme.css'

$(function () {
  $('.nav-toggler').each(function (_, navToggler) {
    const target = $(navToggler).data('target')
    $(navToggler).on('click', function () {
      $(target).animate({
        height: 'toggle',
      })
    })
  })
})

$('.card-slider').slick({
  slidesToShow: 3,
  autoplay: true,
  slidesToScroll: 1,
  dots: false,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
})

let cards = document.querySelectorAll('.card')
let cardTitle = document.querySelectorAll('.card__title')
let cardCategory = document.querySelectorAll('.card__category')
let card
let modal = document.querySelector('.modal')
let modalTitle = document.querySelector('.modal__title')
let modalCategory = document.querySelector('.modal__category')
let closeButton = document.querySelector('.modal__close-button')
const cardBgImage = document.querySelector('.card__background-image')
let page = document.querySelector('.page')

const cardBorderRadius = 20
const openingDuration = 600 //ms
const closingDuration = 600 //ms
const timingFunction = 'cubic-bezier(.76,.01,.65,1.38)'

Scrollbar.init(document.querySelector('.modal__scroll-area'))

function flipAnimation(first, last, options) {
  let firstRect = first.getBoundingClientRect()
  let lastRect = last.getBoundingClientRect()

  let deltas = {
    top: firstRect.top - lastRect.top,
    left: firstRect.left - lastRect.left,
    width: firstRect.width / lastRect.width,
    height: firstRect.height / lastRect.height,
  }

  return last.animate(
    [
      {
        transformOrigin: 'top left',
        borderRadius: `
                    ${cardBorderRadius / deltas.width}px / ${
          cardBorderRadius / deltas.height
        }px`,
        transform: `
                        translate(${deltas.left}px, ${deltas.top}px)
                        scale(${deltas.width}, ${deltas.height})`,
      },
      {
        transformOrigin: 'top left',
        transform: 'none',
        borderRadius: `${cardBorderRadius}px`,
      },
    ],
    options
  )
}

cards.forEach((item) => {
  item.addEventListener('click', (e) => {
    $('.card-slider').slick('slickPause')
    card = e.currentTarget
    page.dataset.modalState = 'opening'
    card.classList.add('card--opened')
    card.style.opacity = 0
    document.querySelector('body').classList.add('no-scroll')

    // change modal bgImage based on card that is clicked
    cardBgImage.src = e.target.firstElementChild.src

    modalCategory.innerHTML = e.target.nextElementSibling.innerHTML

    modalTitle.innerHTML =
      e.target.nextElementSibling.nextElementSibling.innerHTML
    // console.log(e);

    let animation = flipAnimation(card, modal, {
      duration: openingDuration,
      easing: timingFunction,
      fill: 'both',
    })

    animation.onfinish = () => {
      page.dataset.modalState = 'open'
      animation.cancel()
    }
  })
})

closeButton.addEventListener('click', (e) => {
  page.dataset.modalState = 'closing'
  document.querySelector('body').classList.remove('no-scroll')

  let animation = flipAnimation(card, modal, {
    duration: closingDuration,
    easing: timingFunction,
    direction: 'reverse',
    fill: 'both',
  })

  animation.onfinish = () => {
    page.dataset.modalState = 'closed'
    card.style.opacity = 1
    card.classList.remove('card--opened')
    $('.card-slider').slick('slickPlay')
    animation.cancel()
  }
})

const getContents = async (url) => await fetch(url).then((res) => res.json())

getContents('https://api.github.com/orgs/bellshade/members').then((members) => {
  const membersContainer = document.querySelector('#team #members')

  members.forEach((member) => {
    getContents(member.url).then((res) => {
      // console.log(res)
      membersContainer.innerHTML += `
              <div class="team-card m-5">
                <div class="team-img-container">
                  <div class="team-img">
                    <img src="${member.avatar_url}&s=80" alt="${
        member.login
      }" />
                  </div>
                  <a href="${res.html_url}" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </a>
                </div>
                <div class="team-body">
                  <h2 class="team-name">${
                    res.name == null ? res.login : res.name
                  }</h2>
                </div>
              </div>
            `
    })
  })
})
