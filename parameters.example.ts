export const allChannelParameters: Record<
    string,
    {
        commands: Record<
            string,
            {
                group: string;
                showNamesExclusively?: string[];
                separator: string;
            }
        >;
    }
> = {
    // channel name as object keu
    '#channel1': {
        commands: {
            // command name as object key
            '!animals': {
                // group to be used for the string similarity server
                group: 'animals',
                // this will be used to separate data entries of the found object
                separator: ' - ',
                // if it has entries, only those names of the "data" field will be returned. If not set or empty, every name will be returned.
                showNamesExclusively: ['Height', 'Length'],
            },
        },
    },
    '#channel2': {
        commands: {
            '!countries': {
                group: 'countries',
                separator: ' , ',
                showNamesExclusively: [],
            },
            '!animals': {
                group: 'animals',
                separator: ' | ',
                showNamesExclusively: ['Size'],
            },
        },
    },
};
