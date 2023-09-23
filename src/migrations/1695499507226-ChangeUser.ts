import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUser1695499507226 implements MigrationInterface {
    name = 'ChangeUser1695499507226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` enum ('USER', 'CUSTOMER', 'ADMIN') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    }

}
