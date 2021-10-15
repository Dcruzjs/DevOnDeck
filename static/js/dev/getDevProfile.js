import BASE_URL from "../BASE_URL";

async function getDevProfile() {
  const URL = `${BASE_URL}/get_dev_profile`;
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

    const first_name = document.querySelector("#first_name");
    first_name.value = `${response_db[0].first_name}`;

    const last_name = document.querySelector("#last_name");
    last_name.value = `${response_db[0].last_name}`;

    const email = document.querySelector("#email");
    email.value = response_db[0].email;
    const location = document.querySelector("#location");

    const position = document.querySelector(`#${response_db[0].position}`);
    position.checked = true;

    const genre = document.querySelector(
      `#${response_db[0].genre.toLowerCase()}`
    );
    genre.checked = true;

    location.value = `${response_db[0].location}`;

    const description = document.querySelector("#description");
    description.innerText = response_db[0].description;
  } catch (error) {
    console.log(error);
  }
}

getDevProfile();
