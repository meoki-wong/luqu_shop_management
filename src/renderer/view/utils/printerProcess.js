import React, { useRef } from 'react';
import { postPrinter } from './printerHTML';
const { send, on, sendSync } = window.ipcRenderer;
// 获取打印机列表
const printList = [];

// 打印程序



export const startPrint = (obj) => {
  // obj 是打印机对象
  console.log('-----打印机参数', obj);
  // const printWebview = useRef(null); //获取dom节点
  const printStyle = '<span>第一次打印</span>';
  const printData = {
    deviceName: obj.name, // 打印机名称
    html: postPrinter(), // 你需要打印的内容
  };
  send('printStart', printData);
  // 监听主线程发送的打印结果的事件
  on('res', (_e, data) => {
    // console.warn(e);
    console.log('执行完打印程序', data);
  });
};

export const getPrint = () => {
  const reslut = sendSync('getPrinterList');
  console.log('发送获取打印机列表事件', reslut);
  startPrint(reslut[0]);
  // 监听主线程发送打印机列表的事件
  // ipcRenderer.on("getPrinterList", (event, data) => {
  // 	console.log("-------event", event);

  // 	printList = data;
  // 	console.log("列表", data); // data就是返回的打印机数据列表
  // });
};
