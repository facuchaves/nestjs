import { IsInt, IsString, Max, Min } from "class-validator"

export class EntityDto {
    
    @IsString()
    name: string

    @IsInt()
    @Min(0)
    @Max(100)
    score: number

}
