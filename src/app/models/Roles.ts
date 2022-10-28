export interface Roles {
  reader: boolean;
  author?: boolean;
  admin?: boolean;
}

export class User {
  email: string;
  photoURL: string;
  roles: Roles;
}
