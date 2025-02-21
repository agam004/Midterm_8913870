// Name: Guragampreet Singh
// Student Number: 8913870
// Date/Time Created: 21/02/2025 3:44pm
// Description: This file contains routes for inventory management system
const express = require('express');
const router = express.Router();
const { Inventory } = require('../models/Inventory');
const Ledger  = require('../models/Ledger');

// GET /
// List all inventory items
router.get('/', async (req, res) => {
  try {
    const items = await Inventory.findAll();
    res.render('index', { items });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// GET /add
// Render form to add a new inventory item
router.get('/add', (req, res) => {
  res.render('add');
});

// POST /add
// Handle form submission to create a new inventory item
router.post('/add', async (req, res) => {
  try {
    const { name, quantity, price, description } = req.body;
    const newItem = await Inventory.create({
      name,
      quantity: parseInt(quantity),
      price: parseFloat(price).toFixed(2),
      description,
    });

    // TODO: Log ledger entry for creation
    await Ledger.create({
      inventoryId: newItem.id,
      action: 'created',
      details: `Item "${newItem.name}" created with quantity ${newItem.quantity} and price ${newItem.price}.`
    });//save the ledger entry with the details of the new item created

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding item');
  }
});

// GET /edit/:id
// Render form to edit an existing inventory item
router.get('/edit/:id', async (req, res) => {
  try {
    const item = await Inventory.findByPk(req.params.id);
    if (!item) return res.status(404).send('Item not found');
    res.render('edit', { item });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// POST /edit/:id
// Handle form submission to update an inventory item
router.post('/edit/:id', async (req, res) => {
  try {
    const { name, quantity, price, description } = req.body;
    await Inventory.update(
      {
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price).toFixed(2),
        description,
      },
      { where: { id: req.params.id } }
    );

    //TODO: Log ledger entry for update
    const updatedItem = await Inventory.findByPk(req.params.id);
    //Get the updated item for inventory
    
    // 
    await Ledger.create({
      inventoryId: updatedItem.id,
      action: 'updated',
      details: `Item updated to : Name: '${updatedItem.name}', quantity: ${updatedItem.quantity}, price: ${updatedItem.price}.`
    });//save the ledger entry with the details of the updated item

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating item');
  }
});

// POST /delete/:id
// Delete an inventory item
router.post('/delete/:id', async (req, res) => {
  try {
      // TODO: Log ledger entry for deletion
      const deletedItem = await Inventory.findByPk(req.params.id);//Get the item to be deleted
      await Ledger.create({
        inventoryId: deletedItem.id,
        action: 'deleted',
        details: `Item with ID ${deletedItem.id} was deleted.`
      });//save the ledger entry with the details of the deleted item

    await Inventory.destroy({ where: { id: deletedItem.id } });//delete the item from the inventory
    
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting item');
  }
});

module.exports = router;
