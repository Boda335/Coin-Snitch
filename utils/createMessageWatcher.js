/**
 * Creates a message collector for messageCreate events.
 * @param {Channel} channel - The Discord text channel.
 * @param {Function} filter - The filter function for messages.
 * @param {number} timeout - Time in ms before timeout.
 * @returns {Promise<boolean>} Resolves to true if condition met, else false.
 */
function createMessageWatcher(channel, filter, timeout) {
    return new Promise((resolve) => {
        const collector = channel.createMessageCollector({ filter, time: timeout });

        collector.on('collect', () => {
            resolve(true);
            collector.stop();
        });

        collector.on('end', (_, reason) => {
            if (reason === 'time') resolve(false);
        });
    });
}

module.exports = createMessageWatcher;
