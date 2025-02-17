import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from '../entities/transaction.entity';

@Controller('api/transactions')  // <-- исправил путь на "api/transactions"
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getAll() {
    return this.transactionsService.findAll();
  }

  @Post()
  async create(@Body() data: Partial<Transaction>) {
    return this.transactionsService.create(data);
  }
}
