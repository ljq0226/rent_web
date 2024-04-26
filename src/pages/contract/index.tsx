import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button, Input } from '@arco-design/web-react';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { PriceTypeMap } from '@/types';
import ContractInfo from './ContractInfo';
import html2pdf from 'html2pdf.js';

const ContractPage = () => {
  const sigCanvas = useRef<any>({});
  const clearBtnRef = useRef<any>();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const state = location.state as any;
  const [record, setRecord] = useState(state);
  const contractRef = useRef();
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
  const generatePDF = () => {
    const contract = contractRef.current as any;
    clearBtnRef.current.innerHTML = '';
    contract.classList.value = '';
    const opt = {
      margin: 1,
      filename: 'myfile.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(contract).save();
    contract.classList.value = 'py-10 px-[150px]';
  };
  return (
    <div className="relative w-full mb-10">
      <div className="py-10 px-[150px]" ref={contractRef}>
        <h1 className="flex justify-center mb-4 text-2xl font-bold">
          房屋租赁合同
        </h1>
        <p>
          出租方（以下简称甲方）：
          <span className="text-p">{record.landlordName}</span>
        </p>
        <p>
          承租方（以下简称乙方）：
          <span className="text-p">{record.tenantName}</span>
        </p>
        <p>
          根据《民法典》及相关法律的规定，甲、乙双方在平等、自愿的基础上，就下列房屋的租赁事宜，达成如下协议：
        </p>
        <h2 className="my-4 text-xl font-bold">第一条房屋基本情况</h2>
        <p>
          1、甲方房屋（以下简称该房屋）位于
          <span className="text-p">{record.listing.address}</span>
          ；建筑面积
          <div className="inline-block mx-2 underline text-p">
            {record.listing.area}
          </div>
          平方米。
        </p>
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
            <div>电话号码：</div>
            <div>身份证号：</div>
            <div>甲方（签字或签章）：</div>
          </div>
          <div className="flex-1">
            <div>电话号码：</div>
            <div>身份证号：</div>
            <div>
              乙方（签字或签章）：
              {visible ? (
                <div>
                  <div className="w-full border border-gray-500 h-[200px]">
                    <SignatureCanvas
                      penColor="black"
                      canvasProps={{
                        width: 500,
                        height: 200,
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
        <Button onClick={generatePDF}>下载合同</Button>
      </div>
    </div>
  );
};

export default ContractPage;
