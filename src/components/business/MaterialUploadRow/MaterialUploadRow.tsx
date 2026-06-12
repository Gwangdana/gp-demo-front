import {FileUpload} from "../../ui/FileUpload";
import {useEffect, useState} from "react";
import { Form, Button, message } from 'antd';
import type {SubmitBomParams} from "../../../types/material_types.ts";
import {formatter_bom_data} from "../../../api/material_api.ts";

export interface MaterialUploadRowProps {
    cwp_page_source: string;
    worktype: string;
    proj_SD_offer_id: string;
    request_id: string;
    processNoList: string[];
    matIds: string[];
    matNo: string;
    matName: string;
    processNoText: string;
    groupIndex: number;
    isSave: boolean;
    refreshTabls: (refresh: boolean) => void;
}

const MaterialUploadRow: React.FunctionComponent<MaterialUploadRowProps> = (props) => {
    const {
        cwp_page_source,
        worktype,
        proj_SD_offer_id,
        matIds,
        matNo,
        matName,
        refreshTabls,
        request_id,
        processNoText,
        groupIndex,
        isSave
    } = props;

    const [form] = Form.useForm();
    const [submit_loading, set_submit_loading] = useState<boolean>(true);
    const [has_operate_auth, set_has_operate_auth] = useState<boolean>(false);

    useEffect(() => {
        set_has_operate_auth(!['2','3'].includes(cwp_page_source));
    }, [cwp_page_source]);

    const handle_upload_change = (fileId: string) => {
        form.setFieldsValue({
            [`file_id_${groupIndex}`]: fileId
        });
    }

    const handle_submit = async () => {
        set_submit_loading(true);

        try{
            await form.validateFields();
            if(matIds.length === 0) {
                message.warning('物料数据为空，请检查！');
                return;
            }
            const form_values = form.getFieldsValue();
            const file_ids = [form_values[`file_id_${groupIndex}`]];

            const submit_params: SubmitBomParams = {
                fileIds: file_ids,
                workType: worktype,
                matIds,
                requestId: request_id
            };

            const res = await formatter_bom_data(submit_params);
            if (res?.status === 'OK' || res?.code === 200) {
                message.success('文件保存成功！');
                refreshTabls(true);
                form.resetFields();
            } else {
                message.error(res?.message || '保存失败，请重试！');
            }
        } catch (error) {
            console.log(error);
            message.error("提交失败！");
        } finally {
            set_submit_loading(false);
        }
    }

    return (
        <div className="materialUploadRow">
            <div className="col-process-no">{processNoText}</div>
            <div className="col-matrial-no">{matNo}</div>
            <div className="col-material-name">{matName}</div>
            <div className="col-upload">
                <Form form={form} layout="inline">
                    <Form.Item
                        name={`file_id_${groupIndex}`}
                        rules={[{ required: has_operate_auth, message: '请上传Excel文件' }]}
                        style={{ marginBottom: 0 }}
                    >
                        <FileUpload
                            accept=".xls,.xlsx"
                            showUploadBtn={has_operate_auth}
                            disabled={!has_operate_auth}
                            onChange={handle_upload_change}
                        />
                    </Form.Item>
                </Form>
            </div>
            <div className="col-submit">
                {has_operate_auth ? (
                    <Button
                        type="primary"
                        size="small"
                        loading={submit_loading}
                        onClick={handle_submit}
                    >提交</Button>
                ) : (
                    <span className="text-no-auth">无操作权限</span>
                )}
            </div>
        </div>
    );
}

export default MaterialUploadRow;