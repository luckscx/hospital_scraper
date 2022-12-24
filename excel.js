var excel = require('excel4node');
const fs = require("fs")

const list2xls = (name, list_obj) => {
    const json_file = `output/${name}.json`
    fs.writeFileSync(json_file, JSON.stringify(list_obj))
    var workbook = new excel.Workbook();

    var worksheet = workbook.addWorksheet(name);

    const table_head = ["省份","城市","经营类型","等级","医院类型",
    "医院名称","好大夫链接", "地址","电话","描述","科室名","科室医生","科室链接"]
    for (let i = 0; i < table_head.length; i++) {
        worksheet.cell(1,i + 1).string(table_head[i])
    }

    const obj_prop = ["prov","city","t1","t2","t3",
        "name","h_url","address","tel","desc"]
    let line_cnt = 0
    for (let i = 0; i < list_obj.length; i++) {
        const obj = list_obj[i]
        const dept_cnt = obj.dept_list.length
        if (dept_cnt == 0) {
            for (let j = 0; j < obj_prop.length; j++) {
                const key = obj_prop[j]
                const cell_obj = worksheet.cell(line_cnt + 2,j + 1)
                if (key === "h_url") {
                    cell_obj.link(obj[key])
                } else {
                    cell_obj.string(obj[key])
                }
            }
            line_cnt = line_cnt + 1
        } else {
            for (let j = 0; j < obj_prop.length; j++) {
                const key = obj_prop[j]
                const cell_obj = worksheet.cell(line_cnt + 2,j + 1,
                    line_cnt + 2 + dept_cnt - 1, j + 1, true)
                if (key === "h_url") {
                    cell_obj.link(obj[key])
                } else {
                    cell_obj.string(obj[key])
                }
            }
            for (let j = 0; j < obj.dept_list.length; j++) {
                const dept_obj = obj.dept_list[j]
                worksheet.cell(line_cnt + 2 + j, table_head.length - 2).string(dept_obj.dept_name)
                worksheet.cell(line_cnt + 2 + j, table_head.length - 1).number(dept_obj.doc_cnt)
                worksheet.cell(line_cnt + 2 + j, table_head.length).link(dept_obj.dept_url)
            }
            line_cnt = line_cnt + dept_cnt
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
