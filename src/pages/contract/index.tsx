import React, { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button, Input, Message } from '@arco-design/web-react';
import { useHistory, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { PriceTypeMap } from '@/types';
import ContractInfo from './ContractInfo';
import { get, post, uploadFile } from '@/utils/http';
import useStorage from '@/utils/useStorage';
import html2canvas from 'html2canvas';
const ContractPage = () => {
  const history = useHistory();
  const sigCanvas = useRef<any>({});
  const clearBtnRef = useRef<any>();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [tenantUser] = useStorage('tenantUser');
  const state = location.state as any;
  const [record, setRecord] = useState(state);
  const [landlordInfo, setLandlordInfo] = useState<any>();
  const contractRef = useRef();
  useEffect(() => {
    getLandlordInfo();
  }, [state]);
  const getLandlordInfo = async () => {
    const { code, msg, data }: any = await get('landlord/' + state.landlordId);
    if (code == 200) {
      setLandlordInfo(data);
    }
  };
  const clear = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
  };

  const save = () => {
    if (sigCanvas.current) {
      const url = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    }
  };

  const saveContract = async (url) => {
    try {
      const { tenantId, landlordId, listingId, listingTitle, id } = record;
      const listing = record.listing;
      const { title } = listing;
      const body = {
        url,
        title,
        tenantId,
        landlordId,
        listingId,
        listingTitle,
        orderId: id,
      };
      const { data, code } = await post('contract/create_contract', body);
      if (code == 200) {
        Message.success('成功创建合同');
        history.goBack();
      }
    } catch (err) {
      Message.error('创建合同失败' + err.toString());
    }
  };
  const generatePDF = async () => {
    const contract = contractRef.current;
    const clearBtn = clearBtnRef.current;

    if (contract) {
      if (clearBtn) {
        clearBtn.style.display = 'none';
      }
      html2canvas(contract)
        .then(async (canvas) => {
          const fix = Date.now();
          const fileName = `contract${fix}.png`;
          const imgData = canvas.toDataURL(fileName);
          const link = document.createElement('a');
          link.href = imgData;
          link.download = fileName;
          link.click();
          canvas.toBlob(async (blob) => {
            //blob to file
            const file = new File([blob], fileName, {
              type: 'image/png',
            });
            const { data, code }: any = await uploadFile('upload', file);
            if (code == 200) {
              saveContract(fileName);
            }
          });
          return;
        })
        .catch((error) => {
          console.error('Oops, something went wrong!', error);
        });
    }
  };
  return (
    <div className="relative w-full mb-10">
      <div className="py-10 px-[150px]" ref={contractRef}>
        <h1 className="flex justify-center mb-4 text-2xl font-bold">
          房屋租赁合同
        </h1>
        <p>
          出租方（以下简称甲方）：
          <span className="text-p">{landlordInfo?.realname}</span>
        </p>
        <p>
          承租方（以下简称乙方）：
          <span className="text-p">{tenantUser?.realname}</span>
        </p>
        <p>
          根据《民法典》及相关法律的规定，甲、乙双方在平等、自愿的基础上，就下列房屋的租赁事宜，达成如下协议：
        </p>
        <h2 className="my-4 text-xl font-bold">第一条房屋基本情况</h2>
        <p>1、甲方房屋（以下简称该房屋）位于</p>
        <span className="text-p">{record.listing.address}</span>
        ；建筑面积
        <div className="inline-block mx-2 underline text-p">
          {record.listing.area}
        </div>
        平方米。
        <p>
          2、房屋权属状况：甲方持有，房屋所有权证书编号：
          <span className="text-p">{record.listing.id} </span>
        </p>
        <h2 className="my-4 text-xl font-bold">第三条租赁期限</h2>
        <p>
          租赁期限自{' '}
          <span className="text-p">
            {dayjs(record.startTime).format('YYYY年MM月DD日')}
          </span>
          日至{' '}
          <span className="text-p">
            {dayjs(record.endTime).format('YYYY年MM月DD日')}
          </span>
          日止。租赁期满，甲方有权收回出租房，乙方应如期交还。乙方如要求续租，应提前三十日向甲方提出，经协商一致后，双方续签租赁合同。
        </p>
        <h2 className="my-4 text-xl font-bold">第四条租金及支付方式</h2>
        <p>
          该房屋租金为{' '}
          <span className="text-p">
            {record.price}每{PriceTypeMap[record.priceType]}
          </span>
          （税前），
          房屋租金支付方式为线下现金或电子支付，后续租金应在前一期租金到期日前 3
          天支付。
        </p>
        <h2 className="my-4 text-xl font-bold">第五条押金</h2>
        <p>
          　甲、乙双方自本合同签订之日起，由乙方支付甲方押金______，租赁期满，房屋经甲方验收合格后全额退还给乙方。
        </p>
        <ContractInfo />
        <div className="flex w-full">
          <div className="w-1/2">
            <div>
              电话号码：
              <span className="text-p">{landlordInfo?.phone}</span>
            </div>
            <div>
              身份证号：
              <span className="text-p">{landlordInfo?.cardId}</span>
            </div>
            <div>
              甲方（签字或签章）：
              <div>
                <img src={'https://' + landlordInfo?.signature} alt="" />
                {/* <img src={imgSrc} alt="甲方" className="w-[400px] h-[150px]" /> */}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div>
              电话号码：
              <span className="text-p">{tenantUser?.phone}</span>
            </div>
            <div>
              身份证号：
              <span className="text-p">{tenantUser?.cardId}</span>
            </div>
            <div>
              乙方（签字或签章）：
              {visible ? (
                <div>
                  <div className="w-full mt-6  border-gray-500 h-[150px]">
                    <SignatureCanvas
                      penColor="black"
                      canvasProps={{
                        width: 400,
                        height: 150,
                        className: 'sigCanvas',
                      }}
                      ref={sigCanvas}
                    />
                  </div>
                  <div ref={clearBtnRef}>
                    <Button onClick={clear}>清除</Button>
                    {/* <Button onClick={save}>保存</Button> */}
                  </div>
                </div>
              ) : (
                <span
                  className="underline text-p"
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  点击签字
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-10">
        <Button onClick={generatePDF}>签订并下载合同</Button>
      </div>
    </div>
  );
};

export default ContractPage;
