import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsString, Max, Min } from "class-validator"

export class EntityDto {
    
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty({
        description: 'Some numeric value of an generic entity',
        type: Number,
        minimum: 0,
        maximum : 100,
    })
    @IsInt()
    @Min(0)
    @Max(100)
    score: number

}
