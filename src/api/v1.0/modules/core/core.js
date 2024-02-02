import { CoreApiError } from './error';
import { pkgConfig } from '#configs/package.config';

/**
 * CoreServices
 * @class
 * @description Core services
 * @version 1.0
 */
class CoreServices {
  /**
	 * getData
	 * @param { string } query
	 * @return {Promise<{name: *, version: *, timestamp: string}>}
	 */
  async getData(query) {
    try {
      if (!query) {
        throw new CoreApiError('Invalid query', 'Invalid query', 400);
      }

      const response = {
        name: pkgConfig.APP_NAME,
        version: pkgConfig.APP_VERSION,
        timestamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} IST`,
      };

      return response;
    } catch (e) {
      throw e;
    }
  }
}

export const coreService = new CoreServices();
