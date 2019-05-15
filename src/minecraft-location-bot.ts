import { FileSystem } from "./file-system";
import { LocationManager } from "./location-manager";
import { DiscordManager } from "./discord-manager";

class MinecraftLocationsBot {

  private readonly discord: any;
  private readonly fileSystem: FileSystem;
  private readonly locationManager: LocationManager;

  constructor() {
    this.locationManager = new LocationManager();
    this.fileSystem = new FileSystem(this.locationManager);
    this.discord = new DiscordManager(this.fileSystem, this.locationManager);
  }

}

new MinecraftLocationsBot();
