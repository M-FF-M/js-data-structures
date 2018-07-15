const fs = require('fs');
const pr = require('child_process');

let files = [], file_contents = [], classes = [];
fs.readdirSync('../').forEach(file => {
  files.push(file);
});

files = files.filter(name => name.search(/\.js$/) != -1);

for (let i=0; i<files.length; i++) {
  let regex = /\r?\nexport class ([A-Za-z_0-9]+)/g;
  file_contents[i] = fs.readFileSync('../' + files[i], 'utf8');
  file_contents[i] = file_contents[i].replace(/(\r?\n)class/g, '$1export class');
  let result;
  while ((result = regex.exec(file_contents[i])) !== null) {
    classes.push(result[1]);
  }
  if (!fs.existsSync('js')) fs.mkdirSync('js');
  fs.writeFileSync('js/' + files[i], file_contents[i], 'utf8');
}

console.log('found ' + files.length + ' files: ' + files.join(', '));
console.log('found ' + classes.length + ' classes: ' + classes.join(', '));
console.log('running esdoc...');

const sep = process.platform === "win32" ? '\\' : '/';

pr.execSync(`.${sep}node_modules${sep}.bin${sep}esdoc`, {stdio:[0,1,2]});
