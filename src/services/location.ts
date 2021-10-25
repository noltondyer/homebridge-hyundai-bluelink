import { HyundaiService } from './base';
import { VehicleLocation } from 'bluelinky/dist/interfaces/common.interfaces';

export class Location extends HyundaiService {
  private RADIUS = 6371;
  private latitude?: number;
  private longitude?: number;
  private homeLatitude?: number;
  private homeLongitude?: number;
  private homeRadius?: number;
  private isHome = false;
  name = 'Home';
  serviceType = 'OccupancySensor';

  initService(): void {
    this.latitude = this.accessory.context.device.latitude;
    this.longitude = this.accessory.context.device.longitude;
    this.homeLatitude = this.accessory.context.device.homeLocation?.latitude;
    this.homeLongitude = this.accessory.context.device.homeLocation?.longitude;
    this.homeRadius = this.accessory.context.device.homeLocation?.radius;

    const { OccupancyDetected } = this.Characteristic;
    this.service
      ?.getCharacteristic(OccupancyDetected)
      .on('get', cb => cb(null, this.occupancyDetected));
  }

  setCurrentLocation(location: VehicleLocation): void {
    if (
      location.latitude === this.latitude &&
      location.longitude === this.latitude
    ) {
      return;
    }

    this.latitude = this.accessory.context.device.latitude = location.latitude;
    this.longitude = this.accessory.context.device.longitude =
      location.longitude;

    if (this.homeRadius === undefined) {
      return;
    }

    this.isHome = this.kilometersFromHome < this.homeRadius;
    this.service?.updateCharacteristic(
      this.Characteristic.OccupancyDetected,
      this.occupancyDetected,
    );
  }

  get occupancyDetected(): number {
    return this.isHome
      ? this.Characteristic.OccupancyDetected.OCCUPANCY_DETECTED
      : this.Characteristic.OccupancyDetected.OCCUPANCY_NOT_DETECTED;
  }

  get kilometersFromHome(): number {
    if (
      this.homeRadius === undefined ||
      this.homeLongitude === undefined ||
      this.homeLatitude === undefined ||
      this.latitude === undefined ||
      this.longitude == undefined
    ) {
      return Infinity;
    }
    const dLatitude = Location.toRadians(this.latitude - this.homeLatitude);
    const dLongitude = Location.toRadians(this.longitude - this.homeLongitude);
    const fromLatitudeRadians = Location.toRadians(this.latitude);
    const toLatitudeRadians = Location.toRadians(this.homeLatitude);

    const a =
      Math.pow(Math.sin(dLatitude / 2), 2) +
      Math.pow(Math.sin(dLongitude / 2), 2) *
        Math.cos(fromLatitudeRadians) *
        Math.cos(toLatitudeRadians);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return this.RADIUS * c;
  }

  private static toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }
}
