"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/utils/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export interface UserContextType {
	user: User | null;
	username: string;
	loading: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => useContext(UserContext);
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [username, setUsername] = useState("");
	const [loading, setLoading] = useState(true); // Track loading state

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			setLoading(true); // Set loading true on auth state change
			setUser(currentUser);
			if (currentUser) {
				const userRef = doc(db, "users", currentUser.uid);
				const userDoc = await getDoc(userRef);
				if (userDoc.exists()) {
					setUsername(userDoc.data().username);
				}
				setLoading(false); // Set loading false after fetching user data
			} else {
				setUsername("");
				setLoading(false); // Set loading false if no user is logged in
			}
		});

		return () => unsubscribe();
	}, []);

	return (
		<UserContext.Provider value={{ user, username, loading }}>
			{children}
		</UserContext.Provider>
	);
};
