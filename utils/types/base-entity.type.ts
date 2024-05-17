
type IdEntityType = {
    id?: string;
}

type BaseEntityType = IdEntityType & {
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export type { IdEntityType, BaseEntityType }