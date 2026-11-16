import './style.scss'
import data from './data.json'

const grid = document.getElementById('masonry-grid');

const items = data.grid;

/**
 * Generates the masonry items and appends them to the grid.
 */
function loadItems() {

    for (let i = 0; i <= items.length - 1; i++) {

        // Create the wrapper for the item (Masonry Item)
        const item = document.createElement('div');

        // Create the image element
        const img = document.createElement('img');
        img.alt = `Gallery Experiments ${i}`;

        // Load actual image from picsum
        img.src = items[i];

        // When image fully loads, reveal it and remove the skeleton animation
        img.onload = () => {
            img.classList.add('loaded');
            // Calculate aspect ratio logic to assign Grid spans dynamically
            let spanClass = '';
            const ratio = img.naturalWidth / img.naturalHeight;

            console.log(`Item ${i}: width=${img.naturalWidth}, height=${img.naturalHeight}, ratio=${ratio.toFixed(2)}`);


            if (img.naturalWidth > 1280) {
                spanClass = 'span-col-4 ';
                if (ratio < 0.4) {
                    spanClass += 'span-row-1';
                } else if (ratio <= 0.5){
                    spanClass += 'span-row-2';
                } else if (ratio < 0.75){
                    spanClass += 'span-row-3';
                } else {
                    spanClass += 'span-row-4';
                }
            } else if (img.naturalWidth > 980) {
                spanClass = 'span-col-3 ';
                if (ratio >= 1.5) {
                    spanClass += 'span-row-4';
                } else if (ratio <= 0.5){
                    spanClass += 'span-row-1';
                } else if (ratio <= 0.75){
                    spanClass += 'span-row-2';
                } else {
                    spanClass += 'span-row-3';
                }
            } else if (img.naturalWidth > 640) {
                spanClass = 'span-col-2 ';
                if (ratio <= 1) {
                    spanClass += 'span-row-3';
                } else if (ratio <= 0.5){
                    spanClass += 'span-row-4';
                } else {
                    spanClass += 'span-row-2';
                }
            } else {
                spanClass = ' span-col-1 ';
                if (ratio <= 1) {
                    spanClass += 'span-row-2';
                } else if (ratio <= 0.5){
                    spanClass += 'span-row-3';
                } else {
                    spanClass += 'span-row-1';
                }
            }

            // if (img.naturalWidth >= 800 && img.naturalHeight >= 800 && ratio <= 1.25 && ratio > 0.75) {
            //     spanClass = 'span-2x2';
            // } else if (ratio >= 1.8 && img.naturalWidth >= 900) {
            //     spanClass = 'span-col-3'; 
            // } else if (ratio >= 1.25 && img.naturalWidth >= 1000) {
            //     spanClass = 'span-col-2';
            // } else if (ratio <= 0.75) {
            //     spanClass = 'span-row-2';
            // }
            // If ratio is ~1 and small, it remains 1x1 (no span class)
            item.className = `masonry-item ${spanClass}`.trim();
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
        grid.appendChild(item);
    }
}

// Initialize grid automatically when page loads
loadItems();
