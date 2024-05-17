import { BaseEntityType } from "@utils-types/base-entity.type";
import { DeepPartial, FindOptionsWhere, ObjectLiteral } from "typeorm";
import { BaseEntity } from "utils/entities/base.entity";

type EntityId<E extends BaseEntity> = Pick<E, 'id'>

export interface IRepository<
    E extends ObjectLiteral = BaseEntity, 
    F = Partial<E>
    > {
    
    getAll(): Promise<E[]>;
    
    findBy(option: F): Promise<E[]>;

    findOne(option: F): Promise<E>;

    createOne(entity: E): Promise<E>;

    update(id: F, option: F): Promise<E>;

    delete(id: F): Promise<E>;

}