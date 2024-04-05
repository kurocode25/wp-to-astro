const xml2js = require('xml2js');
const fs = require('fs');
const parser = new xml2js.Parser();

const read_file = (file_path) => {
  return new Promise((resolve, reject) => {
    fs.readFile('./' + file_path, (err, data) => {
      resolve(data);
      reject(err);
    })
  })
}

const parse_data = (data) => {
  return new Promise((resolve, reject) => {
    parser.parseString(data, (err, result) => {
      resolve(result);
      reject(err);
    })
  });
}

exports.parse_data = parse_data;
exports.read_file = read_file;
