var mongoose = require('mongoose');
var timestamp = require('mongoose-timestamp');

var bugSchema = new mongoose.Schema({
    bug_id: String,
    name: String,
    desc: String,
    identified_at: Date,
    identified_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assigned_component: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Component'
    }],
    assigned_users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    status: {
        type: String,
        enum: ['Open', 'Re-Open', 'Close', 'Under Progress', 'Fixed', 'Not a bug']
    },
    resolved_at: Date,
    comments: [
        {
            text: String,
            created_at: Date,
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            attachments: [{
                created_at: Date
            }]
        }
    ]
});

bugSchema.plugin(timestamp);

module.exports = mongoose.model('Bugs', bugSchema);