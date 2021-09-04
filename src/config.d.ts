import { REGION } from "bluelinky/dist/constants";
import { Brand } from "bluelinky/dist/interfaces/common.interfaces";
import { PlatformConfig } from "homebridge";

interface AuthConfig {
  username: string;
  password: string;
  pin: string;
  region: REGION;
  brand: Brand;
}
interface VehicleConfig {
  vin: string;
  maxRange?: number;
}
interface StartConfig {
  airCtrl?: boolean;
  heating1?: boolean;
  defrost?: boolean;
  airTempvalue?: number;
  igniOnDuration: number;
}
export interface HyundaiConfig extends PlatformConfig {
  credentials: AuthConfig;
  vehicles: VehicleConfig[];
  remoteStart: StartConfig;
}
