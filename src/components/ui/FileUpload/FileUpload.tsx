import React, { useState } from 'react';
import { Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { random_string } from '../../../utils/string_utils.ts'
import './FileUpload.less';

/**
 * 上传文件对象类型
 */
export interface FileItem {
    uid: string;
    name: string;
    status: 'done' | 'uploading' | 'error';
}

export interface FileUploadProps {
    maxFileCount?: number;
    maxFileSize?: number;
    accept?: string;
    showUploadBtn?: boolean;
    showFileList?: boolean;
    disabled?: boolean;
    onChange: (fileId: string, files?: FileItem[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = (props) => {
    const {
        showUploadBtn = true,
        showFileList = true,
        disabled = false,
        onChange
    } = props;

    const [fileList, setFileList] = useState<FileItem[]>([]);

    // 模拟上传：生成随机fileId
    const handle_mock_upload = () => {
        if (disabled) return;
        const mock_file_id = random_string(32);
        const mock_file: FileItem = {
            uid: mock_file_id,
            name: '模拟Excel文件.xlsx',
            status: 'done'
        };

        const new_list: FileItem[] = [mock_file];
        setFileList(new_list);
        onChange(mock_file_id, new_list);
        message.success('文件上传成功');
    };

    return (
        <div className="file-upload">
            {showUploadBtn && (
                <Button
                    icon={<UploadOutlined />}
                    size="small"
                    disabled={disabled}
                    onClick={handle_mock_upload}
                >
                    选择文件
                </Button>
            )}

            {showFileList && fileList.length > 0 && (
                <div className="file-upload__list">
                    {fileList.map(file => (
                        <div key={file.uid} className="file-upload__item">
                            {file.name} ✔
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileUpload;