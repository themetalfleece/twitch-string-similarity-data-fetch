import { Client } from 'tmi.js';
import { allChannelParameters } from '../../parameters';

export class Tmi {
    public client: Client;

    constructor() {
        /* setup the tmi.js client and connect */
        this.client = Client({
            options: { debug: process.env.TWITCH_CLIENT_DEBUG === 'true' },
            connection: {
                reconnect: true,
                secure: true,
            },
            identity: {
                username: process.env.TWITCH_BOT_USERNAME,
                password: process.env.TWITCH_BOT_PASSWORD,
            },
            channels: Object.keys(allChannelParameters),
        });

        this.client.connect();
    }
}
