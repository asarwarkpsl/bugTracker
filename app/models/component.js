var mongoose = require('mongoose');
var timestamp = require('mongoose-timestamp');

var compSchema = new mongoose.Schema({
    name: String,
    desc: String,
    assigned_users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    created_at: Date,
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    bugs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bug'
        }
    ]
});

compSchema.plugin(timestamp);

module.exports = mongoose.model('Component', compSchema);