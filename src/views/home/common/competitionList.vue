<template>
    <div class="competitionList">
        <div class="numbers">
            <div>
                <p class="first">
                    <span v-if="numbers.school==0" class="num">0</span>
                    <animate-number 
                        v-else
                        from="0" 
                        :to="numbers.school" 
                        duration="1000"
                        mode="manual"
                        easing="easeOutQuad"
                        class="num"
                        ref="school"
                        :formatter='formatter'
                    ></animate-number>
                    
                    <span><i v-if="numbers.schoolShow">万</i>{{$t('newHome.schoolMess')}}</span>
                </p>
                <p class="last">{{$t('newHome.schoolNum')}}</p>
            </div>
            <div>
                <p class="first">
                    <span v-if="numbers.competition==0" class="num">0</span>
                    <animate-number 
                        v-else
                        from="0" 
                        :to="numbers.competition" 
                        duration="1000"
                        mode="manual"
                        easing="easeOutQuad"
                        class="num"
                        ref="competition"
                        :formatter='formatter'
                    ></animate-number>
                    
                    <span><i v-if="numbers.competitionShow">万</i>{{$t('newHome.competitionMess')}}</span>
                </p>
                <p class="last">{{$t('newHome.competitionNum')}}</p>
            </div>
            <div>
                <p class="first">
                    <span v-if="numbers.person==0" class="num">0</span>
                    <animate-number 
                        v-else
                        from="0" 
                        :to="numbers.person" 
                        duration="1000"
                        mode="manual"
                        easing="easeOutQuad"
                        class="num"
                        ref="person"
                        :formatter='formatter'
                    ></animate-number>
                    
                    <span><i v-if="numbers.personShow">万</i>{{$t('newHome.personMess')}}</span>
                </p>
                <p class="last">{{$t('newHome.personNum')}}</p>
            </div>
            <div>
                <p class="first">
                    <span v-if="numbers.works==0" class="num">0</span>
                    <animate-number 
                        v-else
                        from="0" 
                        :to="numbers.works" 
                        duration="1000"
                        mode="manual"
                        easing="easeOutQuad"
                        class="num"
                        ref="works"
                        :formatter='formatter'
                    ></animate-number>
                    
                    <span><i v-if="numbers.worksShow">万</i>{{$t('newHome.worksMess')}}</span>
                </p>
                <p class="last">{{$t('newHome.worksNum')}}</p>
            </div>
            <div>
                <p class="first">
                    <span v-if="numbers.teams==0" class="num">0</span>
                    <animate-number 
                        v-else
                        from="0" 
                        :to="numbers.teams" 
                        duration="1000"
                        mode="manual"
                        easing="easeOutQuad"
                        class="num"
                        ref="teams"
                        :formatter='formatter'
                    ></animate-number>
                    
                    <span><i v-if="numbers.teamsShow">万</i>{{$t('newHome.teamsMess')}}</span>
                </p>
                <p class="last">{{$t('newHome.teamsNum')}}</p>
            </div>
        </div>
        <div class="competitions">
            <ul>
                <li v-for="item in competitionList" :key="item.id">
                    <competition :obj='item'/>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import network from "@@/api/jxapi";
import competition from '@@/views/personalCenter/adminPlatformConfig/common/competitions/detail'
export default {
    props: ['competitionList', 'numbers1'],
    components:{competition},
    data(){
        return{
            numbers: {
                school: 0,
                person: 0,
                competition: 0,
                teams: 0,
                works: 0,
            },
        }
    },
    created(){
        // this.init()
    },
    methods:{
        async init(){
            let res = await network.getNumbers()
            if(res=='error') return;
            this.numbers = res || {}
            this.numbers.school = this.getNum(this.numbers.school, 'school')
            this.numbers.person = this.getNum(this.numbers.person, 'person')
            this.numbers.competition = this.getNum(this.numbers.competition, 'competition')
            this.numbers.teams = this.getNum(this.numbers.teams, 'teams')
            this.numbers.works = this.getNum(this.numbers.works, 'works')

            this.$nextTick(()=>{
                this.$refs.school.start()
                this.$refs.person.start()
                this.$refs.competition.start()
                this.$refs.teams.start()
                this.$refs.works.start()
            })
        },
        getNum(num, name){
            let index = 100000
            num = parseFloat(num)
            if(num>index){
                this.numbers[name+'Show'] = true
                return parseFloat((num / index).toFixed(2))
            }else{
                this.numbers[name+'Show'] = false
                return num
            }
        },
        formatter(val){
            if(val==parseInt(val)){
                return val
            }else{
                return val.toFixed(2)
            }
        }
    }
}
</script>

<style lang='less' scoped>
.competitionList{
    width: 100%;
    .numbers{
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        div{
            width: auto;
            .first{
                text-align: left;
                span{
                    font-size: 16px;
                    height: 16px;
                    font-weight: 400;
                    color: #6283FF;
                    line-height: 24px;
                    letter-spacing: 1px;
                }
                .num{
                    font-size: 40px;
                    font-weight: bold;
                    color: #526DFE;
                    line-height: 52px;
                }
            }
            .last{
                font-size: 16px;
                font-weight: 400;
                color: rgba(74, 74, 74, 0.6);
                line-height: 24px;
                letter-spacing: 1px;
                text-align: left;
            }
        }
    }
    .competitions{
        width: 1200px;
        margin: 20px auto 0;
        ul{
            text-align: left;
            li{
                display: inline-block;
                vertical-align: top;
                margin-right: 28px;
                margin-bottom: 20px;
                &:nth-child(3n){
                    margin-right: 0;
                }
            }
        }
    }

}
</style>