async function getDevSkills() {
  const URL = `http://127.0.0.1:5000/get_dev_skills`;
  const settings = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwtoken")}`,
    },
  };
  try {
    let devSkills;
    const response = await fetch(URL, settings);
    if (response.ok) devSkills = await response.json();
    console.log(devSkills);

    const skillsDB = document.querySelectorAll("input.btn-check");
    console.log(skillsDB.length);

    for (let i = 0; i < skillsDB.length; i++) {
      for (let j = 0; j < devSkills.length; j++) {
        if (devSkills[j].name === skillsDB[i].name) {
          // console.log(skillsDB[i].name);
          // console.log(skillsDB[i]);
          skillsDB[i].checked = true;
        }
      }
    }
    console.log(skillsDB);
  } catch (error) {
    console.log(error);
  }
}

setTimeout(getDevSkills, 2000);
