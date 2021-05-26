"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlayerModule = void 0;
var common_1 = require("@nestjs/common");
var player_controller_1 = require("./player.controller");
var player_service_1 = require("./player.service");
var typeorm_1 = require("@nestjs/typeorm");
var player_entity_1 = require("./entities/player.entity");
var typeorm_2 = require("typeorm");
//import * as redisStore from 'cache-manager-redis-store';
var PlayerModule = /** @class */ (function () {
    function PlayerModule() {
    }
    PlayerModule = __decorate([
        common_1.Module({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([player_entity_1.Player]),
                typeorm_2.Repository,
                common_1.CacheModule.register()
                /*   CacheModule.register({
                    store: redisStore,
                    host: 'localhost',
                    port: 6379,
                  }) */
            ],
            controllers: [player_controller_1.PlayerController],
            providers: [
                player_service_1.PlayerService,
            ]
        })
    ], PlayerModule);
    return PlayerModule;
}());
exports.PlayerModule = PlayerModule;
