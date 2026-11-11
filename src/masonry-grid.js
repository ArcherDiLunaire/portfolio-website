import './style.scss'
import data from './data.json'

const grid = document.getElementById('masonry-grid');

const items = data.grid;

/**
 * Generates the masonry items and appends them to the grid.
 */
function loadItems() {
    for (let i = 0; i <= items.length - 1; i++) {

        // Create the wrapper for the image (Masonry Item)
        const item = document.createElement('div');
        item.className = 'masonry-item';

        // if (items[i].endsWith('.mp4')) {
        //     const video = document.createElement('video');
        //     video.alt = `Gallery Experiments ${i}`;
        //     video.src = items[i];
        //     video.autoplay = true;
        //     video.loop = true;
        //     video.muted = true;
        //     video.playsInline = true;
        //     // When image fully loads, reveal it and remove the skeleton animation
        //     video.onloadeddata = () => {
        //         video.classList.add('loaded');
        //         video.pause();
        //     };
        //     video.addEventListener('mouseenter', () => {
        //         video.play();
        //         console.log(`Playing video: ${video.src}`);
        //     });

        //     video.addEventListener('mouseleave', () => {
        //         video.pause();
        //         console.log(`Paused video: ${video.src}`);
        //     });


        //     item.appendChild(video);
        // } else {
            // Create the image element
            const img = document.createElement('img');
            img.alt = `Gallery Experiments ${i}`;

            // Load actual image from picsum
            img.src = items[i];

            // When image fully loads, reveal it and remove the skeleton animation
            img.onload = () => {
                img.classList.add('loaded');
            };

            // Fallback to placehold.co if picsum fails to load
            img.onerror = () => {
                img.src = `https://placehold.co/100x100/e2e8f0/475569?text=Image+${i}`;
                img.onload = null; // Prevent infinite loop if fallback also fails
                img.classList.add('loaded');
                item.style.minHeight = 'auto';
            };


            // Assemble the DOM structure
            item.appendChild(img);
        // }
        grid.appendChild(item);
    }
}

// Initialize grid automatically when page loads
loadItems();
