export class Conversation {
  _id?: string;
  roomId: string;
  userIds: string[];
  points: number;
  lastUpdate?: Date;
  hasAnswered: Boolean;

  constructor(options: {
    _id?: string,
    roomId: string,
    userIds: string[],
    points?: number,
    lastUpdate?: Date,
    hasAnswered: Boolean
  }) {
    this._id = options._id || undefined;
    this.roomId = options.roomId;
    this.userIds = options.userIds;
    this.points = options.points || 0;
    this.lastUpdate = options.lastUpdate || undefined;
    this.hasAnswered = options.hasAnswered;

  }
}
