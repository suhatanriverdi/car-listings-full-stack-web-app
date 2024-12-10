import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TradeInService } from './trade-in.service';
import { z } from 'zod';

// Define the Zod Schema
const tradeInSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\d+$/, 'Phone number must contain only digits'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z
    .string()
    .min(1, 'Year is required')
    .refine(
      (val) => {
        const year = parseInt(val);
        return year >= 1900 && year <= new Date().getFullYear();
      },
      {
        message: 'Year must be between 1900 and the current year',
      },
    )
    .transform((val) => parseInt(val)), // Transform to number
  mileage: z
    .string()
    .min(1, 'Mileage is required')
    .regex(/^\d+$/, 'Mileage must be a number')
    .transform((val) => parseInt(val)), // Transform to number
  imageUrls: z
    .array(z.string().url('Invalid URL format'))
    .min(1, 'At least one image is required')
    .max(5, 'You can upload a maximum of 5 images'),
  transmission: z.string().min(1, 'Transmission type is required'),
  fuelType: z.string().min(1, 'Fuel type is required'),
  interiorFeatures: z.string().optional(),
  safetyFeatures: z.string().optional(),
  serviceHistory: z.string().optional(),
  userId: z
    .number()
    .int('User ID must be a number')
    .min(1, 'User ID is required'),
  carId: z.number().int('Car ID must be a number').min(1, 'Car ID is required'),
  status: z.string().min(1, 'Status is required'),
});

@Controller('trade-in')
export class TradeInController {
  constructor(private readonly tradeInService: TradeInService) {}

  @Post()
  async submitTradeIn(@Body() body: Record<string, unknown>) {
    // Validate with Zod and ensure the data is fully valid and typed correctly
    const parsed = tradeInSchema.safeParse(body);

    if (!parsed.success) {
      // If Zod validation fails, return error messages
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Validation failed',
          errors: parsed.error.errors.map((e) => ({
            field: e.path[0], // This will show the field name that failed validation
            message: e.message,
          })),
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Use parsed.data and ensure type safety
    const validData = parsed.data as {
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
    };

    // If validation is successful, process the form data
    return this.tradeInService.processTradeInForm(validData);
  }
}
