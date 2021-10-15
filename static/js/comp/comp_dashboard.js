const qSelector = (query) => document.querySelector(query);

async function getCompProfile() {
  const URL = `http://127.0.0.1:5000/get_comp_profile`;
  const settings = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwtoken")}`,
    },
  };
  try {
    const response = await fetch(URL, settings);
    let response_db;
    if (response.ok) response_db = await response.json();
    console.log(response_db);

    const company_name = qSelector("span.company_name");
    company_name.innerHTML = `${response_db[0].company_name}`;
    const location = qSelector(".location");

    location.innerHTML = `${response_db[0].location}`;

    // const skills = qSelector(".devSkills");
    // response_db[0].skills.forEach((skill) => {
    //   skills.innerHTML += `<div  class="col d-flex text-center text-center flex-column bg-light text-dark"><i style="font-size: 1.6rem;" class="devicon-${skill.name}-plain"></i><span>${skill.name}</span></div>`;
    // });
    const description = qSelector("p.description");
    description.innerHTML = response_db[0].description;
  } catch (error) {
    console.log(error);
  }
}

getCompProfile();

const deleteForm = document.querySelector("#delete_dev");
deleteForm.addEventListener("click", deleteDev);

async function deleteDev(e) {
  e.preventDefault();

  const URL = `http://127.0.0.1:5000/delete_dev_account`;
  const settings = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwtoken")}`,
    },
  };
  try {
    let resp_db;
    const response = await fetch(URL, settings);

    if (response.ok) resp_db = await response.json();
    console.log(resp_db);
    sessionStorage.clear();
    window.location.href = "../index.html";
  } catch (error) {
    console.log(error);
  }
}
