// server/src/services/taskService.js - Business logic for task operations.

const { db, admin } = require('../config/firebase');

const tasksCollection = db.collection('tasks');

exports.createTask = async (data) => {
    // Requires data validation before this point in a production app
    const task = {
        title: data.title,
        status: 'created',
        teamId: data.teamId,
        assigneeId: data.assigneeId,
        priority: data.priority || 'Medium',
        deadline: data.deadline ? admin.firestore.Timestamp.fromDate(new Date(data.deadline)) : null,
        createdAt: admin.firestore.Timestamp.now(),
    };
    const docRef = await tasksCollection.add(task);
    return { id: docRef.id, ...task };
};

exports.updateTaskStatus = async (taskId, newStatus, userId, io) => {
    if (!['created', 'in_progress', 'completed', 'collaborated'].includes(newStatus)) {
        throw { status: 400, message: 'Invalid task status.' };
    }

    const taskRef = tasksCollection.doc(taskId);
    await taskRef.update({ 
        status: newStatus, 
        lastModified: admin.firestore.Timestamp.now(),
        modifiedBy: userId,
    });
    
    // Broadcast the update immediately via WebSocket to all clients
    io.emit('task_status_changed', { taskId, newStatus });

    return { id: taskId, status: newStatus };
};

exports.getTasksGrouped = async (userId) => {
    // Fetches all tasks where the user is the assignee
    const snapshot = await tasksCollection.where('assigneeId', '==', userId).get();
    
    const tasks = { created: [], in_progress: [], completed: [], collaborated: [] };
    
    snapshot.forEach(doc => {
        const task = { 
            id: doc.id, 
            team: "Mock Team", // Requires join with teams collection
            priority: "Medium", // Requires priority field
            ...doc.data() 
        };
        if (tasks[task.status]) {
            tasks[task.status].push(task);
        }
    });

    return tasks;
};

exports.getDashboardData = async (userId) => {
    const now = new Date();
    const futureDate = new Date(now.getTime() + (36 * 60 * 60 * 1000)); // 36 hours minimum

    // 1. Fetch Ongoing Count
    const ongoingCount = await tasksCollection.where('assigneeId', '==', userId).where('status', '==', 'in_progress').get().then(s => s.size);

    // 2. Fetch Deadline Tasks (> 36 hours from now)
    const deadlineSnapshot = await tasksCollection
        .where('assigneeId', '==', userId)
        .where('status', 'in', ['created', 'in_progress'])
        .where('deadline', '>', admin.firestore.Timestamp.fromDate(futureDate))
        .limit(5)
        .get();

    const deadlineTasks = deadlineSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        timeRemaining: doc.data().deadline.toDate().getTime() - now.getTime(),
    }));

    // --- Placeholder Data for complex features (Needs separate collections) ---
    const mockUpdates = [
        { user: "MD.MUBEEN HUSSAIN", message: "completed task 'UX Flowchart'", team: "Phoenix", time: "10 min ago" },
        { user: "S.SREEKAR", message: "uploaded file 'v2.pdf'", team: "PYRO", time: "3 hrs ago" },
    ];
    
    return {
        ongoingCount: ongoingCount,
        deadlineTasks: deadlineTasks,
        pinnedTasks: [{ id: 'P01', title: "Backend API Draft", team: "Team A", priority: "High" }],
        pinnedTeams: [{ id: 'T001', name: "Project Aurora", members: 4 }],
        latestUpdates: mockUpdates,
    };
};