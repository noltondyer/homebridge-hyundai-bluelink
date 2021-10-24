import { VehicleAccessory } from '../platformAccessory';
import { Lock } from './lock';
import { Motor } from './motor';
import { Ignition } from './ignition';
import { Location } from './location';

export default function (va: VehicleAccessory): void {
  const services = [
    new Lock(va),
    new Motor(va),
    new Ignition(va),
    new Location(va),
  ];
  services.forEach(s => s.initService());
}
