import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const { status } = createTaskDto;
      if (status && status !== 'pending') {
        throw new Error('Invalid status');
      }
      const task = new this.taskModel(createTaskDto);
      return await task.save();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: error.message,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async findAll() {
    try {
      return await this.taskModel.find();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      return await this.taskModel.findOne({ _id: id });
    } catch (error) {
      throw new HttpException(
        {
          error: 'Task not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const newDate = new Date();
      const task = await this.taskModel.findOneAndUpdate(
        { _id: id },
        { ...updateTaskDto, updatedAt: newDate },
        { new: true, runValidators: true },
      );
      return task;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Task not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: string) {
    try {
      return await this.taskModel.deleteOne({ _id: id });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Task not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
