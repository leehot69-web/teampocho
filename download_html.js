import https from 'https';
import fs from 'fs';

const url = 'https://bio.site/Teampocho';

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        fs.writeFileSync('page_source.html', data);
        console.log("HTML saved to page_source.html");
    });
}).on('error', (err) => {
    console.log('Error: ' + err.message);
});
