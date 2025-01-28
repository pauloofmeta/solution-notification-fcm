import { ICustumer } from "../models";
import CustumerModel, { ICustumerPayload } from "../models/custumerModel";

const create = async (payload: ICustumerPayload): Promise<ICustumer> => {
  const custumer = new CustumerModel(payload);
  return await custumer.save();
};
const update = async (
  id: string,
  payload: ICustumerPayload
): Promise<ICustumer | null | undefined> => {
  const custumer = await CustumerModel.findByIdAndUpdate(id, payload);
  return custumer?.save();
};

const deleteById = (id: string): Promise<ICustumer | null> =>
  CustumerModel.findByIdAndDelete(id);

const getAll = (): Promise<ICustumer[]> => CustumerModel.find();

const getById = (id: string): Promise<ICustumer | null> =>
  CustumerModel.findById(id);

export default {
  create,
  update,
  deleteById,
  getAll,
  getById,
};
