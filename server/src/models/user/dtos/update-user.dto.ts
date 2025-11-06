export interface UpdateUserDTO {
  name?: string;
  role?: string;
  permissions?: string[];
  active?: boolean;
  admitted?: boolean;
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
