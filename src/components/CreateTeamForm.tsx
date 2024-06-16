// src/components/CreateTeamForm.tsx
import React, { useState } from "react";
import { useUser } from "@/contexts/UserContext";

const CreateTeamForm = () => {
    const { createTeam } = useUser() ?? {};
    const [teamName, setTeamName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreateTeam = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!createTeam) {
            console.error("Create team function is not available");
            alert("Function not available");
            return;
        }
        setLoading(true);
        try {
            await createTeam(teamName);
            alert(`Team ${teamName} created successfully!`);
            setTeamName("");
        } catch (error) {
            console.error("Error creating team: ", error);
            alert("Failed to create team.");
        }
        setLoading(false);
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h2>Create Team</h2>
                <form onSubmit={handleCreateTeam} className="form-inline">
                    <input
                        type="text"
                        value={teamName}
                        onChange={e => setTeamName(e.target.value)}
                        placeholder="Team Name"
                        className="form-control mr-2"
                        required
                    />
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        Create Team
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateTeamForm;
