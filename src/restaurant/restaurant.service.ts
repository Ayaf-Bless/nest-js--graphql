import { Injectable } from "@nestjs/common";
import { Restaurant } from "./entities/restaurent.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from "./dtos/create-restaurant.dto";
import { User } from "../users/entities/user.entity";
import { Category } from "./entities/category.entity";

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurentRepo: Repository<Restaurant>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async createRestaurent(
    owner: User,
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    try {
      const newRestaurent = this.restaurentRepo.create(createRestaurantInput);
      newRestaurent.owner = owner;
      const categoryName = createRestaurantInput.categoryName
        .trim()
        .toLowerCase();
      const categorySlug = categoryName.replace(/ /g, "-");
      let category = await this.categoryRepo.findOne({ slug: categorySlug });
      if (!category) {
        category = await this.categoryRepo.save(
          this.categoryRepo.create({ slug: categorySlug, name: categoryName }),
        );
      }
      newRestaurent.category = category;
      await this.restaurentRepo.save(newRestaurent);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: "Could not create the restaurant may try later",
      };
    }
  }
}
