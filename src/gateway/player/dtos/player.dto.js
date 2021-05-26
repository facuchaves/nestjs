"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlayerDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var PlayerDto = /** @class */ (function () {
    function PlayerDto() {
    }
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], PlayerDto.prototype, "name");
    __decorate([
        swagger_1.ApiProperty({
            description: 'The score of a player',
            type: Number,
            minimum: 0,
            maximum: 100
        }),
        class_validator_1.IsInt(),
        class_validator_1.Min(0),
        class_validator_1.Max(100)
    ], PlayerDto.prototype, "score");
    return PlayerDto;
}());
exports.PlayerDto = PlayerDto;
