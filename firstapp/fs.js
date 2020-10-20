/* var fs = require('fs');

fs.readFile('mytext.txt','utf-8', function(err,data){
    if(err) throw err;
    console.log(data);    
})
*/

var fs = require('fs');
fs.writeFile('file1.txt', 'This is test file-1 data', function(err) {
if (err)
{
        return console.log(err);
}
console.log("File-1 saved")
});

