import got from 'got';
import logger from 'bluelinky/dist/logger';

import { REGIONS } from 'bluelinky/dist/constants';

import {
  VehicleRegisterOptions,
  VehicleStartOptions,
} from 'bluelinky/dist/interfaces/common.interfaces';
import { RequestHeaders } from 'bluelinky/dist/interfaces/american.interfaces';
import { AmericanController } from 'bluelinky/dist/controllers/american.controller';
import AmericanVehicle from 'bluelinky/dist/vehicles/american.vehicle';

export default class GenesisVehicle
  extends AmericanVehicle {
  public region = REGIONS.US;

  constructor(public vehicleConfig: VehicleRegisterOptions,
              public controller: AmericanController,
  ) {
    super(vehicleConfig,
          controller,
    );
    logger.debug(`US Vehicle ${this.vehicleConfig.regId} created`);
  }

  protected getHeaders(): RequestHeaders {
    return {
      'access_token': this.controller.session.accessToken,
      'client_id': this.controller.environment.clientId,
      'Host': this.controller.environment.host,
      'User-Agent': 'okhttp/3.12.0',
      'registrationId': this.vehicleConfig.regId,
      'gen': this.vehicleConfig.generation,
      'username': this.userConfig.username,
      'vin': this.vehicleConfig.vin,
      'APPCLOUD-VIN': this.vehicleConfig.vin,
      'Language': '0',
      'to': 'ISS',
      'encryptFlag': 'false',
      'from': 'SPA',
      'brandIndicator': this.vehicleConfig.brandIndicator,
      'bluelinkservicepin': this.userConfig.pin,
      'offset': '-5',
    };
  }

  public async start(startConfig: VehicleStartOptions): Promise<string> {
    const mergedConfig = {
      ...{
        airCtrl: false,
        igniOnDuration: 10,
        airTempvalue: 70,
        seatHeaterVentInfo: {
           drvSeatHeatState: 5,
        },
        defrost: false,
        heating1: false,
        consent: 'yes',
      },
      ...startConfig,
    };

    const body = {
      'Ims': 0,
      'airCtrl': +mergedConfig.airCtrl, // use the unary method to convert to int
      'airTemp': {
        'unit': 1,
        'value': `${mergedConfig.airTempvalue}`,
      },
      'defrost': mergedConfig.defrost,
      'heating1': +mergedConfig.heating1, // use the unary method to convert to int
      'consent': mergedConfig.consent,
      'igniOnDuration': mergedConfig.igniOnDuration,
      'seatHeaterVentInfo': mergedConfig.seatHeaterVentInfo,
      'username': this.userConfig.username,
      'vin': this.vehicleConfig.vin,
    };

    const response = await this.make_request('/ac/v2/rcs/rsc/start',
                                             {
                                               method: 'POST',
                                               headers: {
                                                 ...this.getHeaders(),
                                                 'offset': '-4',
                                               },
                                               body: body,
                                               json: true,
                                             },
    );

    if (response.statusCode === 200) {
      return 'Vehicle started!';
    }

    return 'Failed to start vehicle';
  }

  // TODO: not sure how to type a dynamic response
  /* eslint-disable @typescript-eslint/no-explicit-any */
  protected async make_request(service: string,
                               options,
  ): Promise<got.Response<any>> {
    // add logic for token refresh if to ensure we don't use a stale token
    await this.controller.refreshAccessToken();

    // if we refreshed token make sure to apply it to the request
    options.headers.access_token = this.controller.session.accessToken;

    const response = await got(`${this.controller.environment.baseUrl}/${service}`,
                               { throwHttpErrors: false, ...options },
    );

    if (response?.body) {
      logger.debug(response.body);
    }

    return response;
  }

  // public async unlock(): Promise<string> {
  //   const formData = new URLSearchParams();
  //   formData.append('userName', this.userConfig.username || '');
  //   formData.append('vin', this.vehicleConfig.vin);
  //
  //   const response = await this._request('/ac/v2/rcs/rdo/on', {
  //     method: 'POST',
  //     headers: { ...this.getDefaultHeaders() },
  //     body: formData.toString(),
  //   });
  //
  //   if (response.statusCode === 200) {
  //     return 'Unlock successful';
  //   }
  //
  //   return 'Something went wrong!';
  // }
  //
  // public async lock(): Promise<string> {
  //   const formData = new URLSearchParams();
  //   formData.append('userName', this.userConfig.username || '');
  //   formData.append('vin', this.vehicleConfig.vin);
  //
  //   const response = await this._request('/ac/v2/rcs/rdo/off', {
  //     method: 'POST',
  //     headers: { ...this.getDefaultHeaders() },
  //     body: formData.toString(),
  //   });
  //
  //   if (response.statusCode === 200) {
  //     return 'Lock successful';
  //   }
  //
  //   return 'Something went wrong!';
  // }
}
