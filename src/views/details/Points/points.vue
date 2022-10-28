<template>
    <div class="competi box_shadow" @click="jump(data)">
        <div class="Ppro_img">
            <div class="banImg">
                <img  v-lazy="data.icon" alt="" class="pro_img" />
            </div>
        </div>        
        <div class="boxShadow">
            <p class="pro_info flexRowBetween">
                <span>{{data.name&&data.name.length>20?(data.name.substring(0,20)+'…'):data.name}}</span>
            </p>
             <div class="pro_area flexRowBetween" >
                <p>
                    <span v-if="data.competitionRange">{{data.competitionRange | city}}</span>
                </p>
            </div>
            <div class="pro_tag flexRowBetween" >
                <p>
                    <span v-if="data.tags">{{data.tags}}</span>
                </p>
            </div>
            <div class="imgMask">
                <p>
                    <em v-text="times"></em>
                </p>
            </div>
        </div>

    </div>
</template>
<script>
import moment from 'moment'
export default {
    props: ['data'],
    computed:{
        times(){
            let startTime = this.data.startTime && moment(this.data.startTime).format('YYYY.MM.DD') || ''
            let endTime = this.data.endTime && moment(this.data.endTime).format('YYYY.MM.DD') || ''
            if(startTime && endTime){
                return startTime + '-' + endTime
            }else if(startTime || endTime){
                return startTime + endTime
            }else{
                return ''
            }
        }
    },
    methods:{
        jump (data) {
            const isEdit = this.$route.path.indexOf('details') === -1
            if (isEdit) {
                this.$router.push(`/createNewCompetition?id=${data.id}`);
            } else if (data.childType === 2) {
                if(data.allInOneUrl.indexOf('http') == -1){
                    data.allInOneUrl = 'http://' + data.allInOneUrl
                }
                location.href = data.allInOneUrl
            } else {
                this.$router.push(`/details?id=${data.id}`);
            }
        }
    },
    filters:{
        city(val){
            if(!val) return;
            return val.split(',')[0];
        }
    }
}
</script>
<style lang="less" scoped>
    .competi{
        width: 29rem;
        // margin-left: 1rem;
        background:#fff;
        border-radius:0.3rem;
        margin-bottom:30px;
        position: relative;
        // overflow: hidden;
        cursor:pointer;
        &:hover{
            .boxShadow{
                box-shadow: 0px 0px 30px #ccc;
                // transform: scale(1.005, 1.005);
            }
            .pro_img{
                transform: scale(1.07);
                border-radius:0.3rem 0.3rem 0 0;
                
            }
        }
        .pro_img{
            width:464px;
            height: 270px;
            border-radius:0.3rem 0.3rem 0 0;
            transition: all 0.6s;
        }
        .pro_info{
            padding:0.3rem 1rem 0;
            margin-top:0.2rem;
            text-align: left;
           
           
            .orangeState{
                    background: #F5A623;
                }
                .blueState{
                    background:#fff;
                }
            span{
                font-size:16px;
                text-align:left;
                width: 300px; 
                // height: 18px;
                color: #4a4a4a;
                display: inline-block;
                overflow: hidden;
                font-weight: bold;
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;
            }
            em{
                float: right;
                border-radius: 0.1rem;
                font-size:0.6rem;
                width:3rem;
                padding:0.2rem 0.3rem;
                font-style: normal;
                text-align: center;
                border-radius: 2px;
            }
        }
        .pro_tag{
            padding:0 1rem 0;
            margin:0.2rem 0 0.6rem;
            text-align: left;
            >p{
                span{
                    border:1px solid #4A90E2;
                    border-radius:0.5rem;
                    font-size:0.5rem;
                    padding:0 0.3rem;
                    margin-right:0.3rem;
                    color: #4A90E2;
                }  
            }
            >p{
                line-height: 22px;
                height: 22px;
                em{
                    font-size:0.6rem;
                    font-style: normal;
                    // margin-left: 14rem;
                    float: right;
                    position: absolute;
                    top: 243px;
                    right: 11px;
                    color: #fff;
                }
                
            }
            >p{
                i{
                    font-style: normal;
                    position: absolute;
                    top: 243px;
                    left: 15px;
                    font-size: 14px;
                    color: #fff;
                }
            }
        }
        .pro_area{
            padding:0 1rem 0;
            text-align: left;
            font-size: 0.7rem;
            color:#4a4a4a;
        }
    }

    .imgMask{
        width: 100%;
        height: 42px;
        position: absolute;
        top: 228px;
        background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(22,22,22,0.60) 100%);
        // bottom: 0;
        p{
            font-style: normal;
            height: 20px;
            width: 100%;
            padding: 15px 0 7px;
            color: #fff;
            font-size: 14px;
            i{
                float: left;
                padding-left: 16px;
            }
            em{
                font-style: normal;
                float: right;
                padding-right: 11px;
            }
        }

    }
    .boxShadow{
        padding:0.3rem 0 0.1rem; 
        box-shadow: 0px 0px 7px #ccc;
        margin-top: -4px;
    }
    .banImg{
        width: 464px;
        height: 270px;
        overflow: hidden;
    }
    .Ppro_img{
        border-radius: 0.3rem;overflow:hidden;
    }

</style>
