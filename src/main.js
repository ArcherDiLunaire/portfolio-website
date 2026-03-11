import './style.scss'
import data from './data.json'

const menu = document.querySelector('#menu');
const menuButton = document.querySelector("#menu-button");
const aboutButton = document.querySelector("#about-button");
const projects = document.querySelector("#projects");
const about = document.querySelector("#about");

initMenu();

toggleMenu();

aboutButton.addEventListener("click", () => {
  menu.classList.add("hidden");
  menuButton.innerHTML = menu.classList.contains("hidden") ? "Projects" : "Close";
  projects.classList.add("hidden");
  about.classList.remove("hidden");
});

menuButton.addEventListener("click", () => {
  toggleMenu();
});

function initMenu() {
  const gridContainer = document.createElement('ul');
  const projects = data.projects;
  gridContainer.classList.add('grid-container');
  projects.forEach(project => {
    const gridItem = document.createElement('li');
    gridItem.classList.add('grid-item');
    gridItem.style.backgroundColor = project.backgroundColor;
    gridItem.style.backgroundImage = `url(${project.thumbnail})`;
    gridItem.onclick = () => insertProjects(project);
    const tagsWrapper = document.createElement('div');
    tagsWrapper.classList.add("tags-wrapper");
    if (project.tags) {
      project.tags.forEach(tag => {
        const el = document.createElement('h4');
        el.style.color = project.highlightColor;
        el.style.backgroundColor = project.backgroundColor;
        el.style.borderColor = project.highlightColor;
        el.textContent = tag;
        tagsWrapper.appendChild(el);
      });
    }
    const logo = document.createElement('img');
    logo.classList.add("logo-icon");
    logo.src = project.logo;
    const itemWrapper = document.createElement('div');
    itemWrapper.classList.add("item-wrapper");
    itemWrapper.appendChild(logo);
    itemWrapper.appendChild(tagsWrapper);
    gridItem.appendChild(itemWrapper);
    gridContainer.appendChild(gridItem);
  });
  menu.appendChild(gridContainer);
}

function toggleMenu() {
  menu.classList.toggle("hidden");
  menuButton.innerHTML = menu.classList.contains("hidden") ? "Projects" : "Close";
}

function insertProjects(project) {
  toggleMenu();
  console.log("Insert project:", project);
  document.documentElement.style.setProperty('--display-height', `${window.innerHeight}px`);
  projects.innerHTML = '';
  projects.style.backgroundColor = project.backgroundColor;
  projects.style.color = project.fontColor;
  projects.innerHTML = `
	<div class="hero section">
    <div class="box">
      <div class="titles">
				<h2 id="title" style="color: ${project.highlightColor}">${project.title}</h2>
				<h1>${project.subtitle}</h1>
        ${project.link ?
      `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="link border-btn">
          <div class="link-content">
            <span>Visit project page</span>
            <svg viewBox="0 -6.5 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>right-arrow</title> <desc>Created with Sketch.</desc> <g id="icons" stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="ui-gambling-website-lined-icnos-casinoshunter" transform="translate(-212.000000, -159.000000)" fill-rule="nonzero"> <g id="square-filled" transform="translate(50.000000, 120.000000)"> <path d="M187.108012,39.2902857 L197.649804,49.7417043 L197.708994,49.7959169 C197.889141,49.9745543 197.986143,50.2044182 198,50.4382227 L198,50.5617773 C197.986143,50.7955818 197.889141,51.0254457 197.708994,51.2040831 L197.6571,51.2479803 L187.108012,61.7097143 C186.717694,62.0967619 186.084865,62.0967619 185.694547,61.7097143 C185.30423,61.3226668 185.30423,60.6951387 185.694547,60.3080911 L194.702666,51.3738496 L162.99947,51.3746291 C162.447478,51.3746291 162,50.9308997 162,50.3835318 C162,49.8361639 162.447478,49.3924345 162.99947,49.3924345 L194.46779,49.3916551 L185.694547,40.6919089 C185.30423,40.3048613 185.30423,39.6773332 185.694547,39.2902857 C186.084865,38.9032381 186.717694,38.9032381 187.108012,39.2902857 Z M197.115357,50.382693 L186.401279,61.0089027 L197.002151,50.5002046 L197.002252,50.4963719 L196.943142,50.442585 L196.882737,50.382693 L197.115357,50.382693 Z" id="right-arrow"> </path> </g> </g> </g> </g></svg>
          </div>
        </a>`: ''}
        </div>
			</div>
    ${project.heroImage.includes("mp4") ?
      `<video class="hero_image" src="${project.heroImage}" playsinline muted autoplay loop></video>` :
      `<img class="hero_image" src="${project.heroImage}">`
    }
	</div>
  <div class="tags-wrapper">
      ${project.tags ? project.tags.map(tag =>
      `<h4 style="color: ${project.footerFontColor}; background-color: ${project.highlightColor};">${tag}</h4>`).join('') : ''
    }
    </div>
	<div class="text section">
		<div class="center-content">
			<h3 class="section-text">
        ${project.description}
			</h3>
		</div>
	</div>

	<div class="video section">
  ${project.videoURL ?
      `<iframe src="${project.videoURL}" width="640" height="360" frameborder="0"
			allow="fullscreen;" allowfullscreen></iframe>`
      : ''}
	</div>

	<div class="images section">
    ${project.images ? project.images.map(image =>
        image.includes("mp4") ? `<video src="${image}" playsinline muted autoplay loop></video>` :
          `<img src="${image}">`).join('') : ''}
	</div >

  <footer style="background-color: ${project.highlightColor}; color: ${project.footerFontColor} ">
    <div class="info">
      <p>${project.footer}</p>
     ${project.logo ? `<img class="logo" src="${project.logo}">` : ''} 
    </div>
    <h10> Copyright &copy; - Archer Dilunaire - 2025 </h10>
  </footer>
</div > `;

  projects.classList.remove("hidden");
  about.classList.add("hidden");
  window.scrollTo(0, 0);
}

const fonts = document.querySelectorAll('font');
fonts.forEach(function (font) {
  font.addEventListener('mouseenter', function () {
    var initialText = this.textContent;
    this.dataset.initialtext = initialText;
    this.textContent = this.dataset.toggletext;
  });

  font.addEventListener('mouseleave', function () {
    this.textContent = this.dataset.initialtext;
  });
});
