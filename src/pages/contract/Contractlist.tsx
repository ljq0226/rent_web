import React, { useEffect } from 'react';
import { useState } from 'react';
import { Tabs, Image, Typography } from '@arco-design/web-react';
import { get } from '@/utils/http';
import useStorage from '@/utils/useStorage';
const TabPane = Tabs.TabPane;
const style = {
  textAlign: 'center',
  marginTop: 20,
};
const Contractlist = () => {
  const [tenantUser] = useStorage('tenantUser');
  const [contractList, setContractList] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const { msg, code, data }: any = await get(
      'contract/tenant/' + tenantUser?.id
    );
    if (code === 200) {
      setContractList(data?.arr);
    }
  };
  return (
    <div>
      <Tabs
        key="card"
        tabPosition={'left'}
        className={'w-full px-[20%] h-[80vh]'}
      >
        {contractList?.length == 0 && <div>暂无合同</div>}
        {contractList?.map((item: any) => {
          return (
            <TabPane key={item.id} title={item.title}>
              <a
                href={'https://' + item?.url}
                download
                className="mt-2 ml-4 -mb-2 underline text-p"
              >
                下载合同
              </a>
              <Image src={'https://' + item?.url} alt="lamp" />
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Contractlist;
