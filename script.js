//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
function downloadImage(image) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image.url;
		console.log('Downloading image', image.url); 

        // Resolve the promise when the image loads successfully
        img.onload = () => {
            console.log('Image loaded', image.url);  
			resolve(img);
		};

        // Reject the promise if the image fails to load
        img.onerror = () => {
            console.error('Failed to load image', image.url); 
			reject(`Failed to load image's URL: ${image.url}`);
		};
    });
}

// Function to download all images and display them
function downloadAllImages() {
    const promises = images.map(downloadImage);

    // Use Promise.all to wait for all images to download
    Promise.all(promises)
        .then(images => {
            const outputDiv = document.getElementById('output');
            outputDiv.innerHTML = ''; // Clear the output div

            // Append each downloaded image to the output div
            images.forEach(img => {
                outputDiv.appendChild(img);
            });
        })
        .catch(error => {
            console.error(error);
            alert(error);
        });
}

// Add event listener to the button
document.getElementById('download-images-button').addEventListener('click', downloadAllImages);
