const mongoose = require('mongoose');

const WorkspaceSchema = new mongoose.Schema({
    workspaceId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    ownerUsername: {
        type: String,
        required: true 
    },
    members: [{
        type: String 
    }]
}, { timestamps: true });

module.exports = mongoose.model('Workspace', WorkspaceSchema);
