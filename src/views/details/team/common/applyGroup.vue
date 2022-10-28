<template>
    <ol >
        <li v-bind:key="index" v-for="(item, index) in lists">
            <img :src="item.head" v-if="item.head">
            <img v-else src="https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png">
            <div class="team_message">
                <p>{{item.name}}</p>
                <p>{{item.college}}</p>
                <p>{{item.major}} <span v-if="item.major && item.academy">·</span> {{item.academy}}</p>
                <el-button @click="pass(item, 1)" type="primary" size="mini" class="pass">
                    {{$t('teamDetail.pass')}}
                </el-button>
                <el-button @click="pass(item, 0)" size="mini" class="refuse">
                    {{$t('teamDetail.refuse')}}
                </el-button>
            </div>
        </li>
    </ol>
</template>

<script>
import jxapi from '@@/api/jxapi/index'
export default {
    props:[
        'lists',
        'groupInfo',
        'close'
    ],
    data(){
        return{

        }
    },
    methods:{
        async pass(member, status) {
            let param = {
                groupId: this.groupInfo.groupId,
                objectRoleTargetId: member.objectRoleTargetId,
                status: status
            }
            let res = await jxapi.passMember({data:param})
            if(res=='error')return 
            this.close && this.close(member)
        },
    }
}
</script>

<style lang='less' scoped>
ol{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li{
        width: 400px;
        padding: 20px 30px 25px 0;
        box-sizing: border-box;
        display: flex;
        text-align: left;
        >img{
            width: 80px;
            height: 80px;
            border-radius: 100%;
            margin-right: 25px;
        }
        .team_message{
            font-size: 14px;
            line-height: 24px;
            p:nth-child(1){
                font-size: 16px;
            }
            .pass{
                width: 76px;
            }
            button{
                margin-top: 10px;
            }
        }
    }
}
</style>