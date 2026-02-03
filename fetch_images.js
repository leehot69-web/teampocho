import https from 'https';
import fs from 'fs';

const url = 'https://bio.site/Teampocho';

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        // Look for image source URLs
        const imgRegex = /src="([^"]+)"/g;
        const bgRegex = /url\(['"]?([^'")]+)['"]?\)/g;

        let match;
        const images = new Set();

        while ((match = imgRegex.exec(data)) !== null) {
            if (match[1].match(/\.(jpeg|jpg|gif|png|webp)/)) {
                images.add(match[1]);
            }
        }

        while ((match = bgRegex.exec(data)) !== null) {
            if (match[1].match(/\.(jpeg|jpg|gif|png|webp)/)) {
                images.add(match[1]);
            }
        }

        const fileStream = fs.createWriteStream('found_images.txt');
        console.log("Found images:");
        images.forEach(img => {
            console.log(img);
            fileStream.write(img + '\n');
        });
        fileStream.end();

        // Also print a snippet of the HTML to see structure if no images found
        if (images.size === 0) {
            console.log("No explicit image files found. Snippet:");
            fs.writeFileSync('debug_html.txt', data);
        }
    });
}).on('error', (err) => {
    console.log('Error: ' + err.message);
});
