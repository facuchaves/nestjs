"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var player_entity_1 = require("./player/entities/player.entity");
var player_module_1 = require("./player/player.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'mysql',
                    host: 'localhost',
                    port: 3306,
                    username: 'root',
                    password: 'root',
                    database: 'test',
                    entities: [player_entity_1.Player],
                    synchronize: true
                }),
                player_module_1.PlayerModule,
                common_1.CacheModule.register()
            ],
            providers: []
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
