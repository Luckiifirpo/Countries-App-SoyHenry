const {Router} = require("express");
const {caseAll, caseName} = require("./countriesController")
const {Op, Country, Tourist_activity} = require("../../db")
// const axios = require("axios");
const router = Router();


router.get("/", async (req, res) => {
    const {name} = req.query;
    
    if(name){
        //FUNCION caseName(name);
        const findCountry = await caseName(name)

        if(!findCountry.length) return res.status(400).send("no se econtró país con ese nombre")
        try {
            return res.status(200).send(findCountry)
        } catch (error) {
            return res.status(400).send({error: error.message})
        }
    }
    try {
    const allCountries = await caseAll();

    res.status(200).send(allCountries);}
    catch (error) {
    res.status(400).send({error: error.message})}
})

router.get("/:idPais", async (req,res) => {
    let {idPais} = req.params;

    let countryInfo = await Country.findAll({where: {
        ID: {
            [Op.iLike]: idPais,
        }
    },
    include: Tourist_activity,})

    console.log(countryInfo.length);

    if(!countryInfo.length) return res.status(404).send(`No hay país con ese ID`)
    
    try {
        res.status(200).send(countryInfo)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})
module.exports = router;