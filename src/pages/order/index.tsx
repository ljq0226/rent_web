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
  const [curOrderIndex, setCurOrderIndex] = useState(0);
  const history = useHistory();
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    setorder(orderList[curOrderIndex]);
  }, [orderList]);
  useEffect(() => {
    setorder(orderList[curOrderIndex]);
  }, [curOrderIndex]);
  const fetchData = async () => {
    const { code, data, msg }: any = await get(
      'order/get_user_order/' + tenantUser?.id
    );
    if (code == 200) {
      setOrderList(data.arr);
    }
  };
  const handleOk = async () => {
    const { status } = order;
    if (status == 0) {
      history.push('/contract', order);
    } else if (status == 1) {
      Message.info('订单已支付');
    } else if (status == 2) {
      Message.info('订单已取消');
    }
  };
  const checkContract = () => {
    history.push('/contract', order);
  };
  const cancleOrder = async () => {
    try {
      const { data, code, msg } = await post(
        'order/cancel_order/' + order.id,
        {}
      );
      if (code == 200) {
        fetchData();
        Message.success('取消订单成功!');
      }
    } catch (err) {
      Message.error(err.toString());
    }
  };
  return (
    <div className="w-full h-[80vh] px-[12vw] mt-4">
      <div className="flex w-full h-full border border-gray-500">
        <div className="border-r w-[20vw]  overflow-hidden">
          {orderList.map((item: any, index) => {
            return (
              <div
                className="flex w-full p-2 h-[10vh] border-b border-gray-500 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setCurOrderIndex(index);
                }}
              >
                <Avatar
                  className={'flex justify-center align-center mt-2 mr-2'}
                >
                  <img src="/assets/explore-nearby/41m.webp" alt="" />
                </Avatar>
                <div>
                  <div>订单名称:{item.ordername}</div>
                  <div>房东名称:{item.landlordName}</div>
                  <div>房源标题:{item.listingTitle}</div>
                </div>
                <div className="flex items-center justify-center">
                  {item?.status == 0 && <div>未支付</div>}
                  {item?.status == 1 && <div>已支付</div>}
                  {item?.status == 2 && <div>已取消</div>}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex-1 overflow-y-scroll">
          {order?.listing && (
            <OrderDescription listing={order?.listing} order={order} />
          )}
          <div className="flex pr-2 my-2 space-x-2">
            <div className="flex-1"></div>
            {order?.status == 0 && (
              <>
                <Button onClick={cancleOrder}>取消订单</Button>
                <Button onClick={handleOk}>确认无误签发合同</Button>
              </>
            )}
            {order?.status == 1 && (
              <>
                <Button onClick={checkContract}>查看合同详情</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
