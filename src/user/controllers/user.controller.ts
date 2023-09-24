import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { HttpResponse } from '../../shared/response/http.response';
import { DeleteResult, UpdateResult } from 'typeorm';

export class UserController {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getUser(req: Request, res: Response) {
    try {
      const data = await this.userService.findAll();
      if (data.length === 0) {
        return this.httpResponse.NotFound(res, 'No se encontraron resultados');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Error(res, error);
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.userService.findById(id);

      if (!data) {
        return this.httpResponse.NotFound(res, 'No se encontraron resultados');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Error(res, error);
    }
  }

  async getUserWithRelation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.userService.findWithRelation(id);

      if (!data) {
        return this.httpResponse.NotFound(res, 'No se encontraron resultados');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Error(res, error);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const { body } = req;
      const data = await this.userService.create(body);
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Error(res, error);
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { body } = req;
      const data: UpdateResult = await this.userService.update(id, body);

      if (!data.affected) return this.httpResponse.NotFound(res, 'Error al actualizar');

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Error(res, error);
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: DeleteResult = await this.userService.delete(id);

      if (!data.affected) return this.httpResponse.NotFound(res, 'Error al eliminar');

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Error(res, error);
    }
  }
}
