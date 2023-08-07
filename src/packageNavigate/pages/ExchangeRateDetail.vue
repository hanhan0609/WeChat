<template>
    <view class="container">
        <ExchangeRateTop :currency="lang == 'zh_CN' ? currencyData.currencyPairsCN : currencyData.currencyPairs" :pageTopFlag="pageTopFlag" @qryDateChange="qryDateChange"></ExchangeRateTop>
        <!-- <view class="list">
          <uni-list>
            <uni-list-chat 
                class=""
                :title="currencyData.frate"
                :note="dateFormat('mm/dd', this.currencyData.dataDate) + ' ' + currencyData.currencyPairs"
            >
                <view class="chat-custom-right">
                    <view :class="currencyData.difference > 0 ? 'right-bottom-red' : 'right-bottom-green'">{{ currencyData.difference + '(' + currencyData.percent.toFixed(2) + '%)' }}</view>
                    
                </view>
            </uni-list-chat>
          </uni-list>
        </view> -->
        
        <view class="canvas-container">
            <qiun-data-charts 
                type="candle"
                :opts="opts"
                :chartData="chartData"
                :disableScroll="true"
                :ontouch="true"
                :onzoom="true"
                background="rgba(44, 49, 56, 1)"
                :canvas2d="true"
                id="exchangeratedetailcanvas"
            />
        </view>
        <view class="detail-bottom">
          <uni-list>
              <uni-list-item
                  class="detail-list-item"
                  v-for="(exchangeRateData, index) in exchangeRateData" 
                  v-bind:key="index"
                 
                >
                <template v-slot:body>
                  <text :style="{color:index ===5 ?'#e89e42' :'#fff'}" >{{exchangeRateData.name}}</text>
                </template>
                    <template v-slot:footer>
                        <text :style="{color:index === 4 ? (closingMarkFlag ? '#D9001B' : '#92ED15') 
                        : (index ===5 ?'#e89e42' :'#fff'), fontSize: '1rem'}">{{ exchangeRateData.data }}</text>
					          </template>
                </uni-list-item>
            </uni-list>
        </view>
    </view>
  </template>
  
  <script>
  import ExchangeRateTop from '../../components/ForeignExchangeComponents/ExchangeRateTop.vue';
  import { getDate, dateFormat, getMaxMinInArr } from '@/uilts/formatData';
  import { postApi } from '@/server/http';

  export default {
    components: {
        ExchangeRateTop
    },

    data() {
      return {
        detailDate: '',
        closingMarkFlag: true,
        lang: uni.getStorageSync('lang'),
        currencyData: {},
        chartsdata: [],
        chartsdataMin: 0,
        chartsdataMax: 20,
        cWidth: 750,
        cHeight: 500,
        pixelRatio: 2,
        background:"#2C3138",
        pageTopFlag: 'foreignExchangeDetail',
        exchangeRateData: [
            {
              name: "",
              data: ""
            },
            {
              name: "",
              data: ""
            },
            {
              name: "",
              data: ""
            },
            {
              name: "",
              data: ""
            },
            {
              name: "",
              data: ""
            },
            {
              name: "",
              data: ""
            },
        ],
        chartData: {},
        opts: {
            rotate: false,
            rotateLock: false,
            color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
            padding: [15,15,0,15],
            dataLabel: false,
            enableScroll: true,
            enableMarkLine: true,
            legend: {
                show: true,
            },
            xAxis: {
                labelCount: 6,
                itemCount: 30,
                disableGrid: true,
                gridColor: "#CCCCCC",
                gridType: "solid",
                dashLength: 4,
                scrollShow: false,
                scrollAlign: "left",
                scrollColor: "#A6A6A6",
                scrollBackgroundColor: "#EFEBEF"
            },
            yAxis: {
                disabled: false,
                disableGrid: false,
                splitNumber: 5,
                gridType: "solid",
                dashLength: 8,
                gridColor: "#CCCCCC",
                padding: 10,
                showTitle: false,
                data: [
                    {
                        type: "value",
                        position: "left",
                        disabled: false,
                        axisLine: true,
                        axisLineColor: "#CCCCCC",
                        calibration: false,
                        fontColor: "#666666",
                        fontSize: 13,
                        textAlign: "right",
                        title: "",
                        titleFontSize: 13,
                        titleOffsetY: 0,
                        titleOffsetX: 0,
                        titleFontColor: "#666666",
                        tofix: 4,
                        unit: "",
                        format: ""
                    }
                ]
            },
            extra: {
                candle: {
                    color: {
                        upLine: "#f04864",
                        upFill: "#f04864",
                        downLine: "#2fc25b",
                        downFill: "#2fc25b"
                    },
                    average: {
                        show: true,
                        name: [
                            "MA5",
                            "MA10",
                            "MA20"
                        ],
                        day: [
                            5,
                            10,
                            20
                        ],
                        color: [
                            "#1890ff",
                            "#2fc25b",
                            "#facc14"
                        ]
                    }
                },
                markLine: {
                    type: "dash",
                    dashLength: 5,
                    data: [
                    {
                        // value: 2150,
                        lineColor: "#f04864",
                        showLabel: true
                    },
                    {
                        // value: 2350,
                        lineColor: "#f04864",
                        showLabel: true
                    }
                    ]
                },
                tooltip: {
                    showCategory: true
                }
            }
        }
      };
    },  
    onLoad(option) {
      this.currencyData = JSON.parse(option.currencyData);
      uni.setNavigationBarTitle({
        title: this.$t('Exchange.detailTitle')
      });
    },
    async onReady() {
      this.getServerData();
      let params = {
        title: this.$t('common.apiError'),
        Loadtitle:this.$t('common.loading'),
        url: '/CLOUD-WX/weixin/getSpotRate',
        method: 'POST',
        data: {
            qryDate: dateFormat('yyyymmdd', uni.getStorageSync('market_qrydate')),
            currencyPairs: this.currencyData.currencyPairs
        }
      }
      const res = await postApi(params);
      let { data:{data} } = res;
      this.chartsdata = data;
      this.setExchangeRateData();
    },
    methods: {
      getDate,
      dateFormat,
      getMaxMinInArr,
      // 汇率详情列表数据赋值
      setExchangeRateData() {
        let currcyPairs = this.currencyData.currencyPairs; // 货币对
        let currentRate = this.chartsdata[29]; // 选择日期汇率信息
        this.closingMarkFlag = this.chartsdata[29][3] >= this.chartsdata[28][3] ? true : false;
        this.exchangeRateData = [
          {
            name: this.$t('Exchange.listName[0]'),
            data: currcyPairs,
          },
          {
            name: this.$t('Exchange.listName[1]'),
            data: currcyPairs.slice(0, 3),
          },
          {
            name: this.$t('Exchange.listName[2]'),
            data: currcyPairs.slice(4),
          },
          {
            name: this.$t('Exchange.listName[3]'),
            data: currentRate[0],
          },
          {
            name: this.$t('Exchange.listName[4]'),
            data: currentRate[1],
          },
          {
            name: this.$t('Exchange.listName[5]'),
            data: currentRate[2] + ' - ' + currentRate[3],
          }
        ]
      },
      getServerData() {
        setTimeout(() => {
            let categories = [];
            let currDate;
            if (this.detailDate === '') {
                currDate = new Date(uni.getStorageSync('market_qrydate'));
            } else {
                currDate = new Date(this.detailDate);
            }
            for (var i = 29; i >= 0; i--) {
                categories.push( dateFormat('mm/dd', getDate(currDate, -i).fullDate))
            }
            let res = {
                categories: categories,
                series: [
                    {
                    name: "汇率",
                    data: this.chartsdata
                    }
                ]
            };
            this.chartData = JSON.parse(JSON.stringify(res));
        }, 500);
      },
      
        async qryDateChange(val) {
            let qryDate = dateFormat('yyyymmdd', val);
            this.detailDate = val;
            let params = {
              title: this.$t('common.apiError'),
              Loadtitle:this.$t('common.loading'),
              url: '/CLOUD-WX/weixin/getSpotRate',
              method: 'POST',
              data: {
                  qryDate: qryDate,
                  currencyPairs: this.currencyData.currencyPairs
              }
            }
            const res = await postApi(params);
            let { data:{data} } = res;
            this.chartsdata = data;
            this.getServerData();
            this.setExchangeRateData();
        }
    }
  };
  </script>
  
  <style lang="scss">
    .container {
        display: flex;
        flex-direction: column;
        background-color: #2C3138;
        height: 100vh;

        .canvas-container {
          margin-top: 90rpx;
          height: 500rpx;
          // border-bottom: solid 2px #fff;

          ::v-deep .charts {
            width: 750rpx;
            height: 500rpx;
            background-color: rgba(44, 49, 56, 1);
          }
      }


      .detail-bottom {
        flex: 1;
        background-color: #2C3138;
        overflow: scroll;

        ::v-deep .uni-list-item  {
          background-color: #2C3138 !important;
          height: 8.9vh;

          .uni-list-item__content-title {
            color: #fff;
            // font-weight: 900;
            font-size: 1rem;
          }

        }
      }
    }

    .list {
      overflow: hidden;
      height: 100%;
      margin-top: 90rpx;
      position: fixed;
      top: -1rpx;
      z-index: 10;
      width: 100%;
    }

    .uni-list-chat {
      background-color: #2C3138 !important;
      height: 4.5rem;

      .uni-list-chat__container {
          padding: 0.7rem !important;
          height: 70%;

          ::v-deep .uni-list-chat__content-main {
              padding: 0;
          }

          .uni-list-chat__header-warp {
              display: none;
          }

          .uni-list-chat__content-title {
              color: #fff !important;
              font-size: 1rem;
            //   font-weight: 900 !important;
            
          }
          .uni-list-chat__content-note {
                font-size: 1rem;
            //   font-weight: 600 !important;
          }

          .chat-custom-right {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 100%;

              .chat-custom-text {
                  text-align: end;
                  color: #fff;
                  font-weight: 900;
              }

              .right-bottom-green {
                  color: #92ED15;
                  font-weight: 900;
              }

              .right-bottom-red {
                  color: #D9001B;
                  font-weight: 900;
              }
          }
      }
    }
    ::v-deep.uni-list--border::after{
      background-color: #545353 !important;
  }
  .detail-list-item:first-child{
    
    ::v-deep.uni-list--border::after{
     // background-color: #545353 !important;
     display: none !important;
  }
  }
  .detail-list-item:last-child{
    ::v-deep.uni-list--border::after{
     // background-color: #545353 !important;
     display: none !important;
  }
  }

  ::v-deep.uni-list--border-top{
    display: none !important;
  }
  ::v-deep.uni-border-bottom{
    display: none !important;
  }
  ::v-deep.uni-list{
    background-color: transparent !important;
  }
  ::v-deep.uni-list--border-bottom{
    display: none !important;
  }
  ::v-deep.uni-list-item__header{
    display: none !important;
  }
  ::v-deep.uni-list-item__container{
    justify-content: space-between;
  }
  </style>