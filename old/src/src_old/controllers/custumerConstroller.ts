import { Request, Response } from "express";
import { custumerService } from "../services";

const getAll = async (_req: Request, res: Response) => {
  try {
    const custumers = await custumerService.getAll();
    res.json(custumers);
  } catch (error) {
    res.status(500).json({
      title: `An error occurrs on get custumers!`,
      message: error instanceof Error ? error.message : error,
    });
  }
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const custumer = await custumerService.getById(id);
    if (!custumer) {
      res.status(404).json({ message: "Custumer not found!" });
      return;
    }
    res.json(custumer);
  } catch (error) {
    res.status(500).json({
      title: `An error occurrs on get custumer!`,
      message: error instanceof Error ? error.message : error,
    });
  }
};

const create = async (req: Request, res: Response) => {
  const payload = req.body;
  try {
    const custumer = await custumerService.create(payload);
    res.status(201).json(custumer);
  } catch (error) {
    res.status(400).json({
      title: `An error occurrs on create custumer!`,
      message: error instanceof Error ? error.message : error,
    });
  }
};

const update = async (req: Request, res: Response) => {
  const payload = req.body;
  const { id } = req.params;
  try {
    const custumer = await custumerService.update(id, payload);
    if (!custumer) {
      res.status(400).json({ message: "Can't be update Custumer!" });
      return;
    }

    res.json(custumer);
  } catch (error) {
    res.status(400).json({
      title: `An error occurrs on update custumer!`,
      message: error instanceof Error ? error.message : error,
    });
  }
};

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await custumerService.deleteById(id);
    res.send(200);
  } catch (error) {
    res.status(400).json({
      title: `An error occurrs on delete custumer!`,
      message: error instanceof Error ? error.message : error,
    });
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
