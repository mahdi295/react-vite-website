import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  updateProfile,
} from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create provider instances
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // Add scope to get more user info from GitHub
  githubProvider.addScope("read:user");
  githubProvider.addScope("user:email");

  async function signup(email, password, name) {
    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update profile with name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // Refresh user data
      await userCredential.user.reload();

      return userCredential;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  async function loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // If no display name from Google, set from email
      if (!result.user.displayName && result.user.email) {
        await updateProfile(result.user, {
          displayName: result.user.email.split("@")[0],
        });
      }

      return result;
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    }
  }

  async function loginWithGitHub() {
    try {
      const result = await signInWithPopup(auth, githubProvider);

      // If no display name from GitHub, set from email or default
      if (!result.user.displayName) {
        const displayName = result.user.email
          ? result.user.email.split("@")[0]
          : "GitHub User";

        await updateProfile(result.user, {
          displayName: displayName,
        });
      }

      return result;
    } catch (error) {
      console.error("GitHub login error:", error);
      throw error;
    }
  }

  // Function to update user profile
  async function updateUserProfile(updates) {
    if (!auth.currentUser) throw new Error("No user logged in");

    await updateProfile(auth.currentUser, updates);
    // Refresh user data
    await auth.currentUser.reload();
    setUser({ ...auth.currentUser });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    signup,
    login,
    logout,
    loginWithGoogle,
    loginWithGitHub,
    updateUserProfile,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
