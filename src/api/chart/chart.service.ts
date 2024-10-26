import { Injectable } from "@nestjs/common";
import { CreateChartDto } from "./dto/create-chart.dto";
import { UpdateChartDto } from "./dto/update-chart.dto";

@Injectable()
export class ChartService {
  findAll() {
    return `This action returns all chart`;
  }
}
