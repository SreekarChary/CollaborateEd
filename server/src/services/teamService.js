// server/src/services/teamService.js - Business logic for team operations.

const { db, admin } = require('../config/firebase');

const teamsCollection = db.collection('teams');

exports.createTeam = async (data) => {
    const team = {
        name: data.name,
        teamCode: Math.random().toString(36).substring(2, 8).toUpperCase(), 
        leaderId: data.leaderId,
        members: [data.leaderId],
        createdAt: admin.firestore.Timestamp.now(),
        status: 'Active',
    };
    const docRef = await teamsCollection.add(team);
    return { id: docRef.id, ...team };
};

exports.getTeamsData = async (userId) => {
    // Fetch all teams the user is a member of
    const teamsSnapshot = await teamsCollection.where('members', 'array-contains', userId).get();
    
    let allTeams = teamsSnapshot.docs.map(doc => ({ 
        id: doc.id, 
        leader: doc.data().leaderId === userId ? "You (Leader)" : "Team Leader", 
        ...doc.data() 
    }));

    // Sort by creation time (or last activity time)
    allTeams.sort((a, b) => b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime());

    // Separate based on logic (e.g., first 2 are pinned)
    const pinnedTeams = allTeams.slice(0, 2);
    const latestTeams = allTeams.slice(2);

    return {
        pinned: pinnedTeams,
        latest: latestTeams,
    };
};

exports.updateTeamMembership = async (teamId, memberId, action, currentUserId) => {
    // ... (rest of the membership logic remains the same)
    const teamRef = teamsCollection.doc(teamId);
    const teamDoc = await teamRef.get();
    
    if (!teamDoc.exists) {
        throw { status: 404, message: 'Team not found' };
    }
    
    const team = teamDoc.data();
    
    if (team.leaderId !== currentUserId) {
        throw { status: 403, message: 'Permission denied. Only the team leader can perform this action.' };
    }
    
    // Logic for 'remove' or 'transfer_leadership'
    if (action === 'remove') {
        if (memberId === team.leaderId) throw { status: 400, message: 'Leader cannot remove self. Transfer leadership first.' };
        await teamRef.update({ members: admin.firestore.FieldValue.arrayRemove(memberId) });
        return { message: `Member ${memberId} removed.` };
    }
    
    if (action === 'transfer_leadership') {
        if (!team.members.includes(memberId)) throw { status: 400, message: 'New leader must be an existing member.' };
        await teamRef.update({ leaderId: memberId });
        return { message: `Leadership transferred to ${memberId}.` };
    }

    throw { status: 400, message: 'Invalid team action.' };
};