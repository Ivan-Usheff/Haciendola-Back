import { DataSource } from "typeorm";
import { BaseEntity } from "../../../utils/entities/base.entity";
import { UsersEntity } from "@common/users/users.entity";
import { ProductsEntity } from "@common/products/products.entity";

export type DataSoursType = {
  [k: string]: typeof BaseEntity;
};

const DATA_SOURS_RECOR: DataSoursType = {
  'PRODUCTS_REPOSITORY': ProductsEntity,
  'USER_REPOSITORY': UsersEntity
}

export const DATA_SOURCE = Object.entries(DATA_SOURS_RECOR).map((dsr) => {
  const provide = dsr[0];
  const entity = dsr[1];
  return {
    provide,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
    inject: ['DATA_SOURCE'],
  }
})