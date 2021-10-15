import addSkills from "./addSkills.js";
import BASE_URL from "../BASE_URL.js";
const qSelector = (query) => document.querySelector(query);
const qSAll = (query) => document.querySelectorAll(query);

getSkills();
const form = qSelector("#skills_form");
form.addEventListener("submit", validateSkills);

function validateSkills(e) {
  e.preventDefault();
  let is_valid = true;

  const checkedSkills = qSAll("input:checked");

  if (checkedSkills.length < 1) {
    is_valid = false;
    const skillsContainer = qSelector("#skills_form");
    // console.log(skillsContainer);
    const p = document.createElement("p");
    p.classList.add("errorMsg");
    p.style.cssText = "color: red; font-weight: bold;";
    p.innerHTML = `<i class="fas validation fa-exclamation-circle"></i>You must provide at least 1 skill.`;
    if (skillsContainer.children.length < 7) skillsContainer.appendChild(p);
  }

  if (is_valid) {
    const errorMsgs = qSAll(".errorMsg");
    errorMsgs.forEach((msg) => msg.remove());

    console.log("is valid => ", is_valid);

    let skills = Array.from(checkedSkills);
    skills = skills.map((elem) => ({ id: elem.id, name: elem.name }));
    skills = JSON.stringify(skills);
    console.log(skills);
    addSkills(skills);
  }
}

async function getSkills() {
  let skills = null;
  const skillsContainer = qSelector(".skills_container");
  try {
    const response = await fetch("${BASE_URL}/get_skills");
    // console.log("RESPONSE", response);
    if (response.ok) skills = await response.json();
    // console.log("SKILLS", skills);

    for (let i = 0; i < skills.length; i -= -1) {
      const skill = `<div class="col-4 col-md-3 offset-md-0 border  text-center">
                      <input type="checkbox" class="btn-check" id="${skills[i].skill_id}" name="${skills[i].name}" value="${skills[i].name}">
                      <label class="btn d-flex flex-column" for="${skills[i].skill_id}"><i class="devicon-${skills[i].name}-plain"></i><span>${skills[i].name}</span></label>
                  </div>`;
      skillsContainer.innerHTML += skill;
    }
  } catch (error) {
    console.log(error);
  }
}
