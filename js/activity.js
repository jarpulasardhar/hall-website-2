function socialFunction(){
    document.getElementsByClassName("link")[0].classList.toggle("link_rotate");
    document.getElementById("social_dropdown").classList.toggle("show");
    document.getElementById("technology_dropdown").classList.remove("show");
    document.getElementById("sports_dropdown").classList.remove("show");
    document.getElementById("gymkhana_dropdown").classList.remove("show");
}

function sportsFunction(){
    document.getElementsByClassName("link")[2].classList.toggle("link_rotate");
    document.getElementById("sports_dropdown").classList.toggle("show");
    document.getElementById("social_dropdown").classList.remove("show");
    document.getElementById("technology_dropdown").classList.remove("show");
    document.getElementById("gymkhana_dropdown").classList.remove("show");
}

function technologyFunction(){
    document.getElementsByClassName("link")[1].classList.toggle("link_rotate");
    document.getElementById("technology_dropdown").classList.toggle("show");
    document.getElementById("sports_dropdown").classList.remove("show");
    document.getElementById("social_dropdown").classList.remove("show");
    document.getElementById("gymkhana_dropdown").classList.remove("show");
}

function gymkhanaFunction(){
    document.getElementsByClassName("link")[3].classList.toggle("link_rotate");
    document.getElementById("technology_dropdown").classList.remove("show");
    document.getElementById("sports_dropdown").classList.remove("show");
    document.getElementById("social_dropdown").classList.remove("show");
    document.getElementById("gymkhana_dropdown").classList.toggle("show");
}