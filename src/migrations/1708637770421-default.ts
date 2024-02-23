import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1708637770421 implements MigrationInterface {
    name = 'Default1708637770421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "resposta" ("id" SERIAL NOT NULL, "answer" character varying NOT NULL, CONSTRAINT "PK_bf804c2c8d0434acf22e3e48f04" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "resposta"`);
    }

}
