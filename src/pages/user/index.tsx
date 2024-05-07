import React, { useState } from 'react';
import { Card, Tabs } from '@arco-design/web-react';
import InfoHeader from './header';
import Verified from './verified';

function UserInfo() {
  const [activeTab, setActiveTab] = useState('verified');
  return (
    <div className="w-full px-[20vw] pt-[10vh]">
      <Card style={{ padding: '14px 20px' }}>
        <InfoHeader />
      </Card>
      <Card style={{ marginTop: '16px' }}>
        <Tabs activeTab={activeTab} onChange={setActiveTab} type="rounded">
          <Tabs.TabPane key="verified" title={'实名认证'}>
            <Verified />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
}

export default UserInfo;
