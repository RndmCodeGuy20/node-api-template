import { coreService } from './core';
import { catchAsync } from '#utils/index';

export const controller = {
  getData: catchAsync(async (req, res) => {
    const response = await coreService.getData(req.query || 'something');
    res.jsend.success(response, 'Data fetched successfully');
  }),
};
