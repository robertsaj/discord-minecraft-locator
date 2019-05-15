import { DiscordManager } from "./discord-manager";

export class CommandParser {

  constructor(private discordManager: DiscordManager) { }

  public static parseCommand(commandString: string, discordManager: DiscordManager): void {
    const args = commandString.slice(1).split(' ');
    const command = args[0];
    const parameters = args.slice(1, args.length).join(' ').match(/(\w|-)+|"[^"]+"/g);
    switch (command) {
      case 'add': discordManager.addLocation(parameters); break;
      case 'clear': discordManager.clearMessages(); break;
      case 'help': discordManager.sendHelp(); break;
      case 'list': discordManager.listLocations(); break;
      case 'remove': discordManager.removeLocation(parameters); break;
      case 'update': discordManager.updateLocation(parameters); break;
      default: discordManager.sendHelp();
    }
  }

}