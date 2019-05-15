import { DiscordManager } from "./discord-manager";

export class CommandParser {

  private discordManager: DiscordManager;

  public registerDiscord(discordManager: DiscordManager): void {
    this.discordManager = discordManager;
  }

  public parseCommand(commandString: string): void {
    const args = commandString.slice(1).split(' ');
    const command = args[0];
    const parameters = args.slice(1, args.length).join(' ').match(/(\w|-)+|"[^"]+"/g);
    switch (command) {
      case 'add': this.discordManager.addLocation(parameters); break;
      case 'clear': this.discordManager.clearMessages(); break;
      case 'help': this.discordManager.sendHelp(); break;
      case 'list': this.discordManager.listLocations(); break;
      case 'remove': this.discordManager.removeLocation(parameters); break;
      case 'update': this.discordManager.updateLocation(parameters); break;
      default: this.discordManager.sendHelp();
    }
  }

}
