import fs from "fs";
import csv from "csv-parser";

const checkKeys = (file) => {
    fs.createReadStream(file)
        .pipe(csv())
        .on("data", (data) => {
            console.log(`Keys for ${file}:`, Object.keys(data));
            console.log(`First row for ${file}:`, data);
            process.exit(0);
        });
};

checkKeys("data_2nd_year.csv");
