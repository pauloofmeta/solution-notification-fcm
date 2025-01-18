import { IExportRequestPayload, Result } from "../models";
import ExportRequestModel from "../models/exportRequestModel";

const create = async (
  request: IExportRequestPayload
): Promise<Result<string>> => {
  try {
    const model = new ExportRequestModel(request);
    const exportModel = await model.save();

    //add to queue
    //nofify

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: `Occurss an error on save export request!${
        error instanceof Error ? error.message : ""
      }`,
    };
  }
};

export default {
  create,
};
