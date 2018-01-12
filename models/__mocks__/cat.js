'use strict'
var SequelizeMock = require('sequelize-mock')
var dbMock = new SequelizeMock()

module.exports = function(sequelize, DataTypes){
  return dbMock.define('Cat', {
    name: 'Paws',
    age: 4,
    city: 'Long walks on the beach.',
    bio: 'Loves to play.'
  })
}
