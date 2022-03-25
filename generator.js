const readline = require('readline');
const CoinKey = require('coinkey');
const fs = require('fs');
const rl = readline.createInterface(process.stdin, process.stdout);

process.title = "Bitcoin Sniffer";

 function main() {


    rl.question('Show failed wallets? Y/N (Slower) \n', (answer) => {
        if (answer == "Y" || answer == "y") {
            console.log("\x1b[32m%s\x1b[0m", ">> Generating...");

            while(true){
                generateAddress(true);
            }
        }
        else if (answer == "N" || answer == "n") {
            console.log("\x1b[32m%s\x1b[0m", ">> Generating...");

            while(true){
                generateAddress(false);
            }
        }
        else{
            console.log("Invalid input");
            main();
        }
        
        
    })

}

const data = fs.readFileSync('./fundedAddresses.txt');
function generateAddress(showFailed) {
    let pkHex = r(64);
    
    let ck = new CoinKey(Buffer.from(pkHex, 'hex'));
    
    ck.compressed = false;
    
        
    if(data.includes(ck.publicAddress)){
        
        ;
        console.log("\x1b[32m%s\x1b[0m", ">> Success: " + ck.publicAddress);
        var successAddressStr = "Wallet Address: " + ck.publicAddress + "\nPrivate Key: " + ck.privateWif;
            
        // save the wallet and its private key (seed) to a Success.txt file in the same folder 
        fs.writeFileSync('./successfullAddresses.txt', successAddressStr, (err) => {
            if (err){
                console.log(err);
                console.log(`\n\n\nAn error occured while saving the file.\nThe Wallet details are below. \n\n\n${successAddressStr}`)

            }; 
        })
            
        // close program after success
        process.exit();
    }
    else{   
        if(showFailed) {
            console.log("\x1b[31m%s\x1b[0m", ">> Failed: " + ck.publicAddress);
        }
        
    }
}

// the function to generate random hex string
function r(l) {
    let randomChars = 'ABCDF0123456789';
    let result = '';
    for ( var i = 0; i < l; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}
main()

