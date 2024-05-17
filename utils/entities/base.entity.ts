import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


abstract class IncrememntId {

    @PrimaryGeneratedColumn("uuid")
    id?: string

} 

abstract class BaseEntity extends IncrememntId {
    
    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt?: Date;
    
    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    updatedAt?: Date;
    
    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        default: null
    })
    deletedAt?: Date;
}


export { BaseEntity, IncrememntId }
