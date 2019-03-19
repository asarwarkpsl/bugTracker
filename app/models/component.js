var mongoose = require('mongoose');
var timestamp = require('mongoose-timestamp');

var componentSchema = new mongoose.Schema({
    name: String,
    desc: String,
    assigned_users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    created_at: Date,
    created_by: {
        type: mongoose.Schema.Types.objectId,
        ref: 'User'
    },
    project: {
        Type: mongoose.Schema.Types.objectId,
        ref='Project'
    },
    bugs: [{
        type: mongoose.Schema.Types.objectId,
        ref='Bug'
    }]
});

componentSchema.plugin(timestamp);

module.exports = mongoose.model('Component', componentSchema);