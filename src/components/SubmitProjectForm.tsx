// src/components/SubmitProject.tsx
import React, { useState } from "react";
import { useUser, UserContextType } from "@/contexts/UserContext";

const SubmitProject = () => {
    const { user, teams, submitProject } = useUser() as UserContextType; // Type assertion for context
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [githubLink, setGithubLink] = useState("");
    const [selectedTeam, setSelectedTeam] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) {
            alert("You must be logged in to submit.");
            return;
        }
        if (!selectedTeam) {
            alert("Please select a team.");
            return;
        }
        setLoading(true);
        try {
            await submitProject(selectedTeam, title, description, githubLink);
            alert("Submission added successfully!");
            setTitle("");
            setDescription("");
            setGithubLink("");
            setSelectedTeam(""); // Reset selected team after submission
        } catch (error) {
            console.error("Error submitting project:", error);
            alert("Failed to submit project.");
        }
        setLoading(false);
    };

    return (
        <div className="card-body">
            <h2>Submit Your Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Title"
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Description"
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="url"
                        value={githubLink}
                        onChange={e => setGithubLink(e.target.value)}
                        placeholder="GitHub Link"
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <select
                        value={selectedTeam}
                        onChange={e => setSelectedTeam(e.target.value)}
                        className="form-control"
                        required
                    >
                        <option value="">Select a team</option>
                        {(teams ?? []).map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>

    );
};

export default SubmitProject;
