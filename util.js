const cheerio = require('cheerio');
const superagent = require('superagent');
require('superagent-charset')(superagent)

const loadPageToCheerio = async (dist_url, char="utf8") => {
    const html = await superagent.get(dist_url).charset(char).buffer(true)
    if (!html) {
        console.log("not get html")
        return null;
    }
    return cheerio.load(html.text);
};

const cleanStr = in_str => {
    in_str = in_str.replace("\n","")
    in_str = in_str.trim()
    return in_str;
};

module.exports = {
    loadPageToCheerio,
    cleanStr,
}
