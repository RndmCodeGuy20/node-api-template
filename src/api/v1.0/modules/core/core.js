import { CoreApiError } from './error';
import { pkgConfig } from '#configs/index';
import { pgsqlQuery } from '#helpers/index';

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
      const getDataQuery = `SELECT name
														FROM data_users`;
      const data = await pgsqlQuery(getDataQuery);

      const response = {
        name: pkgConfig.APP_NAME,
        version: pkgConfig.APP_VERSION,
        timestamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} IST`,
        data: data.rows,
      };

      return response;
    } catch (e) {
      throw e;
    }
  }
}

export const coreService = new CoreServices();
