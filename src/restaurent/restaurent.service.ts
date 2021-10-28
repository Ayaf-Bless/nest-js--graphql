import { Injectable } from "@nestjs/common";
import { Restaurent } from "./entities/restaurent.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dtos/update-restaurent.dto";

@Injectable()
export class RestaurentService {
  constructor(
    @InjectRepository(Restaurent)
    private readonly restaurentRepo: Repository<Restaurent>,
  ) {}
  async getAllRestaurent(): Promise<Restaurent[]> {
    return this.restaurentRepo.find();
  }

  async createRestaurent(createRestaurantInputDto: CreateRestaurantDto) {
    const newRestaurent = this.restaurentRepo.create(createRestaurantInputDto);
    return this.restaurentRepo.save(newRestaurent);
  }
  async updateRestaurent({ id, data }: UpdateRestaurantDto) {
    return this.restaurentRepo.update(id, {
      ...data,
    });
  }
}
