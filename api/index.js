//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require("axios");
const {Op, Country, Tourist_activity} = require("./src/db");

async function getData(){
  let data = await axios.get("https://restcountries.com/v3/all");
  let allCountries = await Country.findAll();
  
  if(!allCountries.length){
    data.data.forEach((country) => {
      if(country.capital){
        Country.create({
          name: country.name["common"],
          image: country.flags[1],
          continent: country.continents[0],
          capital: country.capital,
          ID: country.cca3,
          subregion: country.subregion,
          area: country.area,
          population: country.population,
        })
      }
    });
  }else{
    console.log("Ya hay esos paises en la bdd");
  }
}

getData();
  // Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
