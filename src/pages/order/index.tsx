import { get, post } from '@/utils/http';
import useStorage from '@/utils/useStorage';
import React, { useEffect, useState } from 'react';
import OrderDescription from './OrderDescription';
import { Avatar, Button, Message } from '@arco-design/web-react';
import { useHistory } from 'react-router-dom';
const App = () => {
  const [orderList, setOrderList] = useState([]);
  const [tenantUser] = useStorage('tenantUser');
  const [order, setorder] = useState<any>({});
  const history = useHistory();
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    setorder(orderList[0]);
  }, [orderList]);
  const fetchData = async () => {
    const { code, data, msg }: any = await get(
      'order/get_user_order/' + tenantUser?.id
    );
    if (code == 200) {
      setOrderList(data.arr);
    }
  };
  const handleOk = async () => {
    console.log('order',order)
    history.push('/contract', order);
  };
  const cancleOrder = async () => {
    try {
      const { data, code, msg } = await post(
        '/order/cancel_order/' + order.id,
        {}
      );
      if (code == 200) {
      }
    } catch (err) {
      Message.error(err.toString());
    }
  };
  return (
    <div className="w-full h-[80vh] px-[12vw] mt-4">
      <div className="flex w-full h-full border border-gray-500">
        <div className="border-r w-[20vw]  overflow-hidden">
          {orderList.map((item: any) => {
            return (
              <div className="flex w-full h-[10vh] border-b border-gray-500">
                <div className="flex justify-center align-center">
                  <Avatar>
                    <img src="/assets/explore-nearby/41m.webp" alt="" />
                  </Avatar>
                </div>

                <div>
                  <div>订单名称:{item.ordername}</div>
                  <div>房东名称:{item.landlordName}</div>
                  <div>房源标题:{item.listingTitle}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex-1 overflow-y-scroll">
          {order?.listing && (
            <OrderDescription listing={order?.listing} order={order} />
          )}
          <div>
            <Button onClick={cancleOrder}>取消订单</Button>
            <Button onClick={handleOk}>确认无误签发合同</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
