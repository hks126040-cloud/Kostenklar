const http = require('http');

const port = process.argv[2] || 3005;

http.get(`http://127.0.0.1:${port}`, (res) => {
  let data = '';
  res.on('data', (chunk) => (data += chunk));
  res.on('end', () => {
    const iconTags = data.match(/<link[^>]*rel=["'][^"']*icon[^"']*["'][^>]*>/gi);
    console.log(`Icon tags found in HTML on port ${port}:`);
    if (iconTags) {
      iconTags.forEach((t) => console.log('  ', t));
    } else {
      console.log('  None found!');
    }
  });
}).on('error', (e) => console.error(e.message));

