import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import { IpFormat } from 'src/models/ip_format';
import { FC, ChangeEvent, useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import Cookies from 'js-cookie';
import { UserFormat } from 'src/models/user_format';

function RecentOrders() {
  const [cryptoOrders, setCryptoOrders] = useState<UserFormat[]>([
    // {
    //   id: '1',
    //   time: 0.13124,
    //   source: '162.142.125.21',
    //   destination: '185.55.124.98',
    //   protocol: 'TCP',
    //   length: 23
    // }
  ]);

  useEffect(() => {
    //仅在componentDidMount的时候执行
    getdata();
  }, []);

  const getdata = () => {
    axios
      .create({
        headers: {
          token: cookie.load('token'),
          'Cache-Control': 'no-cache'
        }
      })
      .get('/api/userlist')
      .then((response) => {
        // handle success
        // console.log(response);
        let { data } = response.data;
        console.log(data);
        setCryptoOrders(data.list2);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={cryptoOrders} />
    </Card>
  );
}

export default RecentOrders;
