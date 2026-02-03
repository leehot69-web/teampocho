import fs from 'fs';
import https from 'https';
import path from 'path';

const logos = [
    { name: 'logo-promo.jpg', url: 'https://media.bio.site/sites/c1b1a550-ce52-4cff-b3bc-2bab8b64de66/qYvAJDLvDvr82ueFYqeAb8.jpg' },
    { name: 'logo-paqpocho.png', url: 'https://media.bio.site/sites/c1b1a550-ce52-4cff-b3bc-2bab8b64de66/TUSELhUUHrpiC7vLMQCDWg.png' },
    { name: 'logo-pochobistro.jpg', url: 'https://media.bio.site/sites/c1b1a550-ce52-4cff-b3bc-2bab8b64de66/qyKjoUmcnratF5myK3aRFN.jpg' },
    { name: 'logo-marytierra.jpg', url: 'https://media.bio.site/sites/c1b1a550-ce52-4cff-b3bc-2bab8b64de66/3ePPUZW4EUsSTNBATCXSfe.jpg' },
    { name: 'logo-margarita.jpg', url: 'https://media.bio.site/sites/c1b1a550-ce52-4cff-b3bc-2bab8b64de66/6B2U6kM8WNtvvZR2tBtMZQ.jpg' },
    { name: 'logo-miranchito.jpg', url: 'https://media.bio.site/sites/c1b1a550-ce52-4cff-b3bc-2bab8b64de66/MAFhJH7CfQkBfCLhKVekBV.jpg' },
    { name: 'profile-main.jpg', url: 'https://media.bio.site/sites/c1b1a550-ce52-4cff-b3bc-2bab8b64de66/7Cz6UXASzp4RyHAhbhvC4K.jpg' }
];

const downloadDir = path.join(process.cwd(), 'web', 'public', 'logos');

logos.forEach(logo => {
    const filePath = path.join(downloadDir, logo.name);
    const file = fs.createWriteStream(filePath);

    https.get(logo.url, response => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${logo.name}`);
        });
    }).on('error', err => {
        fs.unlink(filePath, () => { }); // Delete the file async. (But we don't check the result) - valid for this purpose
        console.error(`Error downloading ${logo.name}: ${err.message}`);
    });
});
