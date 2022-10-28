<template>
    <div id="bookHotel">
        <div class="book_hotel">
            <div class="booked" v-if="edit">
                <p class="title">酒店预定</p>
                <div class="main">
                    <div class="main_content">
                        <ul class="hotel_msg">
                            <li>
                                <span>酒店</span>
                                <em>{{bookHotel.name}}</em>
                            </li>
                            <li>
                                <span>联系电话</span>
                                <em>{{bookHotel.contract_number}}</em>
                            </li>
                            <li>
                                <span>酒店地址</span>
                                <em>{{bookHotel.hotelAddress}}</em>
                            </li>
                            <li>
                                <span>备注</span>
                                <em>{{bookHotel.memo}}</em>
                            </li>
                        </ul>
                        <div class="book_date">
                            <div class="start_date">
                                <p>入店日期</p>
                                <p>
                                    <span>{{start}}</span>
                                </p>
                            </div>
                            <div class="book_nights">
                                <em>—</em>
                                <span>
                                    {{nights}}晚
                                </span>
                                <em>—</em>
                            </div>
                            <div class="end_date">
                                <p>离店日期</p>
                                <p>
                                    <span>{{end}}</span>
                                </p>
                            </div>
                        </div>
                        <ul class="book_room">
                            <li class="book_room_title flexRowBetween">
                                <span>房型</span>
                                <span>床数/间</span>
                                <span>价格/晚</span>
                                <span>预定房间数</span>
                            </li>
                            <li v-for="(booked,index) in bookHotel.rooms" class="flexRowBetween rooms">
                                <span>{{booked.room_name}}</span>
                                <span style="margin-left: 1rem;">{{booked.room_max}}床</span>
                                <span>￥{{booked.price}}</span>
                                <span>{{booked.bed_number}}</span>
                            </li>
                        </ul>
                        <div class="total_money">
                            <p class="total">总价：</p>
                            <p class="tip">温馨提示:此处显示总价只作为参考，实际支付将在离店时进行结算</p>
                            <span>￥<em>{{total}}</em></span>
                        </div>
                        <p style="margin-top:2rem;">
                            <el-button type="primary" @click="editFun">修改</el-button>
                        </p>
                    </div>
                </div>
            </div> 
            <div class="book" v-else>
                <p class="title">酒店预定</p>
                <div class="main">
                    <div class="main_content">
                        <ul class="hotel_msg">
                            <li>
                                <span>酒店</span>
                                <el-select  v-model="selHotel.name" @change="hotelChange(selHotel.name)">
                                    <el-option
                                        v-for="(hotel,index) in HotelList"
                                        :key="index"
                                        :label="hotel.name"
                                        :value="hotel.name"  
                                    >
                                    </el-option>
                                </el-select>
                            </li>
                            <li>
                                <span>联系电话</span>
                                <em>{{selHotel.contract_number}}</em>
                            </li>
                            <li>
                                <span>酒店地址</span>
                                <em>{{selHotel.address}}</em>
                            </li>
                            <li>
                                <span>备注</span>
                                <em>{{selHotel.memo}}</em>
                            </li>
                        </ul>
                        <div class="book_date">
                            <div class="sel_date">
                                <div class="start_date">
                                    <p>入店日期</p>
                                    <p>
                                        <el-date-picker
                                            v-model="start"
                                            type="date"
                                            :picker-options="pickerOptions1"
                                            @change="handleChange"
                                            :clearable="false"
                                            placeholder="请选择日期">
                                        </el-date-picker>
                                    </p>
                                </div>
                                <div class="book_nights">
                                    <em>—</em>
                                    <span>
                                        {{nights}}晚
                                    </span>
                                    <em>—</em>
                                </div>
                                <div class="end_date">
                                    <p>离店日期</p>
                                    <p>
                                        <el-date-picker
                                            v-model="end"
                                            type="date"
                                            :picker-options="pickerOptions2"
                                            :clearable="false"
                                            @change="handleChange"
                                            placeholder="请选择日期">
                                        </el-date-picker>
                                    </p>
                                </div>
                            </div>
                            <p class="date_tip">
                                本平台暂不支持多个日期预定酒店<br/>
                                若多个成员入驻时间不同，请自行协商分开预定
                            </p>
                        </div>
                        <ul class="book_room">
                            <li class="book_room_title flexRowBetween">
                                <span>房型</span>
                                <span>床数/间</span>
                                <span>价格/晚</span>
                                <span>预定房间数</span>
                            </li>
                            <li v-for="(sel,index) in roomList" class="flexRowBetween rooms">
                                <span>{{sel.room_name}}</span>
                                <span style="margin-left: 1rem;">{{sel.room_max}}床</span>
                                <span>￥{{sel.price}}</span>
                                <el-input-number :disabled="!end"  v-model="sel.bed_number" :min="0" 
                                                 label="预定房间数" @change="totalFun"></el-input-number>
                            </li>
                        </ul>
                        <div class="total_money">
                            <p class="total">总价：</p>
                            <p class="tip">温馨提示:此处显示总价只作为参考，实际支付将在离店时进行结算</p>
                            <span>￥<em>{{total}}</em></span>
                        </div>
                        <p style="margin-top:2rem;">
                            <el-button type="primary" class="submit" @click="submit()">提交</el-button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { Message } from 'element-ui';
    import Vue from 'vue';
    import Element from 'element-ui';
    import network from '@@/api/jxapi'
    Vue.use(Element, { size: 'small', zIndex: 3000 });
    export default {
        data() {
            return{
                id: '',
                edit: false, // 修改 true  预订  false
                compety: '', // 当前竞赛
                bookHotel: {
                        name:"如家酒店",     
                        contract_number:"15179140060",  
                        hotelAddress:"杭州",
                        memo:"地理位置好",
                        rooms:[
                            {
                                room_name:"大床房",
                                room_max:"1",
                                price:"100",
                                bed_number:"1",
                            },
                            {
                                room_name:"双人标间",
                                room_max:"2",
                                price:"100",
                                bed_number:"1",
                            },
                        ]


                }, // 已预约的酒店信息
                selHotel: {
                    "contract_number":"15179140060",
                    "address":"杭州市",
                    "memo":"323",
                    "name":"如家酒店"
                }, // 所选的酒店
                HotelList: [
                    {
                        "name":"如家酒店",
                        "value":"1",
                        "contract_number":"",
                        "address":"",
                        "memo":"",
                        "rooms":[
                                    {
                                        "room_name":"大床房",
                                        "room_max":"房间最大数",
                                        "bed_number":"床数",
                                        "price":"100"
                                    },
                                ]
                    },
                    {
                        "name":"7天快捷酒店",
                        "value":"2",
                        "contract_number":"",
                        "address":"",
                        "memo":"" ,
                        "rooms":[
                                    {
                                        "room_name":"大床房",
                                        "room_max":"房间最大数",
                                        "bed_number":"床数",
                                        "price":"100"
                                    },
                                ]     
                    }
                ],   //酒店列表
                selHotelName: '', // 所选的酒店名称
                start: new Date(), // 开始日期
                end: '', // 结束日期
                nights: 0, // 住店天数
                total: 0, // 总价

                //酒店房间列表
                roomList: [
                    {
                        "room_name":"大床房",
                        "room_max":"1",
                        "price":"100",
                        "bed_number":"0"
                    },
                    {
                        "room_name":"双人标间",
                        "room_max":"2",
                        "price":"150",
                        "bed_number":"0"
                    },
                ],    
                // 开始日期
                pickerOptions1: {
                    disabledDate: (time) => {
                        if (this.end != '') {
                            return time.getTime() > new Date(this.end).getTime() || time.getTime() < Date.now()
                        } else {
                            if (time.getTime() < Date.now()) {
                                return true
                            } else {
                                return false
                            }
                        }
                    }
                },
                // 结束日期
                pickerOptions2: {
                    disabledDate: (time) => {
                        if (this.start != '') {
                            return time.getTime() < new Date(this.start).getTime() || time.getTime() < Date.now()
                        } else {
                            if (time.getTime() < Date.now()) {
                                return true
                            } else {
                                return false
                            }
                        }
                    }
                }
            }
        },
        created(){
            this.getID()
        }, 
         
        methods:{
                /**
                 * 判断是否预订酒店
                 */
                getID(){
                    this.edit = sessionStorage.getItem('edit');
                    this.id = sessionStorage.getItem('id');
                    this.edit == false ? this.getHotel() : this.getOrderHotel();
                },
                /**
                 * 获取未预定酒店信息
                 * 
                 */
                async getHotel(){
                    const obj={
                        competitionId : this.id,
                    };
                    const res = await network.getHotelApi({competitionId:this.id}); 
                    if(res=='error') return;
                    const tem = res;
                    this.HotelList = tem.hotelInfo;
                    console.log(this.HotelList,"999")

                },
                /**
                 * 获取已预定酒店信息
                 * 
                 */
                async getOrderHotel(){
                    const obj={
                        competitionId : this.id,
                    };
                    const res = await network.getOrderHotel({data:obj});
                    // console.log(res,"999")
                    const tem = res;
                    this.bookHotel.name = tem.name;
                    this.bookHotel.contract_number = tem.contract_number;
                    this.bookHotel.address = tem.address;
                    this.bookHotel.memo = tem.memo;
                    this.bookHotel.rooms = tem.rooms;
                    this.start = tem.checkinTime;
                    this.end = tem.checkoutTime;
                    this.handleChange();
                },
                /**
                 * 预定房间数变化、入住天数变化
                 */
                handleChange() {
                    var minutes=1000*60;
                    var hours=minutes*60;
                    var days=hours*24;
                    var a = new Date(this.end).getTime() - new Date(this.start).getTime();
                    this.nights =  Math.ceil(a/days) ;
                    this.havetotalFun()
                },
                
                /**
                 * 酒店更改
                 */
                hotelChange(index){
                   // alert(index)
                },
                /**
                 * 已预约酒店计算总价
                 */
                havetotalFun(){
                    let total = 0
                    const tem = this.bookHotel.rooms;
                    for (let i in tem) {
                        total += tem[i].price * tem[i].bed_number
                    }
                    this.total = total * this.nights;
                },
                /**
                 * 计算总价格
                 */
                totalFun() {
                    let total = 0
                    for (let i in this.roomList) {
                        total += this.roomList[i].price * this.roomList[i].bed_number
                    }
                    this.total = total * this.nights       
                },

                /**
                 * 提交
                 */
                submit() {
                    console.log("提交");
                },

                /**
                 * 修复酒店
                 */
                editFun() {
                    this.edit = false;
                    this.getHotel();
                    console.log("修改预订酒店");
                }
        }
    }
</script>
<style lang="less" scoped>
    .book_hotel {
        width: 1040px;
        margin: 0 auto;
        font-size: 0.7rem;
        .booked {
            width: 100%;
            .title {
                font-size: 0.8rem;
                letter-spacing: 1px;
                text-align: left;
                margin-top: 2rem;
                margin-bottom: 1rem;
                font-weight: bold;
                padding-left: 1rem;
            }
            .main {
                background: #fff;
                width: 100%;
                .main_content {
                    width: 674px;
                    margin: 0 auto;
                    padding-top: 3rem;
                    padding-bottom: 5rem;
                    .hotel_msg {
                        margin-bottom: 2rem;
                        li {
                            text-align: left;
                            margin-bottom: 1rem;
                            > span {
                                display: inline-block;
                                width: 16%;
                                margin-right: 2rem;
                                
                                font-size: 14px;
                                color: #4A4A4A;
                                letter-spacing: 1px;
                                text-align: right;
                            }
                            em {
                                display: inline-block;
                                text-align: left;
                                font-style: normal;
                                
                                font-size: 14px;
                                color: #4A4A4A;
                                letter-spacing: 1px;
                            }
                            /deep/ .el-select{
                                width: 430px;
                            }
                        }
                    }
                    .book_date {
                        background: #FBFBFB;
                        border-radius: 5px;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-around;
                        padding: 1.5rem 3rem;
                        .start_date {
                            flex: 1;
                            text-align: left;
                            
                            font-size: 14px;
                            color: #4A4A4A;
                            letter-spacing: 1px;
                            p:last-child {
                                margin-top: 0.5rem;
                                border: 1px solid #DEDEDE;
                                border-radius: 2px;
                                padding: 0.5rem 1rem;
                            }
                        }
                        .book_nights {
                            width: 8rem;
                            margin-top: 1.5rem;
                            color: #1D86FF;
                            letter-spacing: 1px;
                            span {
                                margin: 0 1rem;
                            }
                        }
                        .end_date {
                            flex: 1;
                            text-align: left;
                            
                            font-size: 14px;
                            color: #4A4A4A;
                            letter-spacing: 1px;
                            p:last-child {
                                margin-top: 0.5rem;
                                border: 1px solid #DEDEDE;
                                border-radius: 2px;
                                padding: 0.5rem 1rem;
                            }
                        }
                    }
                    .book_room {
                        margin-top: 2rem;
                        .book_room_title {
                            border-bottom: 1px solid #DEDEDE;
                            padding-bottom: 0.5rem;
                            
                            font-size: 14px;
                            color: #4A4A4A;
                            letter-spacing: 1px;
                            text-align: right;
                            span{
                                
                                font-size: 14px;
                                color: #4A4A4A;
                                letter-spacing: 1px;
                            }
                            span:nth-child(1){
                                margin-right: 5rem;
                                margin-left: -2rem;
                            }
                            span:nth-child(2){
                                margin-left: 1rem;
                            }
                            span:nth-child(4){
                                margin-right: 5rem;
                            }
                        }
                        .rooms {
                            line-height: 3.5rem;
                            height: 3.5rem;
                        }
                        li {
                            span{
                                width: 20%;
                                margin:0 4rem;
                                
                                font-size: 14px;
                                color: #4A4A4A;
                                letter-spacing: 1px;
                                margin-left: 0px;
                                width: 5rem;
                            }
                            span:nth-child(1) {
                                width: 6rem;
                                float: left;
                            }
                            span:nth-child(2) {
                                flex: 1;
                                float: left;
                            }
                            span:nth-child(3) {
                                flex: 1;
                                float: left;
                            }
                            span:nth-child(4) {
                                width: 6rem;
                            }
                        }
                    }
                    .total_money {
                        background: #F6F6F6;
                        border-radius: 5px;
                        padding: 1.5rem 2rem;
                        position: relative;
                        text-align: left;
                        margin-top: 0.5rem;
                        .total {
                            font-size: 0.8rem;
                            color: #9B9B9B;
                            letter-spacing: 1px;
                            font-weight: bold;
                            margin-bottom: 0.5rem;
                        }
                        .tip {
                            font-size: 0.7rem;
                            letter-spacing: 0.86px;
                        }
                        span {
                            position: absolute;
                            right: 1.5rem;
                            top: 50%;
                            margin-top: -0.6rem;
                            font-size: 1.2rem;
                            color: #F5A623;
                            letter-spacing: 1.71px;
                            em{
                                font-style: normal;
                            }
                        }
                    }
                }
            }
        }
        .book {
            width: 100%;
            .title {
                font-size: 0.8rem;
                letter-spacing: 1px;
                text-align: left;
                margin-top: 2rem;
                margin-bottom: 1rem;
                font-weight: bold;
                padding-left: 1rem;
            }
            .main {
                background: #fff;
                width: 100%;
                .main_content {
                    width: 674px;
                    margin: 0 auto;
                    padding-top: 3rem;
                    padding-bottom: 5rem;
                    .hotel_msg {
                        margin-bottom: 2rem;
                        li {
                            text-align: left;
                            margin-bottom: 1rem;
                            > span {
                                display: inline-block;
                                width: 16%;
                                margin-right: 2rem;
                                
                                font-size: 14px;
                                color: #4A4A4A;
                                letter-spacing: 1px;
                                text-align: right;
                            }
                            em {
                                display: inline-block;
                                text-align: left;
                                font-style: normal;
                                
                                font-size: 14px;
                                color: #4A4A4A;
                                letter-spacing: 1px;
                            }
                            /deep/ .el-select{
                                width: 430px;
                            }
                        }
                    }
                    .book_date {
                        background: #FBFBFB;
                        border-radius: 5px;
                        padding: 1.5rem 3rem;
                        .sel_date {
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            justify-content: space-around;
                            .start_date {
                                flex: 1;
                                text-align: left;
                                
                                font-size: 14px;
                                color: #4A4A4A;
                                letter-spacing: 1px;
                                p:last-child {
                                    margin-top: 0.5rem;
                                }
                            }
                            .book_nights {
                                width: 10rem;
                                margin-top: 1.5rem;
                                color: #1D86FF;
                                letter-spacing: 1px;
                                span {
                                    margin: 0 1rem;
                                    
                                    font-size: 14px;
                                    color: #1D86FF;
                                    letter-spacing: 1px;
                                }
                                :first-child{
                                    margin-left: -4rem;
                                }
                            }
                            .end_date {
                                flex: 1;
                                text-align: left;
                                
                                font-size: 14px;
                                color: #4A4A4A;
                                letter-spacing: 1px;
                                p:last-child {
                                    margin-top: 0.5rem;
                                }
                            }
                            .el-input {
                                width: 9rem;
                            }
                        }
                        .date_tip {
                            margin-top: 1rem;
                            line-height: 1rem;
                            text-align: left;
                            color: #9B9B9B;
                            letter-spacing: 0.86px;
                            
                            font-size: 12px;


                        }
                    }
                    .book_room {
                        margin-top: 2rem;
                        .book_room_title {
                            border-bottom: 1px solid #DEDEDE;
                            padding-bottom: 0.5rem;
                            
                            font-size: 14px;
                            color: #4A4A4A;
                            letter-spacing: 1px;
                            text-align: right;
                            span{
                                
                            }
                            span:nth-child(1){
                                margin-right: 5rem;
                                margin-left: -1rem;
                            }
                            span:nth-child(4){
                                margin-right: 5rem;
                            }
                        }
                        .rooms {
                            line-height: 3.5rem;
                            height: 3.5rem;
                        }
                        li {
                            span{
                                width: 20%;
                                margin:0 4rem;
                                
                                font-size: 14px;
                                color: #4A4A4A;
                                letter-spacing: 1px;
                                margin-left: 0px;
                                width: 5rem;
                                
                            }
                            > span:nth-child(1) {
                                flex: 1;
                                float: left;
                            }
                            > span:nth-child(2) {
                                flex: 1;
                                float: left;
                            }
                            > span:nth-child(3) {
                                flex: 1;
                                float: left;
                            }
                            > span:nth-child(4) {
                                width: 8rem;
                            }
                            .el-input-number {
                                width: 8rem;
                            }
                        }
                    }
                    .total_money {
                        background: #F6F6F6;
                        border-radius: 5px;
                        padding: 1.5rem 2rem;
                        position: relative;
                        text-align: left;
                        margin-top: 0.5rem;
                        .total {
                            font-size: 0.8rem;
                            color: #9B9B9B;
                            letter-spacing: 1px;
                            font-weight: bold;
                            margin-bottom: 0.5rem;
                        }
                        .tip {
                            font-size: 0.7rem;
                            letter-spacing: 0.86px;
                        }
                        span {
                            position: absolute;
                            right: 1.5rem;
                            top: 50%;
                            margin-top: -0.6rem;
                            font-size: 1.2rem;
                            color: #F5A623;
                            letter-spacing: 1.71px;
                            em{
                                font-style: normal;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
