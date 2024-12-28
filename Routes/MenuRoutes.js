const express = require('express');
const router = express.Router();

const Menu = require('./../Models/ManuModel')

router.post('/', async (req, res) => {
    try {
      const data = req.body; 
      const NewMenu = new Menu(data);
      const response = await NewMenu.save();
      console.log("Menu Item Saved");
      res.status(200).json(response);
    }
    catch (e) {
      console.log(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
  
  router.get('/', async (req, res) => {
    try {
      const response = await Menu.find();
      console.log("Menu Item Fetched");
      res.status(200).json(response);
    }
    catch (e) {
      console.log(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })

  module.exports = router;
  