const qSelector = (query) => document.querySelector(query);
const qSAll = (query) => document.querySelectorAll(query);

const form = qSelector("#signup_form");
form.addEventListener("submit", upDate);

function validateEmail(input) {
  const regex = /[^@]+[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}/gm;
  return regex.test(input.value);
}

function validateName(input) {
  // console.log(input);

  const nameRegex = /([\d+\W+])/gi;

  return input.value.length >= 2 && !nameRegex.test(input.value);
}

function upDate(e) {
  e.preventDefault();
  let is_valid = true;
  // console.log(e.target);
  const fName = qSelector("#first_name");
  const lName = qSelector("#last_name");
  const email = qSelector("#email");
  const location = qSelector("#location");
  const position = qSelector(".position[type='radio']:checked");
  const genre = qSelector("input[name='genre']:checked");
  const desc = qSelector("#description");

  if (!validateName(fName)) {
    is_valid = false;
    const p = document.createElement("p");
    p.classList.add("errorMsg");
    p.style.cssText = "color: red; font-weight: bold;";
    p.innerHTML = `<i class="fas validation fa-exclamation-circle"></i>Invalid Name, It can't contain numbers or special characters, You must provide a name greater than 2 characters long.`;
    if (fName.parentNode.children.length < 3) fName.parentNode.appendChild(p);
  }
  if (!validateName(lName)) {
    is_valid = false;
    const p = document.createElement("p");
    p.classList.add("errorMsg");
    p.style.cssText = "color: red; font-weight: bold;";
    p.innerHTML = `<i class="fas validation fa-exclamation-circle"></i>Invalid Last Name, It can't contain numbers or special characters, You must provide a name greater than 2 characters long.`;
    if (lName.parentNode.children.length < 3) lName.parentNode.appendChild(p);
  }

  if (!validateEmail(email)) {
    is_valid = false;
    const p = document.createElement("p");
    p.classList.add("errorMsg");
    p.style.cssText = "color: red; font-weight: bold;";
    p.innerHTML = `<i class="fas validation fa-exclamation-circle"></i>Invalid email format, correct format is example@example.com`;
    if (email.parentNode.children.length < 3) email.parentNode.appendChild(p);
  }

  if (desc.value.length <= 2) {
    is_valid = false;
    const p = document.createElement("p");
    p.classList.add("errorMsg");
    p.style.cssText = "color: red; font-weight: bold;";
    p.innerHTML = `<i class="fas validation fa-exclamation-circle"></i>You must provide a brief description`;
    if (desc.parentNode.children.length < 3) desc.parentNode.appendChild(p);
  }

  if (position === null) {
    is_valid = false;
    console.log("POSITION NULL");
    const positionDiv = qSelector("div.positionRadios");
    const p = document.createElement("p");
    p.classList.add("errorMsg");
    p.style.cssText = "color: red; font-weight: bold;";
    p.innerHTML = `<i class="fas validation fa-exclamation-circle"></i>You must provide a position`;
    if (positionDiv.children.length < 6) {
      // console.log(positionDiv.children.length, p);
      // positionDiv.appendChild(p);
      positionDiv.appendChild(p);
    }
    // positionDiv.appendChild(p);
  }

  if (genre === null) {
    is_valid = false;
    const genreDiv = qSelector("div.genreRadios");
    const p = document.createElement("p");
    p.classList.add("errorMsg");
    p.style.cssText = "color: red; font-weight: bold;";
    p.innerHTML = `<i class="fas validation fa-exclamation-circle"></i>You must provide a genre`;
    if (genreDiv.children.length < 4) {
      genreDiv.appendChild(p);
    }
    // genreDiv.appendChild(p);
  }

  if (location === "" || location.value.length < 2) {
    is_valid = false;
    const p = document.createElement("p");
    p.classList.add("errorMsg");
    p.style.cssText = "color: red; font-weight: bold; ";
    p.innerHTML = `<i class="fas validation fa-exclamation-circle"></i>You must provide a location`;
    if (location.parentNode.children.length < 4)
      location.parentNode.appendChild(p);
  }
  if (is_valid) {
    const errorMsgs = qSAll(".errorMsg");
    errorMsgs.forEach((msg) => msg.remove());
    console.log("is valid => ", is_valid);
  }

  if (is_valid) {
    const formObj = new FormData(form);

    updateDev(formObj);
  }
}

async function updateDev(formObj) {
  const URL = `http://127.0.0.1:5000/update_dev_profile`;
  const settings = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwtoken")}`,
    },
    body: formObj,
  };
  try {
    const response = await fetch(URL, settings);
    let response_db;

    if (response.ok) response_db = await response.json();
    console.log(response_db);

    window.location.href = "./edit_skills.html";
  } catch (error) {
    console.log("ERROR =>", error);
  }
}
