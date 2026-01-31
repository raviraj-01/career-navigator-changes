import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import {
  getResumesForUser,
  addResumeForUser as addResumeStorage,
  deleteResumeForUser as deleteResumeStorage,
  type StoredResume,
  type StoredMessage,
} from "@/lib/userResumes";

type UserResumesContextType = {
  resumes: StoredResume[];
  addResume: (resume: Omit<StoredResume, "id">) => StoredResume | null;
  deleteResume: (id: string) => void;
  refreshResumes: () => void;
};

const UserResumesContext = createContext<UserResumesContextType | undefined>(undefined);

export const UserResumesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<StoredResume[]>([]);

  const refreshResumes = useCallback(() => {
    if (!user?.id) {
      setResumes([]);
      return;
    }
    setResumes(getResumesForUser(user.id));
  }, [user?.id]);

  useEffect(() => {
    refreshResumes();
  }, [refreshResumes]);

  const addResume = useCallback(
    (resume: Omit<StoredResume, "id">): StoredResume | null => {
      if (!user?.id) return null;
      const added = addResumeStorage(user.id, resume);
      setResumes((prev) => [...prev, added]);
      return added;
    },
    [user?.id]
  );

  const deleteResume = useCallback(
    (id: string) => {
      if (!user?.id) return;
      deleteResumeStorage(user.id, id);
      setResumes((prev) => prev.filter((r) => r.id !== id));
    },
    [user?.id]
  );

  return (
    <UserResumesContext.Provider value={{ resumes, addResume, deleteResume, refreshResumes }}>
      {children}
    </UserResumesContext.Provider>
  );
};

export const useUserResumes = () => {
  const context = useContext(UserResumesContext);
  if (context === undefined) {
    throw new Error("useUserResumes must be used within UserResumesProvider");
  }
  return context;
};

export type { StoredResume, StoredMessage };
