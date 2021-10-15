import BASE_URL from "../BASE_URL";

async function getCompProfile() {
  const URL = `${BASE_URL}/get_comp_profile`;
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

    const company_name = document.querySelector("#company_name");
    company_name.value = `${response_db[0].company_name}`;

    const email = document.querySelector("#email");
    email.value = response_db[0].email;

    const location = document.querySelector("#location");
    location.value = response_db[0].location;

    const description = document.querySelector("#description");
    description.innerText = response_db[0].description;
  } catch (error) {
    console.log(error);
  }
}

getCompProfile();
