const { Router } = require('express');
// Importar todos los routers;
const countriesRouter = require("./middlewares/countries")
const activityRouter = require("./middlewares/activity")
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
router.use("/countries", countriesRouter);
router.use("/activities", activityRouter);
// Ejemplo: router.use('/auth', authRouter);
module.exports = router;
