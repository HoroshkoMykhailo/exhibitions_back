import { ExhibitsService } from "./exhibits.service";
import { Exhibit } from "./exhibit.entity";
export declare class ExhibitsController {
    private readonly exhibitsService;
    constructor(exhibitsService: ExhibitsService);
    getExhibits(page?: number, limit?: number): Promise<{
        exhibits: Exhibit[];
        total: number;
        page: number;
        lastPage: number;
    }>;
    createExhibit({ description }: {
        description: string;
    }, file: Express.Multer.File, req: any): Promise<Exhibit>;
    getExhibitById(id: number): Promise<Exhibit>;
    getMyExhibits(page: number, limit: number, req: any): Promise<{
        exhibits: Exhibit[];
        total: number;
        page: number;
        lastPage: number;
    }>;
    deleteExhibit(id: number, req: any): Promise<{
        message: string;
    }>;
}
