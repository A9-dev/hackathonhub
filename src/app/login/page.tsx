"use client";
import { useEffect, useState } from "react";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db, auth } from "@/utils/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { redirect } from "next/navigation";

export default function Login() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Additional state for username
  const [mode, setMode] = useState("login"); // Modes: 'login', 'register', 'reset'
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUsername(userDoc.data().username);
          toast.success("Signed in successfully!");
          setMessage(`Welcome back, ${userDoc.data().username}!`);
        } else {
          setMessage("Welcome back!");
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Signed out.");
    } catch (error) {
      console.error("Error signing out:", error as ToastOptions<unknown>);
      toast.error("Error signing out. Please try again.");
    }
  };

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in:", error as ToastOptions<unknown>);
      toast.error("Failed to sign in. Please check your credentials.");
    }
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        const userRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userRef, {
          username: username,
          email: email,
        });
        toast.success("Registration successful!");
        setMode("login");
      }
    } catch (error) {
      console.error("Error registering:", error as ToastOptions<unknown>);
      toast.error("Registration failed. Please try again.");
      alert("Registration failed. Please try again.");
    }
  };

  const handleResetPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.info("Password reset email sent.");
      setMode("login");
    } catch (error) {
      console.error(
        "Error sending password reset email:",
        error as ToastOptions<unknown>
      );
      toast.error(
        "Failed to send password reset email. Please check your email address."
      );
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <main className="border p-4 shadow rounded">
        <h1 className="text-center mb-4">
          {mode === "login"
            ? "Sign In"
            : mode === "register"
            ? "Register"
            : "Reset Password"}
        </h1>
        {user ? (
          <div className="text-center">
            <p>{message}</p>
            <button onClick={handleSignOut} className="btn btn-danger">
              Sign Out
            </button>
          </div>
        ) : (
          <form
            onSubmit={
              mode === "login"
                ? handleSignIn
                : mode === "register"
                ? handleRegister
                : handleResetPassword
            }
          >
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {mode === "register" && (
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}
            {mode !== "reset" && (
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                {mode === "login"
                  ? "Sign In"
                  : mode === "register"
                  ? "Register"
                  : "Reset Password"}
              </button>
            </div>
            <div className="text-center mt-3">
              {mode === "login" && (
                <>
                  <button
                    onClick={() => setMode("reset")}
                    className="btn btn-link"
                  >
                    Forgot password?
                  </button>
                  <button
                    onClick={() => setMode("register")}
                    className="btn btn-link"
                  >
                    Register
                  </button>
                </>
              )}
              {(mode === "register" || mode === "reset") && (
                <button
                  onClick={() => setMode("login")}
                  className="btn btn-link"
                >
                  Back to Login
                </button>
              )}
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
