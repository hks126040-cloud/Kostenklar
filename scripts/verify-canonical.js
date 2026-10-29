async function verify() {
  console.log('--- 1. Testing Homepage with Query Parameters ---');
  const res1 = await fetch('http://localhost:3000/?flaeche=60&zimmer=2&etage=1&aufzug=false&fuellgrad=normal&plz=10115');
  const html1 = await res1.text();
  const canonical1 = html1.match(/<link[^>]+rel=["']canonical["'][^>]*>/i);
  const robots1 = html1.match(/<meta[^>]+name=["']robots["'][^>]*>/i);
  console.log('HTTP Status:', res1.status);
  console.log('Canonical Tag in Raw HTML:', canonical1 ? canonical1[0] : 'NOT FOUND');
  console.log('Robots Meta Tag:', robots1 ? robots1[0] : 'None (Inherits)');

  console.log('\n--- 2. Testing 5 City Pages for noindex ---');
  const citySlugs = ['koeln', 'muenchen', 'berlin', 'hamburg', 'frankfurt'];
  for (const slug of citySlugs) {
    const res = await fetch(`http://localhost:3000/entruempelung-${slug}-kosten`);
    const html = await res.text();
    const robots = html.match(/<meta[^>]+name=["']robots["'][^>]*>/i);
    console.log(`/entruempelung-${slug}-kosten ->`, robots ? robots[0] : 'ERROR: No robots tag');
  }
}

verify().catch(console.error);
