import { CommandParser } from "./command-parser";
import { Config } from "./config/config";
import { FileSystem } from "./file-system";
import { Location } from "./models/location";
import { LocationManager } from "./location-manager";
import { Utils } from "./utils";

const Discord = require('discord.js');

export class DiscordManager {

  private readonly discord: any;

  constructor(private commandParser: CommandParser, private fileSystem: FileSystem, private locationManager: LocationManager) {
    this.discord = new Discord.Client();
    this.discord.on('message', (message: string) => this.parseMessage(message));
    this.discord.on('ready', () => this.ready());
    this.discord.login(Config.TOKEN).then(/* Do nothing - don't care */);
  }

  private maxLocationNameLength(): number {
    let maxLength = -Infinity;
    this.locationManager.readLocations().forEach((location: Location) => {
        if (location.name.length > maxLength) {
            maxLength = location.name.length;
        }
    });
    return maxLength;
  }

  private notYetImplemented(): void {
    this.channel().send('```Sorry sucker, not yet```');
  }

  private parseMessage(message: any): void {
    if (message.author.username !== Config.BOT_NAME) {
        const messageContent = message.content;
        const isCommand = messageContent.charAt(0) === Config.COMMAND_PREFIX;
        if (isCommand) {
          this.commandParser.parseCommand(messageContent);
        }
    }
  }

  private ready(): void {
    this.listLocations();
  }

  public addLocation(location: string[]): void {
    // TODO: better param validation
    let valid = true;
    valid = location.length === 4;
    location.forEach((argument) => {
      if (!Utils.isString(argument)) {
        valid = false;
      }
    });
    if (valid) {
      let [ name, x, y, z ] = location;
      if (Utils.isNumber(name) || !Utils.isNumber(x) || !Utils.isNumber(y) || !Utils.isNumber(z)) {
        valid = false;
      }
      if (valid) {
        name = name.replace(/"/g, '');
        this.locationManager.addLocation({ name: name, x: parseInt(x), y: parseInt(y), z: parseInt(z) });
        this.fileSystem.fileSave();
        this.channel().send('Location ' + name + ' saved');
        setTimeout(this.clearMessages, 3000);
      }
    }
    if (!valid) {
      this.channel().send('Invalid location. Type !help for syntax.');
    }
  }

  public channel() {
    return this.discord.channels.find((channel: any) => {
      if (channel.hasOwnProperty('name')) {
        return channel.name === Config.CHANNEL_NAME;
      }
      return false;
    });
  }

  public clearMessages(): void {
    this.channel().fetchMessages().then((messageList: any) => {
      this.channel().bulkDelete(messageList).then(/* Do nothing - don't care */);
    });
  }

  public listLocations(): void {
    this.clearMessages();
    let sortedLocations = LocationManager.sortLocations(this.locationManager.readLocations());
    let description = '```';
    if (sortedLocations.length > 0) {
        sortedLocations.forEach((location: any, index: number) => {
            let spacesToAdd = this.maxLocationNameLength() - location.name.length;
            let spaces = ' '.repeat(spacesToAdd);
            description += index + 1 + '    ' + location.name + ':     ' + spaces + location.x + ', ' + location.y + ', ' + location.z + '\n'
        });
    } else {
        description += 'No saved locations.'
    }
    description += '```';
    const embed = {
        color: 49151,
        title: 'Saved Locations',
        description: description
    };
    this.channel().send('', {embed: embed});
  }

  public removeLocation(location: string[]): void {
    this.notYetImplemented();
  }

  public sendHelp(): void {
    this.clearMessages();
    for (let command of Config.COMMANDS) {
      const usage = '**Args**: ' + command.args + '\n' + '**Example**: ' + command.example;
      const embed = {
        color: command.color,
        title: command.name + ': ' + command.description,
        description: usage,
      };
      this.channel().send('', { embed: embed });
    }
  }

  public updateLocation(location: string[]): void {
    this.notYetImplemented();
  }

}
