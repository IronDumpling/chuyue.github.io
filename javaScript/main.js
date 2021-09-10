/* Menu */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

/* MENU SHOW */
if(navToggle){
    navToggle.addEventListener('click', function (){
        navMenu.classList.add('show_menu');
    })
}

/* MENU HIDDEN */
if(navClose){
    navClose.addEventListener('click', function (){
        navMenu.classList.remove('show_menu');
    })
}

/* REMOVE MENU MOBILE */
const navLink = document.querySelectorAll('.nav_link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show_menu');
}

navLink.forEach(n => n.addEventListener('click', linkAction));

/* ACCORDION SKILLS */
const skillsContent = document.getElementsByClassName('skills_content');
const skillsHeader = document.querySelectorAll('.skills_header'); // 选择所有的skill_header

function toggleSkills(){
    let itemClass = this.parentNode.className;

    // Function 1. Open -> Close All the Others
    for(let i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills_content skills_close';
    }

    // Function 2. Close-> Open
    if(itemClass === 'skills_content skills_close'){
        this.parentNode.className = 'skills_content skills_open';
    }
}

skillsHeader.forEach(function (element){
    element.addEventListener('click', toggleSkills);
});


/* Experiences Buttons */
const expData = document.getElementsByClassName('experiences_data');
const expGuide = document.querySelectorAll('.experiences_guide');

function toggleExp(){
    let itemClass = this.parentNode.className;

    // Function 1. Open -> Close All the Others
    for(let i = 0; i < expData.length; i++){
        expData[i].className = 'experiences_data experience_close';
    }

    // Function 2. Close-> Open
    if(itemClass === 'experiences_data experience_close'){
        this.parentNode.className = 'experiences_data experience_open';
    }
}

function columnExp(){
    let itemClass = this.parentNode.className;

    // Function 1. All Close 80%+20%
    let isAllClose = true;
    for(let i = 0; i < expData.length; i++){
        if(itemClass === 'experiences_data experience_open') isAllClose = false;
    }

    if(isAllClose){
        for(let i = 0; i < expData.length; i++){
            expData[i].style.gridTemplateColumns = '90% 10%';
        }
    }
    // Function 2. One Open 1fr+max+1fr
    else{
        for(let i = 0; i < expData.length; i++){
            expData[i].style.gridTemplateColumns = '1fr max-content 1fr';
        }
    }
}

expGuide.forEach(function (element){
    element.addEventListener('click', toggleExp);
    element.addEventListener('click', columnExp);
});

/* PORTFOLIO SWIPER */
let swiper = new Swiper(".portfolio_container", {
    cssMode: true,
    loop:true,

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    keyboard: true,
});

/*==================== Scroll Sections active link ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active_link');
        }else{
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active_link');
        }
    })
}
window.addEventListener('scroll', scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const nav = document.getElementById('header');
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll_header');
    else nav.classList.remove('scroll_header');
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL TOP ====================*/
function scrollTop(){
    const nav = document.getElementById('scroll-up');
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 560) nav.classList.add('show_scroll');
    else nav.classList.remove('show_scroll');
}
window.addEventListener('scroll', scrollTop);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})