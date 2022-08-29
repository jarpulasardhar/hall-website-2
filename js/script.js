const hamburger = document.querySelector("#hamburger");
const navbar = document.querySelector("nav");
const menuToggle = document.getElementById("menuToggle");
const ulist = document.querySelector(".ulist");
const bi_arrow_right = document.querySelector(".fa-right-long");
const bi_arrow_left = document.querySelector(".fa-left-long");
const sub_ulist = document.querySelector("ul.sub-ulist");

hamburger.addEventListener("click", () => {
    navbar.classList.toggle("hide");
    menuToggle.classList.toggle("bars")
    menuToggle.classList.toggle("closeIcon")
});

bi_arrow_right.onclick = function () {
    ulist.classList.add("overlay");
    ulist.classList.remove("ulist");
    sub_ulist.classList.toggle('sub-ulist');
}

bi_arrow_left.onclick = function () {
    ulist.classList.remove("overlay");
    ulist.classList.add("ulist");
    sub_ulist.classList.toggle('sub-ulist');
}



