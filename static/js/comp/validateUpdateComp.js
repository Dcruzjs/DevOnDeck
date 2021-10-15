import BASE_URL from "../BASE_URL";

const form = document.querySelector("#signup_form");
form.addEventListener("submit", updateComp);

function validateEmail(input) {
  const regex = /[^@]+[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}/gm;
  return regex.test(input.value);
}

function validateName(input) {
  // console.log(input);

  // const nameRegex = /([\d+\W+])/gi;
  // return input.value.length >= 2 && !nameRegex.test(input.value);
  return input.value.length >= 2;
}

function updateComp(e) {
  e.preventDefault();
  let is_valid = true;
  console.log(e.target);

  const fName = document.querySelector("#company_name");
  const email = document.querySelector("#email");
  const location = document.querySelector("#location");
  const desc = document.querySelector("#description");

  if (!validateName(fName)) {
    is_valid = false;
    const p = document.createElement("p");
    p.classList.add("errorMsg");
    p.style.cssText = "color: red; font-weight: bold;";
    p.innerHTML = `<i class="fas validation fa-exclamation-circle"></i>Invalid Name, You must provide a name greater than 2 characters long.`;
    if (fName.parentNode.children.length < 3) fName.parentNode.appendChild(p);
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

  if (location === "" || location.value.length < 2) {
    is_valid = false;
    const p = document.createElement("p");
    p.classList.add("errorMsg");
    p.style.cssText = "color: red; font-weight: bold; ";
    p.innerHTML = `<i class="fas validation fa-exclamation-circle"></i>You must provide a location`;
    if (location.parentNode.children.length < 4)
      location.parentNode.appendChild(p);
  }
  console.log("IS_VALID => ", is_valid);
  if (is_valid) {
    const errorMsgs = qSAll(".errorMsg");
    errorMsgs.forEach((msg) => msg.remove());
    console.log("is valid => ", is_valid);

    const formObj = new FormData(form);

    updateComp(formObj);
  }
}

async function updateComp(formObj) {
  const URL = `${BASE_URL}/update_comp_profile`;
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
    window.location.href = "./company_dashboard.html";
  } catch (error) {
    console.log("ERROR =>", error);
  }
}
