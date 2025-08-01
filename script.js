function getThemeSetting() {
    return localStorage.getItem("theme") ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

function updateButton(buttonEl, isDark) {
    const newCta = isDark ? 'sun' : 'moon';
    buttonEl.setAttribute("aria-label", newCta);
    buttonEl.innerHTML = `<i class="fa-solid fa-${newCta}"></i>`;
}

function updateTheme(theme) {
    document.querySelector("body").setAttribute("data-theme", theme);
}

const button = document.querySelector("#theme-toggle");

let currentThemeSetting = getThemeSetting();

console.log(currentThemeSetting);

updateButton(button, currentThemeSetting === "dark");
updateTheme(currentThemeSetting);

button.addEventListener("click", () => {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    updateButton(button, newTheme === "dark");
    updateTheme(newTheme);
    currentThemeSetting = newTheme;
});

const slidesContainer = document.querySelector(".slide-container");
const slide = document.querySelector(".slide");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const numSlides = slidesContainer.children.length;

let slideIdx = 0;

nextButton.addEventListener("click", () => {
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft += slideWidth;
    if (slideIdx < numSlides - 1) {
        slideIdx++;
    } else if (slideIdx === numSlides - 1) {
        slidesContainer.scrollLeft = 0;
        slideIdx = 0;
    }
});

prevButton.addEventListener("click", () => {
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft -= slideWidth;
    if (slideIdx > 0) {
        slideIdx--;
    } else if (slideIdx === 0) {
        slidesContainer.scrollLeft = slideWidth * numSlides;
        slideIdx = numSlides - 1;
    }
});

const dialog = document.getElementById("expanded-preview");
const preview = dialog.querySelector("img");
const title = dialog.querySelector("h2");
const description = dialog.querySelector("p");
const link = dialog.querySelector("a");
const close = dialog.querySelector("button");

const contentMap = {
    "Tazkr": {
        "description": "A web App for managing and assigning tasks for project management through the usage of a kanban board. Built with a react front-end and a C# Dotnet backend.",
        "link": "#"
    },
    "Recipe App": {
        "description": "A web app for saving and viewing recipes. Recipes can either be scraped from a provided URL, or entered manually. Viewing Recipes allows you to manipulate the serving size and automatically adjust ingredient amounts. The project was built with a python flask back-end and a react front-end with a PostgreSQL database.",
        "link": "https://recipes.christianland.dev"
    },
    "Who's That Pokemon?": {
        "description": "A browser game that tests your ability to recognize various Pokemon by their silhouette. Built with HTML, CSS, and JavaScript.",
        "link": "https://christianmland.github.io/poke_guess/"
    },
    "Terminal Archive": {
        "description": "A web app for fetching, filtering, and viewing data about various steam ship lines. Filtered results can be downloaded as a formatted excel file. Developed for Odyssey Logisitics for private internal usage. Built with Python + Flask and deployed via AWS.",
        "link": "https://github.com/ChristianMLand/terminal-archive"
    },
    "Code Quizzer": {
        "description" : "A multiplayer browser-based quiz game developed for Coding Dojo to help train students. Instructors could create and host quizzes, while students could join and answer questions in real time while keeping track of their scores. Developed with Next JS and Prisma and deployed via Vercel.",
        "link": "https://code-quizzer.vercel.app"
    }
}

close.addEventListener("click", e => {
    dialog.close();
})

document.querySelectorAll(".slide").forEach(el => {
    el.addEventListener('click', e => {
        preview.src = el.firstChild.src;
        preview.alt = el.firstChild.alt;
        title.innerText = el.firstChild.alt;
        description.innerText = contentMap[el.firstChild.alt].description;
        link.href = contentMap[el.firstChild.alt].link;
        dialog.showModal();
    });
})

function clickAndDrag(selector, scroll_speed = 3, classOnEvent = 'grabbed_elem') {
    const slider = document.querySelector(selector);
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDown = true;
        slider.classList.add(classOnEvent);
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    
        // prevent default child behavior
        document.body.addEventListener('click', function( event ){
            if (slider.contains(event.target)) {
                event.preventDefault();
            }
        });
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove(classOnEvent);
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove(classOnEvent);
    });

    slider.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * scroll_speed; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
    });
}

clickAndDrag('.slide-container');

document.querySelectorAll("section").forEach((el, i) => {
    setTimeout(() => {
        el.style.transform = "translateY(0px)";
        el.style.opacity = 1;
    }, 150*(i+1));
})