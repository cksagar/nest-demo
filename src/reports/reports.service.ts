import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(body: CreateReportDto, user: User) {
    console.log('Creating report:', body);
    console.log('Current user:', user);

    const report = this.repo.create(body);
    report.user = user;
    return this.repo.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne({ where: { id: parseInt(id) } });
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    report.approved = approved;
    return this.repo.save(report);
  }

  async createEstimate(estimateDto: GetEstimateDto) {
    const { make, model, lng, lat, year, mileage } = estimateDto;
    const report = await this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .andWhere('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lng - lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'ASC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();

    return report;
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
