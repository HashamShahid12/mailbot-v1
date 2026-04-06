export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  provider: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  sessionId: string | null;
  user: UserProfile | null;
  needsShopConnection: boolean;
  isSessionExpired: boolean;
  login: (payload: {
    accessToken: string;
    refreshToken?: string | null;
    sessionId?: string | null;
    user: UserProfile;
    needsShopConnection: boolean;
  }) => void;
  logout: () => void;
  setNeedsShopConnection: (value: boolean) => void;
  setSessionExpired: (value: boolean) => void;
}
