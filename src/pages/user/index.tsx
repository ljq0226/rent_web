import React, { useState } from 'react';
import { Card, Tabs } from '@arco-design/web-react';
import InfoHeader from './header';
import InfoForm from './info';
import './mock';

function UserInfo() {
  return (
    <div>
      <Card style={{ padding: '14px 20px' }}>
        <InfoHeader userInfo={{}} />
      </Card>
      <Card style={{ marginTop: '16px' }}>
        <InfoForm />
      </Card>
    </div>
  );
}

export default UserInfo;
