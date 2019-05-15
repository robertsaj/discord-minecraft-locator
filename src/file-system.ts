import * as fs from 'fs';
import { LocationManager } from "./location-manager";

export class FileSystem {

  private static DEFAULT_LOCATIONS_FILE = 'dist/src/data/locations.json';
  private readonly locationsFile: string;
  private locationManager: LocationManager;

  constructor(locationManager: LocationManager, locationsFile: string = FileSystem.DEFAULT_LOCATIONS_FILE) {
    this.locationManager = locationManager;
    this.locationsFile = locationsFile;
    this.fileLoad();
  }

  private fileLoad(): void {
    const fileContents = fs.readFileSync(this.locationsFile, 'utf8');
    if (fileContents.length <= 0) {
      this.locationManager.loadLocations([]);
    } else {
      this.locationManager.loadLocations(JSON.parse(fileContents));
    }
  }

  public fileSave(): void {
    const locations = this.locationManager.readLocations();
    fs.writeFileSync(this.locationsFile, JSON.stringify(locations, null, 2), null);
  }

}
