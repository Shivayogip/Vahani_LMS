import fs from "fs";

const convertFile = (file) => {
    const content = fs.readFileSync(file);
    // Check for UTF-16 BOM
    if (content[0] === 0xff && content[1] === 0xfe) {
        const utf8Content = content.toString("utf16le");
        fs.writeFileSync(file, utf8Content, "utf8");
        console.log(`Converted ${file} from UTF-16LE to UTF-8`);
    } else if (content[0] === 0xfe && content[1] === 0xff) {
        const utf8Content = content.toString("utf16be");
        fs.writeFileSync(file, utf8Content, "utf8");
        console.log(`Converted ${file} from UTF-16BE to UTF-8`);
    } else {
        // Try to detect null bytes which suggest UTF-16 without BOM
        if (content.includes(0x00)) {
            const utf8Content = content.toString("utf16le").replace(/\0/g, "");
            fs.writeFileSync(file, utf8Content, "utf8");
             console.log(`Converted ${file} from potential UTF-16 to UTF-8`);
        } else {
            console.log(`${file} seems to be already UTF-8 or ASCII`);
        }
    }
};

["data_2nd_year.csv", "data_3rd_year.csv", "data_powerbi.csv", "data_excel.csv", "data_1st_year.csv"].forEach(convertFile);
