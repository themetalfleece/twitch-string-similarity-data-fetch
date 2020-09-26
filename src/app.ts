import * as dotenv from 'dotenv';
import { Tmi } from './init/Tmi';
import { allChannelParameters } from '../parameters';
import axios from 'axios';

/** initiate environmental variables */
dotenv.config();

export class App {
    private tmi: Tmi;
    private stringSimilarityServerUrl: string;

    constructor() {
        this.tmi = new Tmi();

        this.setEventListeners();

        if (!process.env.STRING_SIMILARITY_SERVER_URL) {
            throw new Error('STRING_SIMILARITY_SERVER_URL env not given');
        }
        this.stringSimilarityServerUrl =
            process.env.STRING_SIMILARITY_SERVER_URL;
    }

    private setEventListeners() {
        const { client } = this.tmi;

        client.on('message', async (channel, tags, message, self) => {
            try {
                if (self) {
                    return;
                }

                /** always compare the lowercase of the message */
                const messageLowerCase = message.toLowerCase();

                const channelParameters = allChannelParameters[channel];

                if (!channelParameters) {
                    return;
                }

                for (const command of Object.keys(channelParameters.commands)) {
                    if (messageLowerCase.startsWith(command)) {
                        const {
                            group,
                            showNamesExclusively,
                            separator,
                        } = channelParameters.commands[command];
                        // the search string is the remaining message
                        const searchString = message.split(command)[1].trim();

                        // fetch the data from the similarity server
                        const res = await axios.get<{
                            data: Array<{
                                name: string;
                                value: string;
                            }>;
                        }>(
                            `${this.stringSimilarityServerUrl}/${group}/${searchString}`,
                        );

                        const messageToSend = res.data.data
                            .filter(({ name }) => {
                                // only keep the exclusive names if it has a length. Else, keep everything
                                if (!showNamesExclusively?.length) {
                                    return true;
                                }
                                return showNamesExclusively.includes(name);
                            })
                            .map(({ name, value }) => `${name}: ${value}`)
                            .join(separator);

                        await client.say(channel, messageToSend);

                        return;
                    }
                }
            } catch (err) {
                await client.say(channel, 'Error while loading data');
                console.log(err);
            }
        });
    }
}

new App();
