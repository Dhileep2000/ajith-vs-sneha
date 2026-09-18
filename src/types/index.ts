export interface GuestRsvpData {
  fullName: string;
  attending: 'yes' | 'no' | 'undecided';
  guestCount: number;
  plusOneName?: string;
  alcoholPreferences: string[];
  dietaryRestrictions: string;
  favoriteTrack?: string;
  message?: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  icon?: string;
}
