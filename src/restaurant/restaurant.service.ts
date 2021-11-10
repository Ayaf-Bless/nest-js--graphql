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
import {
  UpdateRestaurantInput,
  UpdateRestaurantOutput,
} from "./dtos/update-restaurent.dto";
import { CategoryRepository } from "./repository/category.repository";
import {
  DeleteRestaurantInput,
  DeleteRestaurantOutput,
} from "./dtos/delete-restaurant.dto";
import { AllCategoryOutPut } from "./dtos/all-category.dto";

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurentRepo: Repository<Restaurant>,
    private readonly categoryRepo: CategoryRepository,
  ) {}

  async createRestaurent(
    owner: User,
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    try {
      const newRestaurent = this.restaurentRepo.create(createRestaurantInput);
      newRestaurent.owner = owner;
      newRestaurent.category = await this.categoryRepo.getOrCreate(
        createRestaurantInput.categoryName,
      );
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
  async updateRestaurant(
    owner: User,
    updateRestaurantInput: UpdateRestaurantInput,
  ): Promise<UpdateRestaurantOutput> {
    try {
      const restaurant = await this.restaurentRepo.findOne(
        updateRestaurantInput.id,
      );
      if (!restaurant) {
        return {
          ok: false,
          error: "Restaurant not found",
        };
      }
      if (owner.id !== restaurant.ownerId) {
        return {
          ok: false,
          error: "You can't edit a restaurant you don't own",
        };
      }
      let category: Category = null;
      if (updateRestaurantInput.categoryName) {
        category = await this.categoryRepo.getOrCreate(
          updateRestaurantInput.categoryName,
        );
      }
      await this.restaurentRepo.save([
        {
          id: updateRestaurantInput.id,
          ...updateRestaurantInput,
          ...(category && { category }),
        },
      ]);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: "Could not update the restaurant",
      };
    }
  }

  async deleteRestaurant(
    owner: User,
    deleteRestaurantInput: DeleteRestaurantInput,
  ): Promise<DeleteRestaurantOutput> {
    try {
      const restaurant = await this.restaurentRepo.findOne(
        deleteRestaurantInput.id,
      );
      if (!restaurant) {
        return {
          ok: false,
          error: "No restaurant found",
        };
      }
      if (owner.id !== restaurant.ownerId) {
        return {
          ok: false,
          error: "You can't edit a restaurant you don't own",
        };
      }
      await this.restaurentRepo.delete(deleteRestaurantInput.id);
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: "could bot delete",
      };
    }
  }

  async allCategory(): Promise<AllCategoryOutPut> {
    try {
      const categories = await this.categoryRepo.find();
      return {
        ok: true,
        categories,
      };
    } catch {
      return {
        ok: false,
        error: "could not get the category",
      };
    }
  }
}
