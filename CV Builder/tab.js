"use strict";

const body = document.body;
const bgColorsBody = ["#ffb457", "#ff96bd", "#9999fb", "#ffe797", "#cffff1"];

const pages = [
  "project-page",
  "job-page",
  "education-page",
  "certificate-page",
  "submit-page",
];
const menu = body.querySelector(".menu");
const menuItems = menu.querySelectorAll(".menu__item");
const menuBorder = menu.querySelector(".menu__border");
let activeItem = menu.querySelector(".active");

function clickItem(item, index) {
  menu.style.removeProperty("--timeOut");

  if (activeItem === item) return;

  if (activeItem) {
    activeItem.classList.remove("active");
  }

  item.classList.add("active");

  pages.forEach((page , index2)=>{
    const htmpage = document.getElementById(page);
    if(index2 == index) htmpage.classList.remove('d-none')
        else htmpage.classList.add('d-none')
  })
  activeItem = item;
  body.style.backgroundColor = bgColorsBody[index]
  offsetMenuBorder(activeItem, menuBorder);
}

function offsetMenuBorder(element, menuBorder) {
    const offsetActiveItem = element.getBoundingClientRect();
    const menuOffset = menu.getBoundingClientRect();
    
    const left = Math.floor(
      offsetActiveItem.left -
      menuOffset.left -
      (menuBorder.offsetWidth - offsetActiveItem.width) / 2
    ) + "px";
  
    menuBorder.style.transform = `translate3d(${left}, 0, 0)`;
  }
  

offsetMenuBorder(activeItem, menuBorder);

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => clickItem(item, index));
});

window.addEventListener("resize", () => {
  offsetMenuBorder(activeItem, menuBorder);
  menu.style.setProperty("--timeOut", "none");
});

async function loadCountries() {
  const response = await fetch("countries.html");
  const text = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");
  const template = doc.querySelector("#country-template");
  if (template) {
    document.getElementById("countries").innerHTML = template.innerHTML;
  }
}

loadCountries();
const countryInput = document.getElementById("country");
const provinceSection = document.getElementById("province-section");
const citySection = document.getElementById("city-section");
const provinceInput = document.getElementById("province");
const provincesDatalist = document.getElementById("provinces");
const cityInput = document.getElementById("city");
const citiesDatalist = document.getElementById("cities");

countryInput.addEventListener("input", () => {
  const selectedCountry = countryInput.value.trim();
  if (selectedCountry === "Iran") {
    provinceSection.style.display = "block";
    provinceInput.disabled = false;
    citySection.style.display = "none";
    cityInput.disabled = true;

    fetch("provinces.html")
      .then((response) => response.text())
      .then((data) => {
        const templateContainer = document.createElement("div");
        templateContainer.innerHTML = data;
        const template = templateContainer.querySelector("#province-template");
        if (template) {
          provincesDatalist.innerHTML = template.innerHTML;
        }
      })
      .catch((error) => console.error("Error loading provinces:", error));
  } else {
    provinceSection.style.display = "none";
    provinceInput.disabled = true;
    provincesDatalist.innerHTML = "";
    citySection.style.display = "block";
    cityInput.disabled = false;
    cityInput.removeAttribute("list");
    citiesDatalist.innerHTML = "";
  }
});

provinceInput.addEventListener("input", () => {
  const selectedProvince = provinceInput.value.trim().replace(/\s+/g, "-");
  if (selectedProvince) {
    citySection.style.display = "block";
    cityInput.disabled = false;
    cityInput.setAttribute("list", "cities");

    fetch("provinces.html")
      .then((response) => response.text())
      .then((data) => {
        const templateContainer = document.createElement("div");
        templateContainer.innerHTML = data;
        const templateId = selectedProvince + "-counties";
        const template = templateContainer.querySelector("#" + templateId);
        if (template) {
          citiesDatalist.innerHTML = template.innerHTML;
        } else {
          citiesDatalist.innerHTML = "";
          cityInput.removeAttribute("list");
        }
      })
      .catch((error) => console.error("Error loading cities:", error));
  }
});
async function loadNumCodes() {
  try {
    const response = await fetch("numcodes.html");
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    const template = doc.querySelector("#numcodes-template");
    if (template) {
      document.getElementById("phone-number-section").innerHTML =
        template.innerHTML;
    }

    const countrySelect = document.getElementById("countryCode");
    const phoneInput = document.getElementById("phoneNumber");

    if (countrySelect && phoneInput) {
      for (let i = 0; i < countrySelect.options.length; i++) {
        const opt = countrySelect.options[i];
        opt.setAttribute("data-fulltext", opt.textContent);
      }

      countrySelect.addEventListener("focus", restoreFullText);
      countrySelect.addEventListener("mousedown", restoreFullText);

      function restoreFullText() {
        for (let i = 0; i < countrySelect.options.length; i++) {
          const opt = countrySelect.options[i];
          opt.textContent = opt.getAttribute("data-fulltext");
        }
      }

      countrySelect.addEventListener("change", () => {
        const selectedOption =
          countrySelect.options[countrySelect.selectedIndex];
        const newPlaceholder = selectedOption.getAttribute("data-placeholder");
        phoneInput.placeholder = newPlaceholder;
        selectedOption.textContent = selectedOption.value;
      });

      const iranCountryCode = "+98";
      countrySelect.value = iranCountryCode;

      const event = new Event("change");
      countrySelect.dispatchEvent(event);
    }
  } catch (error) {
    console.error("Error loading number codes:", error);
  }
}

loadNumCodes();
