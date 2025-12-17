const mongoose = require('mongoose');
const Note = require('./models/Note');
const Workspace = require('./models/Workspace');

mongoose.connect('mongodb://localhost:27017/halfbyte')
    .then(async () => {
        console.log('✅ Connected to MongoDB');

        const workspace = await Workspace.findOne();
        if (!workspace) {
            console.log('❌ No workspace found');
            process.exit(1);
        }

        console.log('📁 Using workspace:', workspace.workspaceId);

        const note1 = new Note({
            title: 'JavaScript Temelleri',
            content: 'JavaScript değişkenler, fonksiyonlar ve döngüler hakkında temel bilgiler. var, let, const kullanımı...',
            workspaceId: workspace.workspaceId,
            createdBy: workspace.members[0] || 'demo'
        });

        const note2 = new Note({
            title: 'React Hooks',
            content: 'useState, useEffect ve custom hooks kullanımı. Component lifecycle ve state management...',
            workspaceId: workspace.workspaceId,
            createdBy: workspace.members[0] || 'demo'
        });

        await note1.save();
        await note2.save();

        console.log('✅ Created 2 sample notes!');
        console.log('   - ' + note1.title);
        console.log('   - ' + note2.title);

        process.exit(0);
    })
    .catch(err => {
        console.error('❌ Error:', err.message);
        process.exit(1);
    });
