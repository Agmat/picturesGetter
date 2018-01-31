let request = require('request');
let cheerio = require('cheerio');
let download = require('download-file')

const main = () => {
    if (process.argv.length != 4) {
        console.log('Usage: node index.js [URL] [Destination]')
        return (1);
    }
    request(process.argv[2], (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(body);
            console.log('Recupération des images');
            console.log('-----------------------------------');
            $('img').each((i ,elem) => {
                let src = $(elem).attr('src');
                let name = src.split('/')[-1];
                console.log(src);
                download(src, {directory: process.argv[3], filename: name}, function(err){
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                })
            });
            console.log('-----------------------------------');
        } else {
            console.log('An error occured');
        }
    })
    return (0);
}

main()