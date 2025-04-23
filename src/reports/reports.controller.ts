import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/users/user.entity';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { ReportDto } from './dtos/report.dto';
import { plainToInstance } from 'class-transformer';
import { ApprovedReportDto } from './dtos/approved-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@UseGuards(AuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  async createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    const report = await this.reportsService.create(body, user);

    const serialized = plainToInstance(ReportDto, report, {
      excludeExtraneousValues: true,
    });

    return {
      message: 'Report created successfully',
      data: {
        report: serialized,
      },
    };
  }

  @Get()
  async getestmate(@Query() query: GetEstimateDto) {
    const report = await this.reportsService.createEstimate(query);
    return report;
    // const serialized = plainToInstance(ReportDto, report, {
    //   excludeExtraneousValues: true,
    // });
    // return {
    //   message: 'Report created successfully',
    //   data: {
    //     report: serialized,
    //   },
    // };
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  async approveReport(
    @Param('id') id: string,
    @Body() body: ApprovedReportDto,
  ) {
    const report = await this.reportsService.changeApproval(id, body.approved);
    if (!report) {
      return {
        message: 'Report not found',
        data: null,
      };
    }
    const serialized = plainToInstance(ReportDto, report, {
      excludeExtraneousValues: true,
    });
    return {
      message: 'Report updated successfully',
      data: {
        report: serialized,
      },
    };
  }

  @Delete('/:id')
  deleteReport(@Param('id') id: number) {
    return this.reportsService.delete(id);
  }
}
