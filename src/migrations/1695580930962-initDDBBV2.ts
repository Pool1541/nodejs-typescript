import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDDBBV21695580930962 implements MigrationInterface {
    name = 'InitDDBBV21695580930962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`role\` \`role\` enum ('USER', 'CUSTOMER', 'ADMIN') NOT NULL DEFAULT 'USER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`role\` \`role\` enum ('CUSTOMER', 'USER', 'ADMIN') NOT NULL`);
    }

}
