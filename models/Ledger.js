// Name: Guragampreet Singh
// Student Number: 8913870
// Date/Time Created: 21/02/2025 3:44pm
// Description: This file contains the Ledger model

// Import the sequelize library and Inventory model
const { DataTypes } = require('sequelize');
const { sequelize } = require('./Inventory');

// TODO: Define the Ledger model
const Ledger = sequelize.define('Ledger', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    inventoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    details: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    timestamps: true // To include createdAt and updatedAt fields
  });
  

module.exports = Ledger;
