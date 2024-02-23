import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1708636829713 implements MigrationInterface {
    name = 'Default1708636829713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pilares" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_4181714ff4c8a1ce66e06ecfa8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "token_user" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "token" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_e50ca89d635960fda2ffeb17639" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "autenticacao" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_d9873aafdac0db56acd0333fea2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "autenticacao"`);
        await queryRunner.query(`DROP TABLE "token_user"`);
        await queryRunner.query(`DROP TABLE "pilares"`);
    }

}
