"use client";
import React, { useState } from "react";
import { useUser } from "@/contexts/UserContext";

const Home = () => {
  const { user, teams, createTeam, submitProject } = useUser() ?? {};
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [teamName, setTeamName] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateTeam = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (createTeam) { // Add null check
        await createTeam(teamName);
      }
      setTeamName("");
      alert(`Team ${teamName} created successfully!`);
    } catch (error) {
      console.error("Error creating team: ", error);
      alert("Failed to create team.");
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to submit.");
      return;
    }
    if (!teams || !teams.some(team => team.id === selectedTeam)) { // Add null check for 'teams'
      alert("Please select a valid team.");
      return;
    }
    setLoading(true);
    try {
      if (submitProject) { // Add null check
        await submitProject(selectedTeam, title, description, githubLink);
      }
      alert("Submission added successfully!");
      setTitle("");
      setDescription("");
      setGithubLink("");
    } catch (error) {
      console.error("Error adding submission: ", error);
      alert("Failed to add submission.");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Manage Your Teams and Submissions</h1>
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
      <div className="card">
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
      </div>
    </div>
  );
};

export default Home;
