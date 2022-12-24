const list2xls = require('./excel.js')
const scraper = require('./scraper.js')
const bluebird = require('bluebird')

const main = async () => {
    const prov_list = await scraper.getProvList()
    for (const prov_obj of prov_list) {
        const zone_list = await scraper.getCityList(prov_obj.prov_url)
        for (const zone of zone_list) {
            const host_list = []
            const h_list = await scraper.getCityHospitalList(zone.city_url)
            await bluebird.map(h_list, async (h_obj) => {
                h_obj.prov = prov_obj.prov_name
                h_obj.city = zone.city_name
                const detail_obj = await scraper.getHospitalDetail(h_obj)
                host_list.push(detail_obj)
            }, {concurrency: 8}).then(() => {
                console.log("done %s %s",prov_obj.prov_name, zone.city_name)
            })
            const file_name = `${prov_obj.prov_name}-${zone.city_name}`
            list2xls(file_name, host_list)
            break
        }
        break
    }
};


main()
