import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBooksTable1773792980469 implements MigrationInterface {
  name = 'CreateBooksTable1773792980469';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "books" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying(255) NOT NULL,
                "author" character varying(255) NOT NULL,
                "isbn" character varying(13) NOT NULL,
                "available_quantity" integer NOT NULL DEFAULT '0',
                "shelf_location" character varying(100) NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_54337dc30d9bb2c3fadebc69094" UNIQUE ("isbn"),
                CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS pg_trgm`);

    await queryRunner.query(
      `CREATE INDEX idx_books_title_trgm ON books USING gin (title gin_trgm_ops)`,
    );
    await queryRunner.query(
      `CREATE INDEX idx_books_author_trgm ON books USING gin (author gin_trgm_ops)`,
    );
    await queryRunner.query(
      `CREATE INDEX idx_books_isbn_trgm ON books USING gin (isbn gin_trgm_ops)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS idx_books_isbn_trgm`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_books_author_trgm`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_books_title_trgm`);
    await queryRunner.query(`DROP EXTENSION IF EXISTS pg_trgm`);
    await queryRunner.query(`
            DROP TABLE "books"
        `);
  }
}
