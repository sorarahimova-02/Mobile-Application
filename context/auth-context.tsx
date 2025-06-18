import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type StoredUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateUserProfile: (firstName: string, lastName: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulated user storage
let storedUsers: StoredUser[] = [];

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  
  const signIn = async (email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const foundUser = storedUsers.find(
          u => u.email === email && u.password === password
        );

        if (foundUser) {
          const { password: _, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };
  
  const signUp = async (firstName: string, lastName: string, email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        if (storedUsers.some(u => u.email === email)) {
          reject(new Error('User already exists'));
          return;
        }

        const newUser = {
          id: Date.now().toString(),
          firstName,
          lastName,
          email,
          password,
        };

        storedUsers.push(newUser);
        const { password: _, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        resolve();
      }, 1000);
    });
  };
  
  const updateUserProfile = async (firstName: string, lastName: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser(prev => {
          if (!prev) return null;
          
          // Update stored user as well
          storedUsers = storedUsers.map(u => 
            u.id === prev.id 
              ? { ...u, firstName, lastName }
              : u
          );

          return {
            ...prev,
            firstName,
            lastName,
          };
        });
        resolve();
      }, 500);
    });
  };
  
  const signOut = () => {
    setUser(null);
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signOut,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}