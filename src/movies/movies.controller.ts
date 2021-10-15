import { Controller, Get, Param, Post, Body, Query } from "@nestjs/common";

@Controller("movies")
export class MoviesController {
  @Get()
  getAll() {
    return "This will return all movies";
  }
  @Get("search")
  search(@Query("title") title: string) {
    return `We are looking for ${title}`;
  }
  @Get(":id")
  getOne(@Param("id") id: string) {
    return "return one movies " + id;
  }

  @Post()
  createOne(@Body() data) {
    console.log(data);
    return "I create stuff";
  }
}
