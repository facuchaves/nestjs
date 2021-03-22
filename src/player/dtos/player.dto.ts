import { ApiProperty } from "@nestjs/swagger"

export class PlayerDto {
    
    @ApiProperty()
    name: string

    @ApiProperty()
    score: number

}
