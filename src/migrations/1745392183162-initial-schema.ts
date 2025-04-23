import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1745392183162 implements MigrationInterface {
  name = 'InitialSchema1745392183162';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "menu_item" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "category" character varying NOT NULL, "restaurantId" integer, CONSTRAINT "PK_722c4de0accbbfafc77947a8556" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "restaurant" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cuisine" text array NOT NULL, "promoted" boolean NOT NULL, "rating" double precision NOT NULL, "deliveryTime" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_649e250d8b8165cb406d99aa30f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "category" character varying(255), "description" text, "imageId" character varying(255), "inStock" boolean NOT NULL DEFAULT true, "isVeg" boolean NOT NULL DEFAULT false, "price" integer, "addons" json, "itemAttribute" json, "ratings" json, "isBestseller" boolean NOT NULL DEFAULT false, "offerTags" json, "isBolt" boolean NOT NULL DEFAULT false, "boltImageId" character varying(255), "ribbon" json, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "report" ("id" SERIAL NOT NULL, "approved" boolean NOT NULL DEFAULT false, "make" character varying NOT NULL, "model" character varying NOT NULL, "year" integer NOT NULL, "mileage" integer NOT NULL, "price" numeric NOT NULL, "lng" numeric(10,6) NOT NULL, "lat" numeric(10,6) NOT NULL, "userId" integer, CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "admin" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_item" ADD CONSTRAINT "FK_3cefe83c00b071077959f67e8e8" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "report" ADD CONSTRAINT "FK_e347c56b008c2057c9887e230aa" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "report" DROP CONSTRAINT "FK_e347c56b008c2057c9887e230aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_item" DROP CONSTRAINT "FK_3cefe83c00b071077959f67e8e8"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "report"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "restaurant"`);
    await queryRunner.query(`DROP TABLE "menu_item"`);
  }
}
