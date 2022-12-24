const superagent = require('superagent');
require('superagent-charset')(superagent)
const host = "https://www.haodf.com/hospital"
const {loadPageToCheerio, cleanStr} = require('./util.js')

const getCityHospitalList = async (dist_url) => {
    const $ = await loadPageToCheerio(dist_url, "gb2312")
    const result = []
    $('.m_ctt_green li').each(function(){
        let name = $(this).find('a').text()
        let h_url = $(this).find('a').attr("href")
        result.push({name, h_url})
    })
    return result
}

const getAddress = page_obj => {
    const p = page_obj(".jie-cont .j-i-cont")
    const d = p.text().replace(p.find('a').text(),"")
    return cleanStr(d);
};

const getTypeTag = page_obj => {
    const $ = page_obj
    const labels = $(".top-banner-container .info-wrap .info-lable .hospital-label-item")
    const t1 = labels.eq(0).text()
    const t2 = labels.eq(1).text()
    const t3 = labels.eq(2).text()
    return {t1,t2,t3};
};

const getHospitalDetail = async (h_obj) => {
    console.log("getHostitalDetail for %s", h_obj.name)
    const jieshao_page = h_obj.h_url.replace(".html","/jieshao.html")
    const $ = await loadPageToCheerio(jieshao_page)
    const tags = getTypeTag($)
    const result_obj = {
        prov : h_obj.prov,
        city : h_obj.city,
        name : h_obj.name,
        h_url : h_obj.h_url,
        t1 : tags.t1,
        t2 : tags.t2,
        t3 : tags.t3,
        tel : $(".j-i-phone").text(),
        desc : $(".h-j-info").text(),
        dist : getAddress($)
    }
    return result_obj;
};

const getCityList = async (dist_url) => {
    const $ = await loadPageToCheerio(dist_url, "gb2312")
    const subcitys = []
    $("div.ksbd ul li").each(function() {
        const link = $(this).find("a").attr("href")
        subcitys.push({
            city_name : $(this).text(),
            city_url : `https:${link}`
        })
    })

    return subcitys;
};

const getProvList = async () => {
    const dist_url = `${host}/list.html`
    const $ = await loadPageToCheerio(dist_url, "gb2312")
    const prov_list = []
    $("div.kstl").each(function() {
        const link = $(this).find("a")
        prov_list.push({
            prov_name : link.text(),
            prov_url : `https:${link.attr("href")}`
        })
    })

    return prov_list;
};

module.exports = {
    getProvList,
    getCityList,
    getCityHospitalList,
    getHospitalDetail,
}
