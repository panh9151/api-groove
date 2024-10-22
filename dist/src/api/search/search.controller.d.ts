import { SearchService } from "./search.service";
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    search(req: any, search_text: string): Promise<{
        data: {
            musicList: any[];
            albumList: any[];
            artistList: import("../../api-entity/Artist.entity").Artist[];
        };
    }>;
}
