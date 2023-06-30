export const postPrinter = (item) => {
	return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            *{
                padding: 0;
                margin: 0;
            }
            .container{
                width: 402px;
                padding: 20px 10px 50px;
                box-sizing: border-box;
                border: 1px solid;
            }
            .logo{
                display: flex;
                justify-content: space-between;
                /* padding: 20px;
                box-sizing: border-box; */
            }
            .logo-box .one{
                width: 34px;
                height: 8px;
                border: 2px solid #000;
                border-radius: 2px;
                transform: rotate(135deg);
            }
            .logo-box .two{
                width: 34px;
                height: 10px;
                border: 2px solid #000;
                border-radius: 3px;
                transform: rotate(135deg);
                margin: -10px 0px 0 30px;
            }
            .logo-box .thr{
                width: 34px;
                height: 13px;
                border: 2px solid #000;
                border-radius: 4px;
                transform: rotate(135deg);
                margin: 22px 25px 10px;
            }
            .logo .title{
                font-size: 48px;
                font-weight: normal;
                color: #000;
                font-family: '站酷文艺体';
            }
            .order-no{
                font-size: 48px;
                font-weight: normal;
                color: #000;
                font-family: '站酷文艺体';
                margin-right: 30px;
            }
            .shop-name{
                font-size: 20px;
                color: #000;
                margin-left: 20px;
                margin-top: 30px;
                font-family: '思源黑体';
            }
            .hr{
                font-size: 20px;
                font-family: '思源黑体';
                font-weight: normal;
                margin: 15px 0 ; 
            }
            .car-info .car-no{
                font-size: 48px;
                font-family: '思源黑体';
                font-weight: 700;
                color: #000;
                word-wrap: break-word;
            }
            .mobile{
                font-size: 20px;
                font-family: '思源黑体';
                font-weight: 700;
                margin: 15px 0 ;
            }
            .car-time{
                font-size: 20px;
                font-family: '思源黑体';
                font-weight: 700;
            }
            .car-info .tips{
                font-size: 14px;
                font-family: '思源黑体';
                font-weight: normal;
                margin: 15px 0;
            }
            .titles{
                font-size: 28px;
                font-family: '思源黑体';
                font-weight: normal;
                margin: 20px 0;
                text-align: center;
            }
            .goods-list{
                font-size: 20px;
                font-family: '思源黑体';
                font-weight: normal;
                
            }
            .goods-list li{
                margin: 10px 0;
            }
            .total{
                font-size: 36px;
                font-family: '思源黑体';
                font-weight: normal;
            }
            .line-icon{
                margin: 20px 0;
            }
            .order-number{
                font-size: 16px;
                font-family: '思源黑体';
                font-weight: 700;
                text-align: center;
                margin-bottom: 30px;
            }
            .order-times p{
                display: flex;
                justify-content: space-between;
                margin-bottom: 15px;
                padding: 0 10px ;
                box-sizing: border-box;
            }
        </style>
    </head>
    <body>
        
    
        <div class="container">
            <div class="logo">
                <div style="display: flex;">
                    <div class="logo-box">
                        <div class="one"></div>
                        <div class="two"></div>
                        <div class="thr"></div>
                    </div>
                    <div class="title">
                        路取
                    </div>
                </div>
                <div class="order-no">
                    # 1
                </div>
            </div>
            <div class="shop-name">
                商家: 时机成熟我就开店了
            </div>
            <div class="hr">······································</div>
            <div class="car-info">
                <p class="car-no">车辆尾号321【柯尼塞格，黑】</p>
                <p class="mobile">电话尾号9281</p>
                <p class="car-time">车主：最快预到26分钟【仅代表下单距离】</p>
                <p class="tips">实际到达时间请以看护人端定位为准，请耐心等待，若长时间仍未到达，请电话联系客户！</p>
            </div>
            <div class="hr">·················备注·················</div>
            <div class="titles">
                原配餐具
            </div>
            <div class="hr">······································</div>
            <ul class="goods-list">
                <li>叉烧包 ×1</li>
                <li>叉烧包 ×1</li>
                <li>叉烧包 ×1</li>
                <li>叉烧包 ×1</li>
                <li>叉烧包 ×1</li>
                <li>叉烧包 ×1</li>
                <li>...已折叠</li>
            </ul>
            <div class="total">合计：￥389</div>
            <div class="hr">······································</div>
            <div class="line-icon">||||||||||||||||||||</div>
            <div class="order-number">订单号：NO:2022091620244401</div>
            <div class="order-times">
                <p><span>下单时间</span><span>5-15  12：10</span></p>
                <p><span>打印时间</span><span>5-15  12：10</span></p>
            </div>
            <div class="hr">··············路取#1完··············</div>
        </div>
    </body>
    </html>
    `;
};
