"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/utils/firebaseConfig";
import { doc, getDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";

export interface Team {
	id: string;
	name: string;
}

export interface UserContextType {
	user: User | null;
	username: string;
	loading: boolean;
	teams: Team[];
	fetchTeams: () => void;
	createTeam: (teamName: string) => Promise<void>;
	submitProject: (teamId: string, title: string, description: string, githubLink: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [username, setUsername] = useState("");
	const [teams, setTeams] = useState<Team[]>([]);
	const [loading, setLoading] = useState(true);

	const createTeam = async (teamName: string) => {
		if (!user) throw new Error("Authentication required to create teams.");
		setLoading(true);
		try {
			const teamRef = await addDoc(collection(db, "teams"), { team_name: teamName });
			await addDoc(collection(db, "user_teams"), { user_id: user.uid, team_id: teamRef.id });
			await fetchTeams();
			alert(`Team ${teamName} created successfully!`);
		} catch (error) {
			console.error("Error creating team:", error);
			alert("Failed to create team.");
		}
		setLoading(false);
	};

	const submitProject = async (teamId: string, title: string, description: string, githubLink: string) => {
		if (!user) throw new Error("Authentication required to submit projects.");
		setLoading(true);
		try {
			const submissionRef = collection(db, "submissions");
			await addDoc(submissionRef, {
				team_id: teamId,
				user_id: user.uid,
				title: title,
				description: description,
				github_link: githubLink
			});
			alert("Project submitted successfully!");
		} catch (error) {
			console.error("Failed to submit project:", error);
			alert("Failed to submit project.");
		}
		setLoading(false);
	};
	const fetchTeams = useCallback(async () => {
		if (!user) {
			setTeams([]);
			return;
		}
		setLoading(true);
		const userTeamsRef = query(collection(db, "user_teams"), where("user_id", "==", user.uid));
		const querySnapshot = await getDocs(userTeamsRef);
		const loadedTeams = await Promise.all(querySnapshot.docs.map(async (docSnapshot) => {
			const teamRef = doc(db, "teams", docSnapshot.data().team_id);
			const teamDoc = await getDoc(teamRef);
			if (!teamDoc.exists()) {
				return null;
			}
			return { id: teamDoc.id, name: teamDoc.data().team_name };
		}));
		setTeams(loadedTeams.filter((team) => team !== null) as Team[]);
		setLoading(false);
	}, [user]); // db is stable and typically does not change, included here for completeness

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			setLoading(true);
			setUser(currentUser);
			if (currentUser) {
				const userRef = doc(db, "users", currentUser.uid);
				const userDoc = await getDoc(userRef);
				if (userDoc.exists()) {
					setUsername(userDoc.data().username);
					fetchTeams();
				}
			} else {
				setUsername("");
				setTeams([]);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, [fetchTeams]);

	useEffect(() => {
		if (user) {
			fetchTeams();
		}
	}, [user, fetchTeams]); // Re-fetch teams whenever user changes to keep the list updated

	return (
		<UserContext.Provider value={{ user, username, loading, teams, fetchTeams, createTeam, submitProject }}>
			{children}
		</UserContext.Provider>
	);
};
