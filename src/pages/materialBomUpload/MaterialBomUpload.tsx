import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import './MaterialBomUpload.less';
import type {MaterialGroupItem, MaterialPageParams, QueryMaterialParams} from "../../types/material_types.ts";
import {PageLayout} from "../../pageLayout";
import {MaterialUploadRow} from "../../components/business/MaterialUploadRow";
import {random_string} from "../../utils/string_utils.ts";

// 页面Props
interface MaterialBomUploadProps {
    show?: boolean;
    params?: MaterialPageParams;
}

const MaterialBomUpload: React.FC<MaterialBomUploadProps> = (props) => {
    const { show = true, params = {} } = props;
    const { id = '', cwp_page_source = '1' } = params;

    // 页面状态
    const [work_type, set_work_type] = useState('');
    const [proj_sd_offer_id, set_proj_sd_offer_id] = useState('');
    const [group_list, set_group_list] = useState<MaterialGroupItem[]>([]);
    const [page_loading, set_page_loading] = useState(false);

    // 刷新列表回调
    const refresh_tables = (refresh: boolean) => {
        if (refresh) {
            fetch_material_data();
        }
    };

    // 请求物料列表数据
    const fetch_material_data = async () => {
        if (page_loading) return;
        set_page_loading(true);

        try {
            const req_params: QueryMaterialParams = { requestId: id };
            const res = await query_proj_mat_data(req_params);

            if (res.status !== 'OK') {
                message.error(res.message, 4);
                return;
            }

            if (res.rows.length === 0) {
                set_group_list([]);
                return;
            }

            // 格式化后端数据
            const list: MaterialGroupItem[] = res.rows.map(item => ({
                processNo: item.processNo || [],
                matIds: item.matIds || [],
                matNo: item.material_no,
                matName: item.material_name,
                isSave: item.isSave,
                workType: item.workType,
                proj_SD_offer_id: item.proj_SD_offer_id
            }));

            set_work_type(res.rows[0].workType);
            set_proj_sd_offer_id(res.rows[0].proj_SD_offer_id);
            set_group_list(list);
        } catch (error) {
            message.error('数据请求失败，请检查网络');
            console.error(error);
        } finally {
            set_page_loading(false);
        }
    };

    // 页面初始化请求
    useEffect(() => {
        fetch_material_data();
    }, [id]);

    return (
        <PageLayout show={show} loading={page_loading}>
            <div className="material-bom-upload">
                {/* 无数据提示 */}
                {group_list.length === 0 ? (
                    <div className="empty-tip">暂无物料数据</div>
                ) : (
                    <div className="table-wrapper">
                        {/* 表头 */}
                        <div className="table-header">
                            <div className="col" style={{ width: '180px' }}>工艺编号</div>
                            <div className="col" style={{ width: '200px' }}>物料编号</div>
                            <div className="col" style={{ width: '200px' }}>物料名称</div>
                            <div className="col" style={{ flex: 1 }}>上传附件</div>
                            <div className="col" style={{ width: '120px' }}>操作</div>
                        </div>

                        {/* 列表行 */}
                        <div className="table-body">
                            {group_list.map((item, index) => (
                                <MaterialUploadRow
                                    key={random_string(32)}
                                    cwp_page_source={cwp_page_source}
                                    worktype={work_type}
                                    proj_SD_offer_id={proj_sd_offer_id}
                                    request_id={id}
                                    processNoList={item.processNo}
                                    matIds={item.matIds}
                                    matNo={item.matNo}
                                    matName={item.matName}
                                    processNoText={format_process_no(item.processNo)}
                                    groupIndex={index}
                                    isSave={item.isSave}
                                    refreshTabls={refresh_tables}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </PageLayout>
    );
};

export default MaterialBomUpload;