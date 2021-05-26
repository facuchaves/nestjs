import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsString, Max, Min } from "class-validator"

export class PlayerDto {
    
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty({
        description: 'The score of a player',
        type: Number,
        minimum: 0,
        maximum : 100,
    })
    @IsInt()
    @Min(0)
    @Max(100)
    score: number

}
