import "/js/script.js"
let all_hcms, years, btns, activeBtn;
const btnsCont = document.querySelector('.dropdown-content');
const hcmSection = document.querySelector('.cards');
window.addEventListener("DOMContentLoaded", async () => {
    all_hcms = await fetch("/database/hcm.json").then(data => data.json()).then(hcms => hcms["hcms"])
    years = [...new Set(all_hcms.map(hcm => hcm.year))]
    btnsCont.innerHTML = `${years.map(yr =>  `<li class="year">${yr-1}-${yr%100}</li>` ).join("")}`
    btns = [...btnsCont.children];
    activeBtn = btns[0]
    activeBtn.classList.add('active'); // by default first one button is active.
    btns.forEach(btn => btn.addEventListener('click', updateHcms));
    hcmSection.innerHTML = get_HCMs(years[0]);
})

function updateHcms() {
    activeBtn.classList.remove('active');
    this.classList.add('active');
    activeBtn = this;
    let tenure = this.innerHTML;
    let year = parseInt(tenure.slice(0,4)) + 1;
    hcmSection.innerHTML = get_HCMs(year);
}

function get_HCMs(year) {
    // filter the all_hcms, so as to get only HCM of year = year.
    let year_hcm = all_hcms.filter(hcm => {
        if (hcm.year === year) {
            return hcm;
        }
    })
    const template = []
    let card = ``;
    for (let i = 0; i < year_hcm.length; i++) {
        card = `<div class="single-team">
        <div class="img-area">
          <img
          src=${year_hcm[i].imgSrc}
          class="img-responsive"
          alt=""
          />
          <div class="social centre-bs">
            <ul class="list-inline">
              <li style="${year_hcm[i].f_link === '#'?'cursor:not-allowed;':''}">
              <a style="${year_hcm[i].f_link === '#'?'visibility:hidden;':''}" href=${year_hcm[i].f_link} rel="noopener" target="${year_hcm[i].f_link !== '#'?"_blank":""}" aria-label="${year_hcm[i].f_link !== '#'?"link to facebook profile":""}"><i class="fa-brands fa-facebook-f"></i></a>
            </li style="${year_hcm[i].email_link === '#'?'cursor:not-allowed;':''}">
            <li>
              <a style="${year_hcm[i].email_link === '#'?'visibility:hidden;':''}" href=${year_hcm[i].email_link} rel="noopener" target="${year_hcm[i].email_link !== '#'?"_blank":""}" aria-label="${year_hcm[i].email_link !== '#'?"email link":""}"><i class="fa fa-envelope"></i></a>
            </li>
            <li style="${year_hcm[i].in_link === '#'?'cursor:not-allowed;':''}">
              <a style="${year_hcm[i].in_link === '#'?'visibility:hidden;':''}" href=${year_hcm[i].in_link} rel="noopener" target="${year_hcm[i].in_link !== '#'?"_blank":""}" aria-label="${year_hcm[i].in_link !== '#'?"link to linked-in profile":""}"><i class="fa-brands fa-linkedin-in"></i></a>
            </li>
          </ul>
        </div>
      </div>
      <div class="img-text">
        <div>
          <h4>${year_hcm[i].name}</h4>
          <h5>${year_hcm[i].position}</h5>
        </div>
      </div>
    </div>`;
        template.push(card);
    }
    const completeTemplate = template.join('');
    return completeTemplate
}
