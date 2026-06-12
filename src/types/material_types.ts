export interface MaterialGroupItem {
    processNo: string[];
    matIds: string[];
    matNo: string;
    matName: string;
    isSave: boolean;
    workType: string;
    proj_SD_offer_id: string;
}

export interface MaterialPageParams {
    id?: string;
    cwp_page_source: '1' | '2' | '3';
}

export interface QueryMaterialParams {
    requestId: string;
}

export interface SubmitBomParams {
    fileIds: string[];
    workType: string;
    matIds: string[];
    requestId: string;
}