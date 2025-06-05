import readline from 'readline';
import { commandExit } from './command_exit.js';
import type { CLICommand } from './command.js';
import { commandHelp } from './command_help.js';

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: 'exit',
      description: 'Exit the Pokedex',
      callback: commandExit,
    },
    help: {
      name: 'help',
      description: 'Displays a help message',
      callback: commandHelp,
    },
  };
}

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(' ');
}

export function startREPL() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Pokedex > ',
  });

  rl.prompt();

  rl.on('line', (rawLine: string) => {
    const words = cleanInput(rawLine);

    if (words.length === 0 || words[0] === '') {
      rl.prompt();
      return;
    }

    const commandName = words[0];
    const commands = getCommands();
    const command = commands[commandName];

    if (command) {
      try {
        command.callback(commands);
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
