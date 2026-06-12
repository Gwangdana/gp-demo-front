// export default function App () {
//     return <>Hello world
//     </>
// }

import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import './App.less';
import {MaterialBomUpload} from "./pages/materialBomUpload";

const App: React.FC = () => {
    return (
        <ConfigProvider locale={zhCN}>
            <div className="app-container">
                {/* 传入测试参数：cwp_page_source 控制权限 1/2/3 */}
                <MaterialBomUpload
                    show={true}
                    params={{
                        id: 'TEST_REQUEST_001',
                        cwp_page_source: '1'
                    }}
                />
            </div>
        </ConfigProvider>
    );
};

export default App;