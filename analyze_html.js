import fs from 'fs';

const html = fs.readFileSync('page_source.html', 'utf8');

const terms = [
    "PROMO CUMPLEAÑERA",
    "PAQPOCHO",
    "POCHO BISTRO",
    "POCHO MAR Y TIERRA",
    "MARGARITA",
    "MI RANCHITO"
];

const logStream = fs.createWriteStream('analysis.txt');
function log(msg) {
    console.log(msg);
    logStream.write(msg + '\n');
}

terms.forEach(term => {
    const index = html.indexOf(term);
    if (index !== -1) {
        log(`\n--- Context for: ${term} ---`);
        // Find nearby image URL (look backwards and forwards)
        const start = Math.max(0, index - 1000); // Look further back for image
        const end = Math.min(html.length, index + 500);
        const snippet = html.substring(start, end);

        // Extract URLs from snippet
        const urls = snippet.match(/https:\\u002F\\u002Fmedia\.bio\.site\\u002Fsites[^"']+/g) || [];
        log("Found JSON escaped URLs: " + JSON.stringify(urls));

        const normalUrls = snippet.match(/https:\/\/media\.bio\.site\/sites[^"']+/g) || [];
        log("Found Normal URLs: " + JSON.stringify(normalUrls));
    } else {
        log(`\nTerm not found: ${term}`);
    }
});

// Also look for main profile image
log("\n--- Profile Image ---");
const profileMatch = html.match(/"cover_photo":"([^"]+)"/);
if (profileMatch) log("Cover Photo: " + profileMatch[1]);

const profilePicMatch = html.match(/"profile_pic":"([^"]+)"/); // Guessing key
if (profilePicMatch) log("Profile Pic: " + profilePicMatch[1]);
