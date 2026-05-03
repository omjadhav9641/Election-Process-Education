const fs = require('fs');
const html = fs.readFileSync('election_widget.html', 'utf8');
const fileContent = `const fs = require('fs');\n\nconst fileContent = \`${html.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;\n\nfs.writeFileSync('election_widget.html', fileContent);\n`;
fs.writeFileSync('generator.js', fileContent);
console.log('Updated generator.js');
