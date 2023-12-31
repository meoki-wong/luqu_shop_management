import config from '@config/index';
import { app, BrowserWindow, Menu, dialog, ipcMain } from 'electron';
import { join } from 'path';
import setIpc from './ipcMain';
import menuconfig from '../config/menu';
import { winURL, loadingURL, getPreloadFile } from '../config/StaticPath';

setIpc.Mainfunc();

class MainInit {
  public winURL = '';

  public shartURL = '';

  public childURL = '';

  public loadWindow: BrowserWindow = null;

  public mainWindow: BrowserWindow = null;

  public childWindow: BrowserWindow = null;

  constructor() {
    this.winURL = winURL;
    this.shartURL = loadingURL;
    // if (process.env.NODE_ENV === 'development') {
    menuconfig.push({
      label: '开发者设置',
      submenu: [
        {
          label: '切换到开发者模式',
          accelerator: 'CmdOrCtrl+I',
          role: 'toggledevtools',
        },
      ],
    });
    // }
  }

  // 主窗口函数
  createMainWindow() {
    this.mainWindow = new BrowserWindow({
      titleBarStyle: config.IsUseSysTitle ? 'hidden' : 'default',
      height: 700,
      useContentSize: true,
      minWidth: 1164,
      width: 1164,
      show: false,
      // frame: false,
      webPreferences: {
        sandbox: false,
        webSecurity: false,
        // 如果是开发模式可以使用devTools
        // devTools: process.env.NODE_ENV === 'development',
        devTools: true,
        // 在macos中启用橡皮动画
        scrollBounce: process.platform === 'darwin',
        preload: getPreloadFile('preload'),
      },
    });
    // 赋予模板
    const menu = Menu.buildFromTemplate(menuconfig as any);
    // 加载模板
    Menu.setApplicationMenu(menu);
    // 加载主窗口
    this.mainWindow.loadURL(this.winURL);
    // dom-ready之后显示界面
    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow.show();
      if (config.UseStartupChart) this.loadWindow.destroy();
    });
    // 开发模式下自动开启devtools
    if (process.env.NODE_ENV === 'development') {
      this.mainWindow.webContents.openDevTools({
        mode: 'undocked',
        activate: true,
      });
    }
    // 当确定渲染进程卡死时，分类型进行告警操作
    app.on('render-process-gone', (event, webContents, details) => {
      const message = {
        title: '',
        buttons: [],
        message: '',
      };
      switch (details.reason) {
        case 'crashed':
          message.title = '警告';
          message.buttons = ['确定', '退出'];
          message.message = '图形化进程崩溃，是否进行软重启操作？';
          break;
        case 'killed':
          message.title = '警告';
          message.buttons = ['确定', '退出'];
          message.message = '由于未知原因导致图形化进程被终止，是否进行软重启操作？';
          break;
        case 'oom':
          message.title = '警告';
          message.buttons = ['确定', '退出'];
          message.message = '内存不足，是否软重启释放内存？';
          break;

        default:
          break;
      }
      dialog
        .showMessageBox(this.mainWindow, {
          type: 'warning',
          title: message.title,
          buttons: message.buttons,
          message: message.message,
          noLink: true,
        })
        .then((res) => {
          if (res.response === 0) this.mainWindow.reload();
          else this.mainWindow.close();
        });
    });
    // 不知道什么原因，反正就是这个窗口里的页面触发了假死时执行
    this.mainWindow.on('unresponsive', () => {
      dialog
        .showMessageBox(this.mainWindow, {
          type: 'warning',
          title: '警告',
          buttons: ['重载', '退出'],
          message: '图形化进程失去响应，是否等待其恢复？',
          noLink: true,
        })
        .then((res) => {
          if (res.response === 0) this.mainWindow.reload();
          else this.mainWindow.close();
        });
    });
    /**
     * 新的gpu崩溃检测，详细参数详见：http://www.electronjs.org/docs/api/app
     * @returns {void}
     * @author zmr (umbrella22)
     * @date 2020-11-27
     */
    app.on('child-process-gone', (event, details) => {
      const message = {
        title: '',
        buttons: [],
        message: '',
      };
      switch (details.type) {
        case 'GPU':
          switch (details.reason) {
            case 'crashed':
              message.title = '警告';
              message.buttons = ['确定', '退出'];
              message.message = '硬件加速进程已崩溃，是否关闭硬件加速并重启？';
              break;
            case 'killed':
              message.title = '警告';
              message.buttons = ['确定', '退出'];
              message.message = '硬件加速进程被意外终止，是否关闭硬件加速并重启？';
              break;
            default:
              break;
          }
          break;

        default:
          break;
      }
      dialog
        .showMessageBox(this.mainWindow, {
          type: 'warning',
          title: message.title,
          buttons: message.buttons,
          message: message.message,
          noLink: true,
        })
        .then((res) => {
          // 当显卡出现崩溃现象时使用该设置禁用显卡加速模式。
          if (res.response === 0) {
            if (details.type === 'GPU') app.disableHardwareAcceleration();
            this.mainWindow.reload();
          } else {
            this.mainWindow.close();
          }
        });
    });
    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });
  }

  // 加载窗口函数
  loadingWindow(loadingURL: string) {
    this.loadWindow = new BrowserWindow({
      width: 800,
      height: 600,
      // frame: false,
      skipTaskbar: true,
      // transparent: true,
      resizable: false,
      webPreferences: {
        experimentalFeatures: true,
        preload: process.env.NODE_ENV === 'development' ? join(app.getAppPath(), 'preload.js') : join(app.getAppPath(), 'dist/electron/main/preload.js'),
      },
    });

    this.loadWindow.loadURL(loadingURL);
    this.loadWindow.show();
    this.loadWindow.setAlwaysOnTop(true);
    ipcMain.on('getPrinterList', (event: any) => {
      this.mainWindow.webContents.getPrintersAsync().then((res: any) => {
        // 告知列表
        /* eslint-disable no-param-reassign */
        event.returnValue = res;
      });
    });
    ipcMain.on('printStart', (_event, obj) => {
      const printWindow = new BrowserWindow({
        // 实例化一个新的浏览器窗口用于打印
        webPreferences: {
          nodeIntegration: true,
          webSecurity: false,
          // enableRemoteModule: true,
        },
        show: false,
        width: 800,
        height: 600,
        fullscreenable: true,
        minimizable: false,
      });
      // 打印窗口添加html页面
      printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(obj.html)}`);
      printWindow.webContents.on('did-finish-load', () => {
        // 等待页面加载完成过后再打印
        printWindow.webContents.print(
          {
            silent: false, // 不显示打印对话框
            printBackground: true, // 是否打印背景图像
            deviceName: obj.deviceName,
            pageSize: {
              height: 308000,
              width: 106400,
            },
          },
          (success, failureReason) => {
            printWindow.webContents.send('res', {
              success,
              failureReason,
            });
            printWindow.close(); // 打印过后关闭该窗口
          },
        );
      });
    });
    // 延迟两秒可以根据情况后续调快，= =，就相当于个，sleep吧，就那种。 = =。。。
    setTimeout(() => {
      this.createMainWindow();
    }, 1500);
  }

  // 初始化窗口函数
  initWindow() {
    if (config.UseStartupChart) {
      return this.loadingWindow(this.shartURL);
    }
    return this.createMainWindow();
  }
}
export default MainInit;
