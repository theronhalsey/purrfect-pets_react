import express from 'express';
import Petfinder from'./Petfinder.js'

const router = express.Router();

router.get("/getPets", async (req, res) => {
    try {
        const pets = await Petfinder.getPets();
        res.send(pets)
    } catch (err) {
        res.status(500).send("Petfinder API error");
    }
});

export default router;