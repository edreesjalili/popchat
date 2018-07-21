import { Oauth } from './oauth';

export class User {
  firstName: string;
  lastName?: string;
  email: string;
  profileImageUrl: string;
  points: number;
  oauth: Oauth;
  lastLogin?: Date;
  lastUpdate?: Date;

  constructor(options: {
    firstName: string,
    lastName?: string,
    email: string,
    profileImageUrl: string,
    points?: number,
    oauth: Oauth,
    lastLogin?: Date,
    lastUpdate?: Date
  }) {
    this.firstName = options.firstName;
    this.lastName = options.lastName || undefined;
    this.email = options.email;
    this.profileImageUrl = options.profileImageUrl;
    this.points = options.points || 0;
    this.oauth = options.oauth;
    this.lastLogin = options.lastLogin || undefined;
    this.lastUpdate = options.lastUpdate || undefined;
  }
}
