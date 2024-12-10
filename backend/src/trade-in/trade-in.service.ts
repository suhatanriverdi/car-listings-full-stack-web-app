import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { TradeIn } from '@prisma/client';

@Injectable()
export class TradeInService {
  constructor(private readonly prisma: PrismaService) {}

  async processTradeInForm(formData: {
    fullName: string;
    phone: string;
    email: string;
    make: string;
    model: string;
    status: string;
    year: number;
    mileage: number;
    transmission: string;
    fuelType: string;
    interiorFeatures?: string;
    safetyFeatures?: string;
    serviceHistory?: string;
    imageUrls: string[];
    userId: number;
    carId: number;
  }): Promise<TradeIn> {
    const tradeIn = await this.prisma.tradeIn.create({
      data: {
        ...formData,
      },
    });

    return tradeIn;
  }
}
