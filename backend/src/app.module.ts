import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'expenses',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TransactionsModule, 
  ],
})
export class AppModule {}
