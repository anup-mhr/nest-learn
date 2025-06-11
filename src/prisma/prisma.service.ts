import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  // for cleaning db after e2e testing
  cleanDb() {
    return this.$transaction([
      // this.bookmark.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
