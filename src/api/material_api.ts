import type {QueryMaterialParams, SubmitBomParams} from "../types/material_types.ts";

export const query_proj_material_data = async (params: QueryMaterialParams) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(params);
    return {
        status: 'OK',
        code: 200,
        message: '请求成功',
        rows: [
            {
                processNo: ['P001', 'P002'],
                matIds: ['M001', 'M002'],
                material_no: 'MAT001',
                material_name: '测试物料-外壳',
                isSave: true,
                workType: 'CWP',
                proj_SD_offer_id: 'OFFER_20260610_001'
            },
            {
                processNo: ['P003'],
                matIds: ['M003'],
                material_no: 'MAT002',
                material_name: '测试物料-主板',
                isSave: false,
                workType: 'CWP',
                proj_SD_offer_id: 'OFFER_20260610_001'
            }
        ]
    };
};

export const formatter_bom_data = async (params: SubmitBomParams) => {
    console.log(params);
    return {
        status: 'OK',
        code: 200,
        message: '解析成功'
    }
};