var excel = require('excel4node');
const fs = require("fs")

const list2xls = (name, list_obj) => {
    const json_file = `output/${name}.json`
    fs.writeFileSync(json_file, JSON.stringify(list_obj))
    var workbook = new excel.Workbook();

    var worksheet = workbook.addWorksheet(name);

    worksheet.cell(1,1).string("省份")
    worksheet.cell(1,2).string("城市")
    worksheet.cell(1,3).string("类型")
    worksheet.cell(1,4).string("等级")
    worksheet.cell(1,5).string("小类")
    worksheet.cell(1,6).string("医院名")
    worksheet.cell(1,7).string("电话")
    for (let i = 0; i < list_obj.length; i++) {
        const obj = list_obj[i]
        worksheet.cell(i+2,1).string(obj.prov)
        worksheet.cell(i+2,2).string(obj.city)
        worksheet.cell(i+2,3).string(obj.t1)
        worksheet.cell(i+2,4).string(obj.t2)
        worksheet.cell(i+2,5).string(obj.t3)
        worksheet.cell(i+2,6).string(obj.name)
        worksheet.cell(i+2,7).string(obj.tel)
    }

    const xls_name = `output/${name}.xlsx`
    workbook.write(xls_name);
};

// const json_file = require(`./天津.json`)
// const loadTest = () => {
//     // fs.writeFileSync(json_file, JSON.stringify(list_obj))
//     list2xls("天津", json_file)
//     return 0;
// };
// loadTest()

module.exports = list2xls
