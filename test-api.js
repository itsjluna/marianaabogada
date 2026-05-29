const fetch = require('node-fetch');

async function test() {
  const url = 'https://tiktok-api23.p.rapidapi.com/api/user/posts?secUid=MS4wLjABAAAAqB08cUbXaDWqbD6MCga2RbGTuhfO2EsHayBYx08NDrN7IE3jQuRDNNN6YwyfH6_6&count=3&cursor=0';
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com',
      'x-rapidapi-key': '1b7e081da1msh2637ee32f1c4bbcp178934jsna99aa242a548'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(error);
  }
}

test();
