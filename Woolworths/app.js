const axios = require('axios')
const express = require('express')
const PORT = process.env.PORT || 5000
const COOKIE= "ai_user=pzinRPY38MZG0LOEhTh9R0|2023-07-17T11:03:40.599Z; _fbp=fb.2.1689591827964.1383306879; _gcl_au=1.1.2070653992.1689591829; aam_uuid=48411841379980099118194042144304040975; mdLogger=false; kampyle_userid=4d01-877c-c02e-055f-2090-77e1-f78d-eeca; kampyleUserSession=1689673179200; kampyleUserSessionsCount=4; kampyleSessionPageCounter=1; kampyleUserPercentile=52.04367834193919; bm_sz=945532D1370880FFA8B163342FC61568~YAAQTbIUAvCPUL2JAQAAoN2xzhTXoaX7c0PEuDWMTsPUy1msI8gz6FOnbo6/EVq7BSwuftk0b6poeROIDGjthcy73NbVuwXw8Y379smnn6/WP6Z9Kok2l7L5MbkeiA+NXlOvY6LbD8EMG9CqKUFG2Id74M2OECYbfq1wFMJ/F8uxTsdaoVfy8RLpnHkptHmD7gnV52ZoLxhTN/vb8JkI9dppI8RBlMOCNX/ppyObw+jN4+cO7aTU1obluCk6cODZFCxBt7XEyKLQKbwUpVe0sNVA1MsP2rsGU4q2+xJLGUi4EY2zGdICVQ83~4272708~3490369; akaalb_woolworths.com.au=~op=www_woolworths_com_au_ZoneB:PROD-ZoneB|www_woolworths_com_au_BFF_MEL_Launch:WOW-BFF-MEL|~rv=49~m=PROD-ZoneB:0|WOW-BFF-MEL:0|~os=43eb3391333cc20efbd7f812851447e6~id=40c9192f92c7e9f38394bf75dd043edb; at_check=true; INGRESSCOOKIE=1691389912.746.49.596899|37206e05370eb151ee9f1b6a1c80a538; w-rctx=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2OTEzODk5MTEsImV4cCI6MTY5MTM5MzUxMSwiaWF0IjoxNjkxMzg5OTExLCJpc3MiOiJXb29sd29ydGhzIiwiYXVkIjoid3d3Lndvb2x3b3J0aHMuY29tLmF1Iiwic2lkIjoiMCIsInVpZCI6Ijk1NTk2NGQ2LWZjZTUtNDY3My04MTZmLTJhOGMwNTMzNjJhYSIsIm1haWQiOiIwIiwiYXV0IjoiU2hvcHBlciIsImF1YiI6IjAiLCJhdWJhIjoiMCIsIm1mYSI6IjEifQ.fwl7oPCVfzhWMVLyzz44IftUV_tSPvFmfuFFCINLnM49lmeDjfO8nGcGr6gSqMJk0wTmqgwrw7j4Ig3rcq4C6dxZy3AnyVOv9R9PggHxNrO4dtb5cA5ttAynWha7LRuJ61wHLseGQByFHE9NIc5kqt2_20uG42GNM8QZvm1E1GMwD6LHVdZK5L6SfVfhCECHZtff6nO-1jcY9utzg96t1Pxg5lJp0ORV83OVPXp1nODSJC0EKrJd7sN6T8AIb8yKCh4hzEfISfLXGwWueE-kDZlxvUoesE5D7rVyozGFx2KV8DfLjI3u44vUeYKaDWqo_rNJu-tNw5_yBnaPXaR3-g; wow-auth-token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2OTEzODk5MTEsImV4cCI6MTY5MTM5MzUxMSwiaWF0IjoxNjkxMzg5OTExLCJpc3MiOiJXb29sd29ydGhzIiwiYXVkIjoid3d3Lndvb2x3b3J0aHMuY29tLmF1Iiwic2lkIjoiMCIsInVpZCI6Ijk1NTk2NGQ2LWZjZTUtNDY3My04MTZmLTJhOGMwNTMzNjJhYSIsIm1haWQiOiIwIiwiYXV0IjoiU2hvcHBlciIsImF1YiI6IjAiLCJhdWJhIjoiMCIsIm1mYSI6IjEifQ.fwl7oPCVfzhWMVLyzz44IftUV_tSPvFmfuFFCINLnM49lmeDjfO8nGcGr6gSqMJk0wTmqgwrw7j4Ig3rcq4C6dxZy3AnyVOv9R9PggHxNrO4dtb5cA5ttAynWha7LRuJ61wHLseGQByFHE9NIc5kqt2_20uG42GNM8QZvm1E1GMwD6LHVdZK5L6SfVfhCECHZtff6nO-1jcY9utzg96t1Pxg5lJp0ORV83OVPXp1nODSJC0EKrJd7sN6T8AIb8yKCh4hzEfISfLXGwWueE-kDZlxvUoesE5D7rVyozGFx2KV8DfLjI3u44vUeYKaDWqo_rNJu-tNw5_yBnaPXaR3-g; prodwow-auth-token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2OTEzODk5MTEsImV4cCI6MTY5MTM5MzUxMSwiaWF0IjoxNjkxMzg5OTExLCJpc3MiOiJXb29sd29ydGhzIiwiYXVkIjoid3d3Lndvb2x3b3J0aHMuY29tLmF1Iiwic2lkIjoiMCIsInVpZCI6Ijk1NTk2NGQ2LWZjZTUtNDY3My04MTZmLTJhOGMwNTMzNjJhYSIsIm1haWQiOiIwIiwiYXV0IjoiU2hvcHBlciIsImF1YiI6IjAiLCJhdWJhIjoiMCIsIm1mYSI6IjEifQ.fwl7oPCVfzhWMVLyzz44IftUV_tSPvFmfuFFCINLnM49lmeDjfO8nGcGr6gSqMJk0wTmqgwrw7j4Ig3rcq4C6dxZy3AnyVOv9R9PggHxNrO4dtb5cA5ttAynWha7LRuJ61wHLseGQByFHE9NIc5kqt2_20uG42GNM8QZvm1E1GMwD6LHVdZK5L6SfVfhCECHZtff6nO-1jcY9utzg96t1Pxg5lJp0ORV83OVPXp1nODSJC0EKrJd7sN6T8AIb8yKCh4hzEfISfLXGwWueE-kDZlxvUoesE5D7rVyozGFx2KV8DfLjI3u44vUeYKaDWqo_rNJu-tNw5_yBnaPXaR3-g; AMCVS_4353388057AC8D357F000101%40AdobeOrg=1; RT=\"z=1&dm=www.woolworths.com.au&si=6d7a6d5d-5995-4f7d-8b25-9765b02dd4ba&ss=ll0hvp1s&sl=0&tt=0\"; ak_bmsc=B53E832CB4493059DCFDCA9982CE569C~000000000000000000000000000000~YAAQTbIUAtuQUL2JAQAA5gGyzhSwJCdXGruhAEHo+1F7N54kBRyqwY7kb32qlFDGCDJU51EbT9WODW4g1ueMd5SKqdsRERMb9zic3RTk8E144iknlNuUzVW0ycqKvZC0oB4kOuhr5YRV5WRlKWktwZ6I3eNRiseeWU36YepuX5mFgGfKlFeZ0d0SfYIlJ6BLMORSNS1kbRwIi2oEqUfUErOIAcRIgh8LUZf20h4OkHoTaBGPQN+eG3DktayWitWiyWCQX0rfJ5ZOqP3SB1FK3Jb4IUmCCAbYfpEG1oaIHo5rQZbkVqeb0OFwR9gbyJqGLPhd+znkwqH+hwgLV21wipci37ZijMo+uBJBXJK7ucUzmHJki4QGTDggguTsouZzvOv5VH3rJZan3FusQgWr92w0b1xwENWmdbJsDteNTLrsg3qVJPkdykPeCA9tF7Zl+gC9NHZKjTY6oPVMUgiriHdOF2wTeV/kO8L9u3tYCQ3tvQuLZCafqyS6snfUR+hxno8=; ai_session=evjLvq7euowtYH7K3EjgHN|1691389919586|1691389919586; fullstoryEnabled=false; _abck=CEAB2E5DD3A0995A05946D6474333867~0~YAAQTbIUAjuRUL2JAQAAExSyzgoqIov5HWm+bcGLxZoHG/oJV0akuWWAduY64uu2fvuynam1PKiSIn4zE0RE7JSPBV++QnNSe3WYdK5TDjnkL6mjCH1GHPVuAzVsxB6XoEjCcUlt2tNjimRL8cjGmRBPYSFCM/uW0OR/fYFtU8lEMvGG04sWewzKwKHSWdfoLGSvmZciy1In1jD9drOJYiyfyeW3TXWwDu4xHU/PJxjXSfkrw+55UOtng3xtA8L6mRWuuu33omueaNZ1NSQkiWLT7JpA+I6Xm4U9IFd2B+GThVDwuzytwshqzFIcOY0jcceMlwDyVIpiGzTVZRfIflqODYe0j0+9E/kx9bCdnx+yONoHt54P4sfSOoicH8ZcTPIb3K1Le0eNc9s0nN6j0dQ0LTsdMmKYba07niWo~-1~-1~-1; _uetsid=1e119e4034ec11ee904527cbd6b84bb3; _uetvid=9a7a8c90249111eebd1495c35365157c; s_cc=true; AMCV_4353388057AC8D357F000101%40AdobeOrg=179643557%7CMCIDTS%7C19577%7CMCMID%7C48661809691649433398147125488316687827%7CMCOPTOUT-1691397126s%7CNONE%7CvVersion%7C5.5.0%7CMCAAMLH-1691994726%7C6%7CMCAAMB-1691994726%7Cj8Odv6LonN4r3an7LhD3WZrU1bUpAkFkkiY1ncBR96t2PTI; bm_sv=3428FB24AC03961ADBF6198054A6CEBE~YAAQTbIUAoqRUL2JAQAAISSyzhQguIQqSqkC4MYeq+/Bdu5DhaFBnlTL7Xpz2yZVq4ozds0UzbnqIanmDPRYW0LPU/vWGY1wQIVCLkrp/8z0mD8eFWkTymPuPWfvGghpua7eRaDtycaUW6ZKJFQKlhO9liokuX8JhLt18f0VW9Pmk0JMuFdZSiGQObge8L4xXW2U8hjyP+Fe9+4scaorQ8Op6H9bIHj1cfCKprgIKKiwh8jRzaEXZRIBzNJW6kKb/ejZxbVREQ==~1; IR_gbd=woolworths.com.au; IR_7464=1691389930519%7C0%7C1691389930519%7C%7C; __gads=ID=0b24c15f9ea04fff:T=1689670577:RT=1691389937:S=ALNI_MYydh3GyYTl1tW5Td6QJ_fy8-Z7aQ; __gpi=UID=00000c6c765c0259:T=1689670577:RT=1691389937:S=ALNI_MZ7I_Nr9tXRPanNAfOkEqSNVeUyxg; _ga=GA1.3.1100196646.1689591828; _gid=GA1.3.660028322.1691389937; _gat_gtag_UA_38610140_9=1; mbox=PC#cc1929fc58bc4bc7a4ae8b00733ce268.37_0#1754634738|session#1b7c2241db6c4a4daf83d278b75993db#1691391798; _ga_YBVRJYN9JL=GS1.1.1691389935.4.1.1691389937.58.0.0; utag_main=v_id:018963854a100018517c37eb181e05065004505d0086e$_sn:4$_se:4$_ss:0$_st:1691391737532$vapi_domain:woolworths.com.au$dc_visit:4$ses_id:1691389920908%3Bexp-session$_pn:1%3Bexp-session$dc_event:2%3Bexp-session"

const app = express()

function getProducts(req, res){

	axios.post(
	    'https://www.woolworths.com.au/apis/ui/Search/products',
	    {
		'Filters': [],
		'IsSpecial': false,
		'Location': `/shop/search/products?searchTerm=${req.query.item}`,
		'PageNumber': 1,
		'PageSize': 24,
		'SearchTerm': `${req.query.item}`,
		'SortType': 'TraderRelevance',
		'ExcludeSearchTypes': [
		    'UntraceableVendors'
		],
		'GpBoost': 0,
		'GroupEdmVariants': true
	    },
	    {
		headers: {
		    'authority': 'www.woolworths.com.au',
		    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
		    'Cookie': COOKIE,
		    'origin': 'https://www.woolworths.com.au',
		    'referer': `https://www.woolworths.com.au/shop/search/products?searchTerm=${req.query.item}`,
		    'request-id': '|c3656b6c762549b5a32075869d21bfc4.b7dba2b9444241a1',
		    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114"',
		    'sec-ch-ua-mobile': '?0',
		    'sec-ch-ua-platform': '"Linux"',
		    'sec-fetch-dest': 'empty',
		    'sec-fetch-mode': 'cors',
		    'sec-fetch-site': 'same-origin',
		    'traceparent': '00-c3656b6c762549b5a32075869d21bfc4-b7dba2b9444241a1-01',
		    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
		}
	    }
	).then(data => {
		console.log("[+] IGA-API ::: API REQUEST")
		res.json(data.data.Products)
	}).catch(e => {
		console.log(e)
		res.json({error:500})
	})

}

app.get("/query", getProducts)
app.listen(PORT, () => {
	console.log("[+] Woolworths-API : Online")
})
