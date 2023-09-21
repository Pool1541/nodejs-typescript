import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  constructor(private readonly userService: UserService = new UserService()) {}

  async getUser(req: Request, res: Response) {
    try {
      const data = await this.userService.findAll();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.userService.findById(id);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const { body } = req;
      const data = await this.userService.create(body);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { body } = req;
      const data = await this.userService.update(id, body);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.userService.delete(id);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }
}
