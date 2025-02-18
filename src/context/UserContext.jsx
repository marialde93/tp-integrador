import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../config/auth";

const UserContext = createContext();

const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        try {
          const userDoc = await getDoc(doc(db, "register", user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          } else {
            setUserProfile(null);
          }
        } catch (error) {
          console.error("Error al cargar el perfil del usuario:", error);
        }
      };

      fetchUserProfile();
    } else {
      setUserProfile(null);
    }
  }, [user]);

  const updateProfile = async (newProfile) => {
    if (user) {
      try {
        await setDoc(doc(db, "register", user.uid), newProfile, {
          merge: true,
        });
        setUserProfile(newProfile);
      } catch (error) {
        console.error("Error al actualizar el perfil:", error);
      }
    }
  };

  return (
    <UserContext.Provider value={{ userProfile, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export { useUser, UserProvider };
