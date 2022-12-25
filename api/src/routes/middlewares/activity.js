const {Router} = require("express");
const {Op, Tourist_activity} = require("../../db")
// const axios = require("axios");
const router = Router();

let id = 0;

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
    const {name, difficulty, duration, season, countriesID, durationTime} = req.body;

    const createdActivity = await Tourist_activity.create({
        ID: id++,
        name,
        difficulty,
        duration,
        durationTime,
        season,
    })
    createdActivity.addCountries(countriesID)

    try {
        res.status(200).send(createdActivity)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})
module.exports = router;