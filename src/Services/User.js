
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(); 
export const getCurrentUser = () => {
  const user = auth.currentUser;
  if (user) {
    console.log("Current user:", user);
    return user;
  } else {
    console.log("No user is currently signed in.");
    return null;
  }
};
export const setupAuthListener = (callback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User signed in:", user);
      callback(user); 
    } else {
      console.log("No user is currently signed in.");
      callback(null);
    }
  });
};

