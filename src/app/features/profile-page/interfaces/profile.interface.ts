export interface Profile {
  profile: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

export interface ProfileInitialData {
  profile: Profile | null | undefined;
  profileLoading: boolean;
}
