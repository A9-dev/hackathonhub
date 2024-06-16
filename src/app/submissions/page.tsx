"use client";
import React, { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import SubmitProject from "@/components/SubmitProjectForm";
import CreateTeamForm from "@/components/CreateTeamForm";

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
      <CreateTeamForm />
      <SubmitProject />
    </div>
  );
};

export default Home;
