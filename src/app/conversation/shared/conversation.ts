export class Conversation {
	roomId: string;
	points: number;
	lastUpdate?: Date;

	constructor(options:
		{
			roomId: string,
			points?: number,
			lastUpdate?:Date
		}
	)
	{
		this.roomId = options.roomId;
		this.points = options.points || 0;
		this.lastUpdate = options.lastUpdate || undefined;
	}
}
