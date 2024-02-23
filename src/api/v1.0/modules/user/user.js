import { logger } from '#helpers/logger.helper';

/**
 * @class UserService
 * @description Service layer for user-related operations
 */
class UserService {
  /**
	 *
	 * @param {{
	 *   email: string,
	 *   password: string,
	 *   name: string
	 * }} body
	 * @return {Promise<{message: string}>}
	 */
  async register(body) {
    try {
      const { email, password, name } = body;

      logger.log('debug', `name: ${name}, password: ${password}`, {
        email,
        name,
      });

      // Check if user already exists
      // TODO: Implement this
      // if user exists throw UserApiError

      // Hash password
      // TODO: Implement this
      // use 'generateHash' from src/utils/crypt.js

      // Create user
      // TODO: Implement this
      // if user creation fails throw UserApiError

      // Send verification email
      // TODO: Implement this
      // if email fails to send throw UserApiError

      return { message: 'User created successfully' };
    } catch (error) {
      throw error;
    }
  }
}

export const userService = new UserService();
