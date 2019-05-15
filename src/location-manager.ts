import { Location } from "./models/location";

export class LocationManager {

  private locations: Location[] = [];

  public addLocation(location: Location): void {
    this.locations.push(location);
  }

  public loadLocations(locationData: Location[]): void {
    this.locations = locationData;
  }

  public readLocations(): Location[] {
    return this.locations;
  }

  public static sortLocations(locations: Location[]): Location[] {
    return locations.slice().sort((locationA, locationB) => {
      if (locationA.name !== locationB.name) {
        return ('' + locationA.name).localeCompare(locationB.name);
      }
      if (locationA.x !== locationB.x) {
        return locationA.x - locationB.x;
      }
      if (locationA.z !== locationB.z) {
        return locationA.z - locationB.z;
      }
      if (locationA.y !== locationB.y) {
        return locationA.y - locationB.y;
      }
      return 0;
    })
  }

}

