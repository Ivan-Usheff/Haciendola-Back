import { Module } from "@nestjs/common";
import { BaseRepository } from "./repository.base";

@Module({
    providers: [BaseRepository],
    exports: [BaseRepository]
})
export class BaseModule{}