export class Oauth {
  platform: string;
  id: number;
  
  constructor(options: {
    platform: string,
    id: number
  }) {
    this.platform = options.platform;
    this.id = options.id;
  }
}
