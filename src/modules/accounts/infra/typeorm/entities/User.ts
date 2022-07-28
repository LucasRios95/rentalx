import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("Users")
class User {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    driver_license: string;

    @Column({ default: false })
    isAdmin: boolean;

    @CreateDateColumn()
    created_at: Date;

    @Column({ nullable: true })
    avatar: string;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }

        this.isAdmin = false;
    }
}

export { User };
