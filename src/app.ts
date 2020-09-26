import * as dotenv from 'dotenv';
import { Tmi } from './init/Tmi';
import { commandsAndGroupsByChannel } from '../parameters';

/** initiate environmental variables */
dotenv.config();

export class App {
    private tmi: Tmi;

    constructor() {
        this.tmi = new Tmi();

        this.setEventListeners();
    }

    private setEventListeners() {
        const { client } = this.tmi;

        client.on('message', (channel, tags, message, self) => {
            if (self) {
                return;
            }

            /** always compare the lowercase of the message */
            const messageLowerCase = message.toLowerCase();

            const commandsAndGroups = commandsAndGroupsByChannel[channel];

            if (!commandsAndGroups) {
                return;
            }

            for (const command of Object.keys(commandsAndGroups)) {
                if (messageLowerCase.startsWith(command)) {
                    client.say(channel, commandsAndGroups[command]);
                    return;
                }
            }
        });
    }
}

new App();
