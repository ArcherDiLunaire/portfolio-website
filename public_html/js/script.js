let menu;
let menuButton;
let menuItems;
let backColor;
let titleColor;
let style;
let pageContent;


document.addEventListener('DOMContentLoaded', function () {

    menu = document.getElementById("menu");
    menuButton = document.getElementById("menu-button");
    pageContent = document.getElementById("page-content");

    appendNewContent('About.html');

    var fonts = document.querySelectorAll('font');

    fonts.forEach(function (font) {
        font.addEventListener('mouseover', function () {
            console.log("hello");
            this.dataset.initialtext = this.textContent;
            this.textContent = this.dataset.toggletext;
        });

        font.addEventListener('mouseleave', function () {
            this.textContent = this.dataset.initialtext;
        });
    });

    // CHANGING CONTENT ON MENU CLICK
    menuItems = document.querySelectorAll('ul > li');
    menuItems.forEach(function (item) {
        item.addEventListener('click', function () {
            menuItems.forEach(function (item) {
                item.classList.remove('active');
            });
            this.classList.add('active');

            var name = this.children[0].innerHTML;
            var page = name + ".html";
            appendNewContent(page);

            // ADD BACKGROUND COLOR AND TITLE COLOR TO CONTENT
            backColor = window.getComputedStyle(this).getPropertyValue("background-color");
            titleColor = window.getComputedStyle(this.children[0]).getPropertyValue("color");

            document.addEventListener('ajaxComplete', function () {
                document.getElementById("style").style.backgroundColor = backColor;
                document.getElementById("title").style.color = titleColor;
            });
        });
    });
});

// GETTING THE CONTENT INTO THE GALLERY
function appendNewContent(page) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', page, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            pageContent.innerHTML = "";
            pageContent.insertAdjacentHTML("afterbegin", xhr.responseText);

            setStyle(pageContent);
            hideMenu();
        }
    };
    xhr.send();
}

function setStyle(p) {
    let s = p.querySelector("#style");
    if (s) {
        s.style.backgroundColor = backColor;
        s.querySelector("#title").style.color = backColor;
        s.querySelector("#title").style.backgroundColor = titleColor;
        s.querySelector("footer").style.backgroundColor = titleColor;
        s.querySelector("footer").style.color = backColor;
    }
}

function showMenu() {
    if (menuButton.classList.contains("active")) return;
    menuButton.innerHTML = "Close";
    menu.classList.remove("hidden");
    menuButton.classList.add("active");
    setTimeout(() => {
        pageContent.classList.add("no-scroll");
    }, 1000);
}

function hideMenu() {
    if (menu.classList.contains("hidden")) return;
    menuButton.innerHTML = "Projects";
    menu.classList.add("hidden");
    menuButton.classList.remove("active");
    pageContent.classList.remove("no-scroll");
}