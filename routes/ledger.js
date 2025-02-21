// Name: Guragampreet Singh
// Student Number: 8913870
// Date/Time Created: 21/02/2025 3:44pm
// Description: This file contains routes for ledger
const express = require('express');
const router = express.Router();
const Ledger = require('../models/Ledger');


router.get('/', async (req, res) => {
    try {
      const ledgerEntries = await Ledger.findAll({
        order: [['createdAt', 'DESC']] //Show latest entries first
      });
      console.log("Ledger Entries",ledgerEntries);
      res.render('ledger', { ledgerEntries });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;
