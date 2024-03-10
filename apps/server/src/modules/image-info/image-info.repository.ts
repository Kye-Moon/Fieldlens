import { Inject, Injectable } from '@nestjs/common';
import { ORM } from '../../drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/schema';
import { imageInfo, NewImageInfo } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ImageInfoRepository {
  constructor(@Inject(ORM) private db: NodePgDatabase<typeof schema>) {}

  async create(_imageInfo: NewImageInfo) {
    const result = await this.db
      .insert(imageInfo)
      .values(_imageInfo)
      .returning();
    return result[0];
  }

  async delete(id: string) {
    const result = await this.db
      .delete(imageInfo)
      .where(eq(imageInfo.imageId, id))
      .returning();
    return result[0];
  }

  async findTop() {
    return this.db.select().from(imageInfo).limit(100);
  }
}
