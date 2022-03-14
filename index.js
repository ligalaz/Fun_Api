import translate from "./translate.js"

const theme = document.querySelector(".theme")
const btn = document.querySelector(".control-button")
const sound = document.querySelector(".audio")
const eng = document.querySelector(".english")
const ru = document.querySelector(".russian")
const animation = document.querySelector(".main-animation")
const drop = document.querySelector(".drop-down-container")
const arrow = document.querySelector(".header-arrow ")
const arrowItem = document.querySelector(".arrow-item")
const language = document.querySelectorAll(".english, .russian")
const english = translate.en
const russian = translate.ru
const switcher = document.querySelector(".switcher")
let localActive = localStorage.getItem("active")
let localStart = localStorage.getItem("isStart")
let localTheme = localStorage.getItem("theme")
let isStart = false

/* main function */

async function load() {
  sound.currentTime = 0
  sound.play()
  var response = await fetch("https://icanhazdadjoke.com/slack")
  var data = await response.json()
  var cite = document.querySelector(".main-cite-item")
  cite.textContent = data.attachments[0].text
}

async function patsanCite() {
  sound.currentTime = 0
  sound.play()
  let response = await fetch("patsanmode.json")
  let data = await response.json()
  let cite = document.querySelector(".main-cite-item")
  cite.textContent = data[randomNumber(0, data.length - 1)].text
}

function randomNumber(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

btn.addEventListener("click", () => {
  animation.classList.add("animation-go")
  if (!isStart) {
    load()
  } else if (isStart) {
    patsanCite()
  }
})

/* animation & drop-down */

animation.addEventListener("animationend", () => {
  animation.classList.remove("animation-go")
})

arrow.addEventListener("click", () => {
  arrowItem.classList.toggle("arrow-top")
  drop.classList.toggle("drop-modify")
})

function getActive(event, classMod, arr) {
  event.preventDefault()
  for (let i = 0; i < arr.length; i++) {
    arr[i].classList.remove(classMod)
  }
  event.target.classList.add(classMod)
}

for (let i = 0; i < language.length; i++) {
  language[i].addEventListener("click", () => {
    getActive(event, "modify", language)
    localStorage.setItem("active", event.target.textContent)
  })
}

/* translate */

function getTranslate(lang) {
  const elems = document.querySelectorAll("[data-translate")
  elems.forEach((item) => {
    for (let key in lang) {
      if (key === item.dataset.translate) {
        item.textContent = lang[item.dataset.translate]
      }
    }
  })
}

eng.addEventListener("click", () => {
  let cite = document.querySelector(".main-cite-item")
  cite.textContent = "Continue"
  isStart = false
  localStorage.setItem("isStart", "false")
  getTranslate(english)
  localStorage.lang = JSON.stringify(english)
  return (isStart = false)
})

ru.addEventListener("click", () => {
  let cite = document.querySelector(".main-cite-item")
  cite.textContent = "Продолжаем"
  isStart = true
  localStorage.setItem("isStart", "true")
  getTranslate(russian)
  localStorage.lang = JSON.stringify(russian)
  return (isStart = true)
})

/*localStorage */

// Change start function

if (localStart) {
  localStart === "true" ? (isStart = true) : (isStart = false)
} else {
  isStart = false
}

// Change active
for (let i = 0; i < language.length; i++) {
  if (localActive) {
    localActive === language[i].textContent
      ? language[i].classList.add("modify")
      : null
  } else {
    language[0].classList.add("modify")
  }
}

// Change translate

function getLocalStorage() {
  if (localStorage.getItem("lang")) {
    const lang = localStorage.getItem("lang")
    getTranslate(JSON.parse(lang))
  }
}

window.addEventListener("load", getLocalStorage)

function setLocalStorage() {
  localStorage.setItem("lang", lang)
}
window.addEventListener("beforeunload", setLocalStorage)

/* load Start */

if (!isStart) {
  window.onload = load()
} else if (isStart) {
  window.onload = patsanCite()
}

/* theme */

switcher.addEventListener("click", () => {
  if (theme.dataset.theme == "dark") {
    theme.dataset.theme = "light"
    localStorage.setItem("theme", "light")
  } else if (theme.dataset.theme == "light") {
    theme.dataset.theme = "dark"
    localStorage.setItem("theme", "dark")
  }
})

if (localTheme) {
  theme.dataset.theme = localTheme
} else {
  theme.dataset.theme = "dark"
}
