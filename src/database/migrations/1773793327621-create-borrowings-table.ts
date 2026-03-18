import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBorrowingsTable1773793327621 implements MigrationInterface {
  name = 'CreateBorrowingsTable1773793327621';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "borrowings" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "book_id" uuid NOT NULL,
                "borrower_id" uuid NOT NULL,
                "checkout_date" TIMESTAMP NOT NULL DEFAULT now(),
                "due_date" TIMESTAMP NOT NULL,
                "return_date" TIMESTAMP,
                CONSTRAINT "PK_5da0d5a9a91e8c386e1f6812db2" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_b65e33ab3f4fd885a212491011" ON "borrowings" ("book_id")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_36ca96db0a6b9ef6cd920044b6" ON "borrowings" ("borrower_id")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_4cc20f654f5f032e386d62ae2d" ON "borrowings" ("due_date")
        `);
    await queryRunner.query(`
            ALTER TABLE "borrowings"
            ADD CONSTRAINT "FK_b65e33ab3f4fd885a212491011d" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "borrowings"
            ADD CONSTRAINT "FK_36ca96db0a6b9ef6cd920044b67" FOREIGN KEY ("borrower_id") REFERENCES "borrowers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "borrowings" DROP CONSTRAINT "FK_36ca96db0a6b9ef6cd920044b67"
        `);
    await queryRunner.query(`
            ALTER TABLE "borrowings" DROP CONSTRAINT "FK_b65e33ab3f4fd885a212491011d"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_4cc20f654f5f032e386d62ae2d"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_36ca96db0a6b9ef6cd920044b6"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_b65e33ab3f4fd885a212491011"
        `);
    await queryRunner.query(`
            DROP TABLE "borrowings"
        `);
  }
}
