"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.PlayerController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var player_dto_1 = require("./dtos/player.dto");
var PlayerController = /** @class */ (function () {
    function PlayerController(playerService) {
        this.playerService = playerService;
    }
    PlayerController.prototype.getAllPlayers = function () {
        //const value = this.cacheManager.get('players');
        return this.playerService.getAllPlayers();
    };
    PlayerController.prototype.getPlayerById = function (playerId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.playerService.getPlayersById(playerId)];
            });
        });
    };
    PlayerController.prototype.createPlayer = function (playerDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.playerService.createNewPlayer(playerDto)];
            });
        });
    };
    PlayerController.prototype.editPlayer = function (playerId, playerDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.playerService.editPlayerById(playerId, playerDto)];
            });
        });
    };
    PlayerController.prototype.deletePlayer = function (playerId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.playerService.deletePlayerById(playerId)];
            });
        });
    };
    __decorate([
        common_1.Get(),
        swagger_1.ApiOkResponse({
            description: 'La lista fue consultada con exito.',
            type: player_dto_1.PlayerDto,
            isArray: true
        }),
        swagger_1.ApiOperation({
            summary: 'Devuelve una lista de jugadores',
            description: 'Devuelve una lista de todos los jugadores. Si no hay jugadores devuelve una lista vacia'
        }),
        common_1.CacheKey('custom_key'),
        common_1.CacheTTL(20)
    ], PlayerController.prototype, "getAllPlayers");
    __decorate([
        common_1.Get(':playerId'),
        swagger_1.ApiOkResponse({
            description: 'Devuelve un jugador filtrado por id.',
            type: player_dto_1.PlayerDto
        }),
        swagger_1.ApiNotFoundResponse({
            description: 'Si no existe el usuario que se busco, lanzo un not found.'
        }),
        swagger_1.ApiOperation({
            summary: 'Devuelve el jugador',
            description: 'Devuelve el jugador'
        }),
        __param(0, common_1.Param('playerId', common_1.ParseIntPipe))
    ], PlayerController.prototype, "getPlayerById");
    __decorate([
        common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
        common_1.Post(),
        swagger_1.ApiCreatedResponse(),
        swagger_1.ApiBadRequestResponse({
            description: 'Si un parametro no cumple con la especificacion.'
        }),
        swagger_1.ApiOperation({
            summary: 'Creacion de jugador',
            description: 'Crea un jugador.'
        }),
        __param(0, common_1.Body())
    ], PlayerController.prototype, "createPlayer");
    __decorate([
        common_1.Put(':playerId'),
        swagger_1.ApiOkResponse(),
        swagger_1.ApiBadRequestResponse({
            description: 'Si el user con ese id no existe.'
        }),
        swagger_1.ApiOperation({
            summary: 'Eliminacion de jugador',
            description: 'Elimina un jugador.'
        }),
        __param(0, common_1.Param('playerId')),
        __param(1, common_1.Body())
    ], PlayerController.prototype, "editPlayer");
    __decorate([
        common_1.Delete(':playerId'),
        swagger_1.ApiOkResponse(),
        swagger_1.ApiBadRequestResponse({
            description: 'Si e; user con ese id no existe.'
        }),
        swagger_1.ApiOperation({
            summary: 'Eliminacion de jugador',
            description: 'Elimina un jugador.'
        }),
        __param(0, common_1.Param('playerId'))
    ], PlayerController.prototype, "deletePlayer");
    PlayerController = __decorate([
        swagger_1.ApiTags('players'),
        common_1.Controller('api/players'),
        common_1.UseInterceptors(common_1.CacheInterceptor)
    ], PlayerController);
    return PlayerController;
}());
exports.PlayerController = PlayerController;
