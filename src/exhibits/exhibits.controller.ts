import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  UploadedFile,
  Request,
  UseGuards,
  UseInterceptors,
  Param,
  Delete,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from "@nestjs/swagger";
import { ExhibitsService } from "./exhibits.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { imageFileFilter } from "./filters/image-file.filter";
import { plainToInstance } from "class-transformer";
import { Exhibit } from "./exhibit.entity";

@Controller("exhibits")
export class ExhibitsController {
  constructor(private readonly exhibitsService: ExhibitsService) {}

  @Get()
  @ApiOperation({ summary: "Get exhibits" })
  @ApiQuery({ name: "page", required: false, description: "Page number" })
  @ApiQuery({ name: "limit", required: false, description: "Items per page" })
  @ApiResponse({ status: 200, description: "Successful response" })
  async getExhibits(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10
  ) {
    const [exhibits, total] = await this.exhibitsService.getExhibitsWithPagination(
      page,
      limit,
    );

    return {
      exhibits: plainToInstance(Exhibit, exhibits, {
        excludeExtraneousValues: true,
      }),
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  @Post()
  @UseInterceptors(
    FileInterceptor("image", {
      fileFilter: imageFileFilter,
    })
  )
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "New exhibit creation" })
  @ApiResponse({ status: 201, description: "Exhibit successfully created" })
  @ApiResponse({ status: 400, description: "Only images are allowed" })
  @ApiResponse({ status: 400, description: "Image is required" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",

      properties: {
        image: { type: "string", format: "binary" },

        description: { type: "string", default: "" },
      },
    },
  })
  async createExhibit(
    @Body() { description }: { description: string },
    @UploadedFile() file: Express.Multer.File,
    @Request() req
  ) {
    const exhibit = await this.exhibitsService.createExhibit(
      file,
      description,
      req.user
    );

    return plainToInstance(Exhibit, exhibit, { excludeExtraneousValues: true });
  }

  @Get("post/:id")
  @ApiOperation({ summary: "Exhibit details" })
  @ApiResponse({ status: 200, description: "Successful response" })
  @ApiResponse({ status: 404, description: "Exhibit not found" })
  async getExhibitById(@Param("id") id: number) {
    const exhibit = await this.exhibitsService.getExhibitById(id);

    return plainToInstance(Exhibit, exhibit, { excludeExtraneousValues: true });
  }

  @Get("my-posts")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "My exhibits" })
  @ApiQuery({ name: "page", required: false, description: "Page number" })
  @ApiQuery({ name: "limit", required: false, description: "Items per page" })
  @ApiResponse({ status: 200, description: "Successful response" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async getMyExhibits(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
    @Request() req
  ) {
    const [exhibits, total] = await this.exhibitsService.getExhibitsWithPagination(page, limit, { userId: req.user.id });

    return {
      exhibits: plainToInstance(Exhibit, exhibits, {
        excludeExtraneousValues: true,
      }),
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Exhibit deletion" })
  @ApiResponse({ status: 200, description: "Exhibit successfully deleted" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Exhibit not found" })
  async deleteExhibit(@Param("id") id: number, @Request() req) {
    await this.exhibitsService.deleteExhibitById(id, req.user.id);
    return { message: "Exhibit successfully deleted" };
  }
}
