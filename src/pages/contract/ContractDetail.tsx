import { get } from '@/utils/http';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const ContractDetail = () => {
  const params: any = useParams();
  const [contract, setContract] = useState<any>();
  const getContract = async () => {
    const { code, data, msg }: any = await get(`contract/${params.id}`);
    if (code === 200) {
      console.log('data', data);
      setContract(data.url);
    }
  };
  useEffect(() => {
    getContract();
  }, []);
  return (
    <div>
      <img src={'https://' + contract} alt="" />
    </div>
  );
};

export default ContractDetail;
