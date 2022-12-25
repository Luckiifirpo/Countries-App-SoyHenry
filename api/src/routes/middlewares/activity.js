const {Router} = require("express");
const {Op, Tourist_activity, country_activity, Country} = require("../../db")
// const axios = require("axios");
const router = Router();

router.get("/", async(req, res) => {
    let allActivities = await Tourist_activity.findAll();
    if(!allActivities.length) return res.status(404).send("No hay acttividades");
    try {
        console.log("allActivities");
        res.status(200).send({allActivities: allActivities})
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.post("/", async(req, res) => {
    const { ID ,name, difficulty, duration, season, countriesID, durationTime} = req.body;

    const existId = await Tourist_activity.findByPk(ID);
    if(existId){
        return res.status(400).send(`Ya exíste una actividad con ID: ${ID}`)
    }

    const createdActivity = await Tourist_activity.create({
        ID,
        name,
        difficulty,
        duration,
        durationTime,
        season,
    })
     countriesID.forEach(element => {
        if(!Country.findByPk(element)) return res.status(400).send("Un país no se encontró en la bdd")
         country_activity.create({
            countryID: element,
            touristActivityID: ID
        })
    });

    try {
        res.status(200).send(createdActivity)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})
module.exports = router;