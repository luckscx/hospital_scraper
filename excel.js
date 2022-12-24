var excel = require('excel4node');
const fs = require("fs")

const list2xls = (name, list_obj) => {
    const json_file = `output/${name}.json`
    fs.writeFileSync(json_file, JSON.stringify(list_obj))
    var workbook = new excel.Workbook();

    var worksheet = workbook.addWorksheet(name);

    const table_head = ["省份","城市","经营类型","等级","医院类型",
    "医院名称","好大夫链接", "地址","电话","描述"]
    for (let i = 0; i < table_head.length; i++) {
        worksheet.cell(1,i + 1).string(table_head[i])
    }
    for (let i = 0; i < list_obj.length; i++) {
        const obj = list_obj[i]
        const obj_prop = ["prov","city","t1","t2","t3",
            "name","h_url","address","tel","desc"]
        for (let j = 0; j < obj_prop.length; j++) {
            worksheet.cell(i + 2,j + 1).string(obj[obj_prop[j]])
        }
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
