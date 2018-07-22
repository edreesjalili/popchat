import { Oauth } from './oauth';

export class User {
  _id?: string;
  firstName: string;
  lastName?: string;
  email: string;
  profileImageUrl: string;
  points: number;
  asking: boolean;
  oauth: Oauth;
  lastLogin?: Date;
  lastUpdate?: Date;

  constructor(options: {
    _id?: string,
    firstName: string,
    lastName?: string,
    email: string,
    profileImageUrl: string,
    points?: number,
    asking: boolean,
    oauth: Oauth,
    lastLogin?: Date,
    lastUpdate?: Date
  }) {
    this._id = options._id || undefined;
    this.firstName = options.firstName;
    this.lastName = options.lastName || undefined;
    this.email = options.email;
    this.profileImageUrl = options.profileImageUrl;
    this.points = options.points || 0;
    this.asking = options.asking;
    this.oauth = options.oauth;
    this.lastLogin = options.lastLogin || undefined;
    this.lastUpdate = options.lastUpdate || undefined;
  }
}
