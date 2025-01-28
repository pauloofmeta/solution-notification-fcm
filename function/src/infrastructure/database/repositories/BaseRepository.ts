import { IFilter } from '@domain/models';
import { IRepository } from '@domain/repositories';
import { Document, FilterQuery, Model } from 'mongoose';

export class BaseRepository<T extends Document> implements IRepository<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    const newItem = new this.model(data);
    return await newItem.save();
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }

  async findOne(filter: IFilter<T>): Promise<T | null> {
    const modelFilter = filter as FilterQuery<T>;
    return await this.model.findOne(modelFilter).exec();
  }

  async findAll(filter: IFilter<T> = {}): Promise<T[]> {
    const modelFilter = filter as FilterQuery<T>;
    return await this.model.find(modelFilter).exec();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
