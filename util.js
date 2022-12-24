const cheerio = require('cheerio');
const superagent = require('superagent');
require('superagent-charset')(superagent)
const fs = require("fs")
const md5 = require("md5");

function checkFileExists(file) {
    return fs.promises.access(file, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false)
}

// md5 拆分一下 目录名
const loadPageWithCache = async (url, char) => {
    const hash = md5(url)
    const cache_file = `cache/${hash}.html`
    const has_cache = await checkFileExists(cache_file)
    if (has_cache) {
        return await fs.promises.readFile(cache_file)
    } else {
        const html = await superagent.get(url).charset(char).buffer(true)
        if (!html) {
            console.log("not get html for %s",dist_url)
            return null;
        }
        const save_text = html.text
        await fs.promises.writeFile(cache_file, save_text)
        return save_text
    }
};

const loadPageToCheerio = async (dist_url, char="utf8") => {
    const html = await loadPageWithCache(dist_url, char)
    if (!html)  {
        console.log("not get html for %s",dist_url)
        return null
    }
    return cheerio.load(html);
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
