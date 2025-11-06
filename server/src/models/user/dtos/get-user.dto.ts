export interface GetUserDto {
  id: string;
  created_at?: string;
  updated_at?: string;
  role?: string;
  permissions?: string[];
  email: string;
  active?: boolean;
  admitted?: boolean;
  name?: string;
  company?: string;
  purpose?: string;
  referrals?: number;
  token?: string;
  gender?: string;
  city?: string;
  state?: string;
  country?: string;
  birthdate?: string;
  status?: string;
}
