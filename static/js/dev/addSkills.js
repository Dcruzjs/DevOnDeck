async function addSkills(skills) {
  const URL = `http://127.0.0.1:5000/add_dev_skills`;
  const settings = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwtoken")}`,
    },
    body: skills,
  };
  // debugger;
  //   headers : {
  // 'Authorization' : `Bearer ${token}`
  // },
  // body: JSON.stringify( data )
  // }
  try {
    const response = await fetch(URL, settings);
    let response_db;

    if (response.ok) response_db = await response.json();
    console.log(response_db);
    window.location.href = `./developer_dashboard.html`;
  } catch (error) {
    console.log("ERROR =>", error);
  }
}
// export { addSkills };
export default addSkills;
