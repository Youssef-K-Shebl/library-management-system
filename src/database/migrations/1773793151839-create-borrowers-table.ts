import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBorrowersTable1773793151839 implements MigrationInterface {
  name = 'CreateBorrowersTable1773793151839';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "borrowers" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(255) NOT NULL,
                "email" character varying(255) NOT NULL,
                "registered_date" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_9714fe82510c5c6d237eb7421f0" UNIQUE ("email"),
                CONSTRAINT "PK_81e4cddf7ab4dbd5e79a8f84031" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_9714fe82510c5c6d237eb7421f" ON "borrowers" ("email")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "public"."IDX_9714fe82510c5c6d237eb7421f"
        `);
    await queryRunner.query(`
            DROP TABLE "borrowers"
        `);
  }
}
