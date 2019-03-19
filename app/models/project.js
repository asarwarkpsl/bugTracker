var mongoose = require('mongoose');
var timestamp = require('mongoose-timestamp');

var projectSchema = new mongoose.Schema({
    name: string,
    desc: string,
    components: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Component'
    }],
    start_date: Date,
    target_end_date: Date,
    actual_end_date: Date,
    created_at: Date,
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    modified_at: Date,
    modified_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

projectSchema.plugin(timestamp);

module.exports = mongoose.model('Project', projectSchema);