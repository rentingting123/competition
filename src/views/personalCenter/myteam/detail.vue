<template>
<!-- 我加入的 -->
    <el-table width="100%" :empty-text="$t('myTeam.noTeam')" :data="teams" :header-cell-style="{background:'#f3f3f3'}" class="table" border style="">
        <el-table-column type="index" align="center" :label="$t('myTeam.index')" width="60"></el-table-column>
        <el-table-column prop="groupName"  :label="$t('myTeam.groupName')"  min-width="150">
            <template slot-scope="scope">
                <p style="color: #1D86FF;cursor: pointer;" @click="skin(scope.row)">{{scope.row.groupName}}</p>
            </template>
        </el-table-column>
        <el-table-column prop="teacherName"  :label="$t('myTeam.teacherName')" ></el-table-column>
        <el-table-column prop="companyTeacherName"  :label="$t('myTeam.companyTeacherName')" ></el-table-column>
        <el-table-column prop="studentName"  :label="$t('myTeam.studentName')" ></el-table-column>
        <el-table-column prop="competitionName"  :label="$t('myTeam.competitionName')" ></el-table-column>
        <el-table-column prop="inviteCode"  :label="$t('myTeam.inviteCode')" ></el-table-column>
    </el-table>
</template>

<script>
export default {
    props:['teams'],
    methods:{
        skin(item) {
            this.$router.push({path:`/competition/team/${item.groupId}/${item.competitionId}`});
        },
    }
}
</script>

<style lang="less" scoped>
.table{
    width: 100%;
    margin: 16px 0;
    .headerrow{
        background-color: #999;
    }
}
</style>
