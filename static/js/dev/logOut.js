const logOut = document.querySelector(".navbar");
logOut.addEventListener("click", logOutCallBack);

function logOutCallBack(e) {
  sessionStorage.clear();
}
