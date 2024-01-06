export interface RegisterRequest {
  user: {
    username: string;
    email: string;
    password: string;
  };
}
export interface loginRequest {
  user: {
    email: string;
    password: string;
  };
}
export interface CurrentUser {
  email: string;
  token: string;
  username: string;
  bio?: string;
  image?: string;
}

export interface AuthState {
  isSubmit: boolean;
  currentUser: CurrentUser | null | undefined;
  isLoadingUser: boolean;
  validationErrors: any;
}

export interface AuthResponse {
  user: CurrentUser;
}

export interface BackendErrors {
  [key: string]: string[];
}
