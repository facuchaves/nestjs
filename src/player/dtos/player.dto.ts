import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsString, Max, Min } from "class-validator"

export class PlayerDto {
    
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsInt()
    @Min(0)
    @Max(100)
    score: number

}
