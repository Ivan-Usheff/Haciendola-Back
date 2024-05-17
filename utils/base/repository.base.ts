import { BaseEntityType } from "@utils-types/base-entity.type";
import { IRepository } from "./interfaces/repository.interface";
import { IsNull, ObjectLiteral, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { HandlerRepository } from "@utils-decorators/index";


@Injectable()
export class BaseRepository 
    <E extends ObjectLiteral> 
    implements IRepository<E> {
    
    protected readonly repository: Repository<E>
    constructor(){}

    @HandlerRepository()
    public async getAll(): Promise<E[]> {
        return await this.repository.find();
    }

    @HandlerRepository()
    public async findBy(option: Partial<E>): Promise<E[]> {
        return await this.repository.find({where:{...option, deletedAt: IsNull()}})
    }

    @HandlerRepository()
    public async findOne(option: Partial<E>): Promise<E> {
        return await this.repository.findOne({where:{...option, deletedAt: IsNull()}});
    }

    @HandlerRepository()
    public async createOne(entity: E): Promise<E> {
        return this.repository.save(entity);
    }

    @HandlerRepository()
    public async update(param: Partial<E>, option: Partial<E>): Promise<E> {
        const entity = await this.repository.findOne({where:param})
        const updated = await this.repository.save({...entity, ...option})
        return updated;
    }
    
    @HandlerRepository()
    public async delete(param: Partial<E>): Promise<E> {
        const entity =  await this.repository.findOne({where:param});
        const deleted = await this.repository.softDelete(entity.id);
        return deleted as unknown as E;
    }

}