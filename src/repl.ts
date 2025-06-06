import type { State } from './state.js';

export function cleanInput(input: string): string[] {
    return input.trim().toLowerCase().split(' ');
}

export function startREPL(state: State) {
    const rl = state.rl;

    rl.prompt();

    rl.on('line', async (rawLine: string) => {
        const words = cleanInput(rawLine);

        if (words.length === 0 || words[0] === '') {
            rl.prompt();
            return;
        }

        const commandName = words[0];
        const command = state.commands[commandName];
        const args = words.slice(1);

        if (command) {
            try {
                await command.callback(state, ...args);
            } catch (error) {
                console.log(`Error executing command: ${commandName}`);
            }
        } else {
            console.log(`Unknown command`);
        }

        rl.prompt();
    });

    // Handle Ctrl+C (SIGINT)
    rl.on('SIGINT', () => {
        rl.question('Are you sure you want to quit? (y/n) ', (answer) => {
            if (answer.toLowerCase() === 'y') {
                rl.close();
            } else {
                rl.prompt();
            }
        });
    });

    rl.on('close', () => {
        console.log('Exiting...');
        process.exit(0);
    });
}
