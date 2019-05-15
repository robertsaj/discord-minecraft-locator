import { FileSystem } from "./file-system";
import { LocationManager } from "./location-manager";
import { DiscordManager } from "./discord-manager";
import { CommandParser } from "./command-parser";

class MinecraftLocationsBot {

  private readonly commandParser: CommandParser;
  private readonly discord: any;
  private readonly fileSystem: FileSystem;
  private readonly locationManager: LocationManager;

  constructor() {
    this.commandParser = new CommandParser();
    this.locationManager = new LocationManager();
    this.fileSystem = new FileSystem(this.locationManager);
    this.discord = new DiscordManager(this.commandParser, this.fileSystem, this.locationManager);
    this.commandParser.registerDiscord(this.discord);
  }

}

new MinecraftLocationsBot();
