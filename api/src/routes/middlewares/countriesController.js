const {Op, Country, Tourist_activity} = require("../../db")
// const axios = require("axios");

async function caseAll(){
    let allCountries = await Country.findAll({include: Tourist_activity});
    return allCountries
 }

async function caseName(name){
    let specificCountry = await Country.findAll({
        where: {
            name:{
              [Op.iLike]: `%${name}%`
            }},
        include: Tourist_activity,
    })
    return specificCountry;
 }
 
 module.exports = {
    caseAll,
    caseName
 }