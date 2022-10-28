<template>
    <div>
        <ul>
            <li v-if="list.commodityId">
                <h1 >
                    <p>
                        {{list.name}}
                        <span v-if="list.endTime">有效期至{{list.endTime}}</span>
                    </p>
                </h1>
                <div class="main">
                    <p class="mainmes">
                        <img src="https://web.moocollege.com/mooc/hzq/competition/competition/server.png" alt="">
                    </p>
                    <div class="money">
                        ￥<span> {{list.price}} </span>/年
                    </div>
                    
                    <div class="pay">
                        <!-- <div v-if="list.isPay" class="ispay">
                            <div>
                                <div class="button topay" @click="toPay(list)">续费</div>
                                <div class="button" @click="toBill(list)">申请发票</div>
                            </div>
                        </div>
                        <div v-else class="isnotpay" @click="toPay(list)">
                            立即付费
                        </div> -->
                        <div v-if="list.endTime" class="isnotpay">
                            已付费
                        </div> 
                        <div v-else class="isnotpay" @click="toPay(list)">
                            立即付费
                        </div> 
                    </div>
                </div>
            </li>
        </ul>
        <!-- <invoice-detail v-if="flag" :close="close" /> -->
        <invoice v-if="flag" :close="close"></invoice>
    </div>
</template>

<script>
import invoice from '@/components/invoice'
import invoiceDetail from '@/components/invoice/common/detail'
import network from '@/api/jxapi/index'
export default {
    data(){
        return{
            list:{},
            lists:[
                {
                    commodityId:1,
                    name:'高校服务',
                    message:'',
                    price: 49800,
                    isPay:false,
                    endTime:'2019年1月31日',
                },
                {
                    commodityId:2,
                    name:'高校服务',
                    message:'',
                    price: 49800,
                    isPay:true,
                    endTime:'2019年1月31日',
                }
            ],
            flag:false
        }
    },
    components:{
        invoice,
        invoiceDetail
    },
    async created(){
        let serverList = await network.getserversList();
        if(serverList=='error');
        this.list = serverList;
    },
    methods:{
        async toPay(list){
            let params = {
                commodityId:list.commodityId,
                payType:1,
                returnUrl:location.href,
            }
            let pay = await network.payServers({data:params});
            if(pay=='error') return;

            document.getElementsByTagName('body')[0].innerHTML = pay
            document.getElementsByTagName('form')[0].submit()

        },
        toBill(list){
            // this.flag = true
        },
        close(){
            this.flag = false
        }

    }
}
</script>

<style lang="less" scoped>
ul{  
    // column-count: 2;
    // column-gap: 10px;
    margin: 0 auto;
    padding-bottom: 20px;
}
li{
    // break-inside: avoid;
    // box-sizing: border-box;
    display: inline-block;
    width: 300px;
    background: #FFFFFF;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
    border-radius: 5px;
    // display: inline-block;
    margin: 0 25px 25px;
    h1{
        width: 100%;
        height: 84px;
        background: url('https://web.moocollege.com/mooc/hzq/competition/competition/server_bg.png') no-repeat;
        border-radius: 5px 5px 0px 0px;
        
        font-size: 18px;
        color: #FFFFFF;
        letter-spacing: 3px;
        text-align: center;
        position: relative;
        p{
            width: 100%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            span{
                display: block;
                font-size: 12px;
                color: #FFFFFF;
                letter-spacing: 1px;
                text-align: center;
            }
        }
    }
    .main{
        width: 253px;
        margin: 0 auto;
        padding: 15px 0;
        .mainmes{
            width: 100%;
            // height: 88px;
            // overflow: hidden;
            font-size: 13px;
            color: #838383;
            letter-spacing: 0.93px;
            line-height: 22px;
            margin-bottom: 12px;
            img{
                width: 160px;
                display: block;
                margin: 10px 0 20px 20px;
            }
        }

        .money{
            
            font-size: 12px;
            color: #4A4A4A;
            letter-spacing: 0.86px;
            text-align: center;
            border-top: 1px solid #dedede;
            padding: 10px 0;
            span{
                font-size: 28px;
                color: #B69C15;
                letter-spacing: 0;
            }
         
        }
        .pay{
            .isnotpay{
                width: 100%;
                height: 39px;
                line-height: 39px;
                background-image: linear-gradient(90deg, #BD9837 0%, #E3C23F 100%);
                border-radius: 5px;
                
                font-size: 14px;
                color: #FFFFFF;
                letter-spacing: 1px;
                text-align: center;
                cursor: pointer;
            }
            .ispay{
                text-align: center;
                margin-top: 18px;
                span{
                    font-size: 12px;
                    color: #9B9B9B;
                    letter-spacing: 1px;
                    margin: 3px 0 7px 0;
                }
                .button{
                    height: 39px;
                    line-height: 39px;
                    border: 1px solid #BD9837;
                    border-radius: 5px;
                    
                    font-size: 14px;
                    color: #BD9837;
                    letter-spacing: 1px;
                    width: 120px;
                    text-align: center;
                    display: inline-block;
                    cursor: pointer;
                }
                .topay{
                    background-image: linear-gradient(90deg, #BD9837 0%, #E3C23F 100%);
                    color: #FFFFFF;
                }
            }
        }

    }
}
</style>
