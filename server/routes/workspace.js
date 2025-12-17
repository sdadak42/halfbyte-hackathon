const express = require('express');
const router = express.Router();
const Workspace = require('../models/Workspace');
const auth = require('../middleware/auth'); 

function generateCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

router.post('/create', auth, async (req, res) => {
    try {
        const { name } = req.body;

        const workspaceId = generateCode();

        const newWorkspace = new Workspace({
            workspaceId,
            name,
            ownerUsername: req.user.username,
            members: [req.user.username] 
        });

        const savedWorkspace = await newWorkspace.save();
        res.status(201).json(savedWorkspace);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/join', auth, async (req, res) => {
    try {
        const { workspaceId } = req.body;
        const username = req.user.username;

        const workspace = await Workspace.findOne({ workspaceId });
        if (!workspace) {
            return res.status(404).json({ message: 'Çalışma alanı bulunamadı.' });
        }

        if (workspace.members.includes(username)) {
            return res.status(200).json({ message: 'Zaten bu alana üyesiniz.', workspace });
        }

        workspace.members.push(username);
        await workspace.save();

        res.status(200).json(workspace);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/list', auth, async (req, res) => {
    try {
        const username = req.user.username;
        const workspaces = await Workspace.find({ members: username });
        res.status(200).json(workspaces);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:workspaceId', auth, async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const username = req.user.username;

        const workspace = await Workspace.findOne({ workspaceId });
        if (!workspace) {
            return res.status(404).json({ message: 'Çalışma alanı bulunamadı.' });
        }

        if (workspace.ownerUsername !== username) {
            return res.status(403).json({ message: 'Bu alanı silmeye yetkiniz yok.' });
        }

        await Workspace.deleteOne({ workspaceId });

        res.status(200).json({ message: 'Çalışma alanı ve bağlı tüm veriler silindi.' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
