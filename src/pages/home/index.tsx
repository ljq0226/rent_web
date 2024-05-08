import React, { useEffect } from 'react';
import { Banner, Card } from '@/components/home/Banner';
import AppNearby from '@/components/home/AppNearby';
import AppLiveAnywhere from '@/components/home/AppLiveAnywhere';
import useStorage from '@/utils/useStorage';
import AuthenticationModal from '@/components/AuthenticationModal';
import { post } from '@/utils/http';
import { Message } from '@arco-design/web-react';
const HomePage = () => {
  const [visible, setVisible] = React.useState(false);

  const [tenantUser, setTenantUser] = useStorage('tenantUser');
  useEffect(() => {
    const isUpdate = tenantUser?.isUpdate;
    if (!isUpdate) {
      setVisible(true);
    }
  }, [tenantUser]);
  const updateInfo = async (dto) => {
    try {
      const { code, msg, data } = await post(
        'tenant/update_tenant/' + tenantUser.id,
        {
          isUpdate: true,
          ...dto,
        }
      );
      if (code == 200) {
        setVisible(false);
        setTenantUser(data);
        Message.success('身份认证成功!');
      }
    } catch (err) {
      Message.error('身份认证失败' + err.toString());
    }
  };
  return (
    <div>
      <Banner />
      <main className="px-4 mx-auto mt-4 space-y-4 max-w-7xl sm:px-10 lg:px-16 xs:px-8">
        <AppNearby />
        <AppLiveAnywhere />
      </main>
      <Card />
      <AuthenticationModal
        visible={visible}
        setVisible={setVisible}
        updateInfo={updateInfo}
      />
    </div>
  );
};

export default HomePage;
