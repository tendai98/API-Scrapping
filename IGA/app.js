const https = require('https');
const express = require("express")
const PORT = process.env.PORT || 5000
const COOKIE = '_gcl_au=1.1.1632133750.1689077537; _clck=15eq51c|2|fd7|0|1287; _gid=GA1.3.1197452742.1689077537; ajs_anonymous_id=c9a92998-a5c8-434b-a3aa-1edb58da92df; __Host-next-auth.csrf-token=ef21d2612e74b3db10bff189cf36d55d678bcb475c09680245fcb1dae3201b34%7C5f655ada3fc66023771d7f72bb08f9202f2f3e748b4d1e8e3491c0fa4167860c; __Secure-next-auth.callback-url=https%3A%2F%2Fwww.igashop.com.au; _fbp=fb.2.1689077537510.1796971477; _gat_gtag_UA_184622586_1=1; _dc_gtm_UA-184622586-1=1; _ga=GA1.3.390519710.1689077537; _clsk=1p9yvh3|1689080655932|2|1|p.clarity.ms/collect; _ga_CWDKGZHRE0=GS1.1.1689080181.2.1.1689080672.36.0.0'

const app = express()

app.get("/query", (reqst, resp) => {

  const options = {
      hostname: 'www.igashop.com.au',
      path: `/api/storefront/stores/52511/search?misspelling=true&q=${reqst.query.item}&sessionId=9ff10409-42b7-4079-a4ec-6f18e4fac9fd&skip=0&take=${reqst.query.count}`,
      headers: {
        'authority': 'www.igashop.com.au',
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'cookie': COOKIE,
        'if-none-match': 'W/"1mk0ay40srban"',
        'referer': `https://www.igashop.com.au/search/1?q=${reqst.query.item}`,
        'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'x-shopping-mode': '11111111-1111-1111-1111-111111111111'
      }
  };


  const req = https.get(options, function (res) {
    const chunks = [];

    res.on('data', function (chunk) {
      chunks.push(chunk);
    });

    res.on('end', function () {
      const body = Buffer.concat(chunks);
      const data = JSON.parse(body)
      resp.json(data.items)
      console.log("[+] IGA-API ::: API REQUEST")
    });

  });

})


app.listen(PORT, () => {
	console.log("[+] IGA-API : Online")
})
