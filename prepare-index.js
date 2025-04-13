// takes a parameter from cli with path and replaces
// https://financialpanda.pl/ with https://financialpanda.org/

const fs = require('fs/promises');

const run = async () => {
    const path = process.argv[2];
    if(!path) {
        console.error('Please provide a path to the file');
        process.exit(1);
    }
    // fs promises read
    const file = await fs.readFile(path, 'utf8');
    // replace https://financialpanda.pl/ with https://financialpanda.org/
    const newFile = file.replace(/financialpanda\.pl/g, 'financialpanda.org');
    // write the file back
    console.log('writing')
    await fs.writeFile(path, newFile);
    console.log('done')
}
run();

