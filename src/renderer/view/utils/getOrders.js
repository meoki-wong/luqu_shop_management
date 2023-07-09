import { message, notification } from 'antd';
import BASE from './base';
import Method from './Method';
import { request } from '../api/request';
import { getPrint, startPrint } from './printerProcess';
import Music from './music/notice.mp3';

let ShopId = null;
const queryInterval = 3;
const orderIdList = [];
let orderInitialed = false;

const audio = new Audio(Music);

export const getOrders = async () => {
  // audio.play();
  console.log('App Show');
  let orderTrackInterval = 0; // 轮询
  const { ITCode } = JSON.parse(localStorage.getItem('user'));
  // let music = uni.createInnerAudioContext();
  // music.src = "./static/music/notice.mp3";
  // let music

  // let globalData = getApp().globalData
  // console.log('===所有数据', getApp().globalData);
  // console.log(globalData);
  const isShop = Method.IsShop();
  const isCaregiver = Method.IsCaregiver();
  if (orderTrackInterval != 0) return;
  orderTrackInterval = setInterval(async () => {
    console.log('--00-0--0', ShopId, !isCaregiver);
    // if (!getApp()) return;
    // if (getApp().globalData == null) return;
    if (!isShop && !isCaregiver) return;
    if (!ITCode) return;

    // let ShopId = globalData.shopId;
    if (ShopId == null && !isCaregiver) {
      console.log('----进去');
      const res = await request.post('/Search/SearchShop/SearchShop', {
        Page: 1,
        OwnerId: ITCode,
      });
      console.log('-----rs', res);
      const ShopIds = res.data.Data.list[0].ID;
      ShopId = ShopIds;
    }

    const res = await request.post('/Search/SearchOrders/SearchOrders', {
      Page: 1,
      OState: 'WaitReady',
      ShopId,
    });

    // 初始化
    if (orderIdList.length == 0 && !orderInitialed) {
      const { count } = res.data.Data;
      console.log('初始化orderIdList');
      const res2 = await request.post('/Search/SearchOrders/SearchOrders', {
        Page: 1,
        OState: 'WaitReady',
        ShopId,
        Count: count,
      });
      const orderList2 = res2.data.Data.list;
      console.log('==orderList2', orderList2);
      orderList2.forEach((item) => {
        orderIdList.push(item.ID);
      });
      orderInitialed = true;
      return;
    }

    const newOrderList = res.data.Data.list;

    newOrderList.forEach((item) => {
      const orderList = orderIdList;
      if (orderIdList.includes(item.ID)) return;

      orderIdList.push(item.ID);
      const content = `订单：${item.ID}\t${item.CommodityList.Name}`;
      // uni.createPushMessage({
      // 	title: "你有新的订单",
      // 	content,
      // 	sound: "system",
      // });

      // music.play();
      startPrint(getPrint(item));
      audio.play();
      message.info('你有新的订单');
      notification.open({
        message: '你有新的订单',
        description: content,
        // onClick: () => {
        //   console.log('Notification Clicked!');
        // },
      });
      console.log('你有新的订单');
    });
    // console.log("轮询一次，默认每" + globalData.queryInterval + "秒一轮询");
  }, queryInterval * 1000);
};
