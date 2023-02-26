// Description: This file is used to create a new collection in the database for the join-to-create feature.
const { model, Schema } = require('mongoose');

const schema = new Schema({
    Guild: String,
    Channel: String,
    UserLimit: Number
});

module.exports = model('join-to-create', schema);