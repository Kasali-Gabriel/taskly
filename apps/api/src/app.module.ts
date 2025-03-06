import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TeamModule } from './team/team.module';
import { TaskModule } from './task/task.module';
import { ProjectModule } from './project/project.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      sortSchema: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    TeamModule,
    TaskModule,
    ProjectModule,
  ],
  providers: [
    PrismaService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
