<template>
<div class="disclaimer">
<el-button type="text" @click="centerDialogVisible = true">《免责声明》</el-button>

<el-dialog
  title="欢迎您来到竞赛平台 cc.moocollege.com"
  :close-on-click-modal= false
  :visible.sync="centerDialogVisible"
  width="850px"
  center>
<div>
        <p style="background-color:#ffffff; line-height:25pt; margin:0pt"><span
                style="background-color:#ffffff;  font-size:10.5pt">欢迎您来到竞赛平台</span><span
                style="background-color:#ffffff;  font-size:10.5pt"> cc.moocollege.com</span><span
                style="background-color:#ffffff;  font-size:10.5pt">。</span></p>
        <p style="background-color:#ffffff; line-height:25pt; margin:0pt"><span
                style="background-color:#ffffff;  font-size:10.5pt">竞赛平台是由杭州简学科技有限公司（下称“简学科技”）提供的互联网产品服务。本用户协议是您与简学科技之间关于您（“您”或“用户”）访问和使用竞赛平台以及简学科技提供的其他产品服务的主要协议。</span>
        </p>
        <p style="background-color:#ffffff; line-height:25pt; margin:0pt"><span
                style="background-color:#ffffff;  font-size:10.5pt">您注册、登录竞赛平台或使用简学科技提供的产品服务，即表示您同意接受用户协议。因此，敬请仔细阅读。如果您对本协议的任何条款表示异议，您可以选择不进入竞赛平台。当</span><span
                style="background-color:#ffffff;  font-size:10.5pt">您注册</span><span
                style="background-color:#ffffff;  font-size:10.5pt">成功，无论是否进入竞赛平台，还是在竞赛平台发布任何内容（即「内容」），或者是直接或通过各类方式（如站外</span><span
                style="background-color:#ffffff;  font-size:10.5pt">API</span><span
                style="background-color:#ffffff;  font-size:10.5pt">引用等）间接使用竞赛平台的产品服务及数据的行为，都将被视作已无条件接受本声明所涉全部内容。</span>
        </p>
        <p style="background-color:#ffffff; line-height:25pt; margin:0pt"><span
                style=" font-size:10.5pt">&#xa0;</span></p>
        <h4 style="background-color:#ffffff; line-height:25pt; margin:0pt"><span
                style="background-color:#ffffff; color:#333333;  font-size:15pt; font-weight:bold">使用规则</span>
        </h4>
        <ol type="1" style="margin:0pt; padding-left:0pt">
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.31pt; text-indent:0pt">
                <span
                    style="background-color:#ffffff;  font-size:10.5pt">用户注册成功后，竞赛平台将给予每个用户一个用户</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">帐号</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">及相应的密码，该用户</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">帐号</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">和密码由用户负责保管；用户应当对以其用户</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">帐号</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">进行的所有活动和事件</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">负法律责任。</span></li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.31pt; text-indent:0pt">
                <span
                    style="background-color:#ffffff;  font-size:10.5pt">用户须对在竞赛平台的注册信息的真实性、合法性、有效性承担全部责任，用户不得冒充他人；不得利用他人的名义发布任何信息；不得恶意使用注册</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">帐号</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">导致其他用户误认；否则竞赛平台有权立即停止提供服务，收回其</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">帐号</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">并由用户独自承担由此而产生的一切法律责任。</span>
            </li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.31pt; text-indent:0pt">
                <span style="background-color:#ffffff;  font-size:10.5pt">用户直接或通过各类方式（如</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">RSS</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">源和站外</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">API</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">引用等）间接使用竞赛平台服务和数据的行为，都将被视作已无条件接受本协议全部内容；若用户对本协议的任何条款存在异议，请停止使用竞赛平台所提供的全部服务。</span>
            </li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.31pt; text-indent:0pt">
                <span
                    style="background-color:#ffffff;  font-size:10.5pt">竞赛平台是聚合竞赛人才和竞赛问题的在线平台，用户通过竞赛平</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">台发表的信息为公开的信息，包括简学科技与其他第三方在内的主体均可以通过竞赛平台获取及使用用户发表的信息，用户对任何信息的发表即认可该信息为公开的信息，并单独对此行为承担法律责任；任何用户不愿被</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">其他第三</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">人获知与使用的信息都不应该在竞赛平台上进行发表。</span>
            </li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.31pt; text-indent:0pt">
                <span
                    style="background-color:#ffffff;  font-size:10.5pt">用户承诺不得以任何方式利用竞赛平台直接或间接从事违反中国法律以及社会公德的行为，竞赛平台有权对违反上述承诺的内容予以删除。</span>
            </li>
        </ol>
        <h5 style="background-color:#ffffff; line-height:25pt; margin:0pt 0pt 0pt 21pt; text-indent:-21pt"><span
                style=" font-size:10.5pt; font-weight:bold">6.</span><span
                style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; </span><span
                style="background-color:#ffffff; color:#333333;  font-size:10.5pt; font-weight:bold">用户不得利用竞赛平台</span><span
                style="background-color:#ffffff; color:#333333;  font-size:10.5pt; font-weight:bold">
            </span><span
                style="background-color:#ffffff; color:#333333;  font-size:10.5pt; font-weight:bold">服务制作、上载、复制、发布、传播或者转载如下内容：</span>
        </h5>
        <p style="line-height:25pt; margin:0pt 0pt 0pt 21.5pt; text-indent:-21pt"><span
                style=" font-size:10.5pt">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;1)</span><span
                style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;
            </span><span style="background-color:#ffffff;  font-size:10.5pt">反对宪法所确定的基本原则的；</span></p>
        <p style="line-height:25pt; margin:0pt 0pt 0pt 21.5pt; text-indent:-21pt"><span
                style=" font-size:10.5pt">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;2)</span><span
                style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;
            </span><span
                style="background-color:#ffffff;  font-size:10.5pt">危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</span>
        </p>
        <p style="line-height:25pt; margin:0pt 0pt 0pt 21.5pt; text-indent:-21pt"><span
                style=" font-size:10.5pt">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;3)</span><span
                style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;
            </span><span style="background-color:#ffffff;  font-size:10.5pt">损害国家荣誉和利益的；</span></p>
        <p style="line-height:25pt; margin:0pt 0pt 0pt 21.5pt; text-indent:-21pt"><span
                style=" font-size:10.5pt">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;4)</span><span
                style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;
            </span><span
                style="background-color:#ffffff;  font-size:10.5pt">煽动民族仇恨、民族歧视，破坏民族团结的；</span></p>
        <p style="line-height:25pt; margin:0pt 0pt 0pt 21.5pt; text-indent:-21pt"><span
                style=" font-size:10.5pt">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;5)</span><span
                style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;
            </span><span
                style="background-color:#ffffff;  font-size:10.5pt">破坏国家宗教政策，宣扬邪教和封建迷信的；</span></p>
        <p style="line-height:25pt; margin:0pt 0pt 0pt 21.5pt; text-indent:-21pt"><span
                style=" font-size:10.5pt">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;6)</span><span
                style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;
            </span><span
                style="background-color:#ffffff;  font-size:10.5pt">散布谣言，扰乱社会秩序，破坏社会稳定的；</span></p>
        <p style="line-height:25pt; margin:0pt 0pt 0pt 21.5pt; text-indent:-21pt"><span
                style=" font-size:10.5pt">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;7)</span><span
                style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;
            </span><span
                style="background-color:#ffffff;  font-size:10.5pt">散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</span>
        </p>
        <p style="line-height:25pt; margin:0pt 0pt 0pt 21.5pt; text-indent:-21pt"><span
                style=" font-size:10.5pt">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;8)</span><span
                style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;
            </span><span style="background-color:#ffffff;  font-size:10.5pt">侮辱或者诽谤他人，侵害他人合法权益的；</span>
        </p>
        <p style="line-height:25pt; margin:0pt 0pt 0pt 21.5pt; text-indent:-21pt"><span
                style=" font-size:10.5pt">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;9)</span><span
                style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;
            </span><span
                style="background-color:#ffffff;  font-size:10.5pt">含有法律、行政法规禁止的其他内容的信息。</span></p>
        <ol start="7" type="1" style="margin:0pt; padding-left:0pt">
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.31pt; text-indent:0pt">
                <span style="background-color:#ffffff;  font-size:10.5pt">用</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">户不得利用竞赛平台发送和存储任何违反法律法规的信息（文件），不得发送和储存任何带有病毒、蠕虫、木马和其他有害的计算机代码、文件、脚本和程序。</span>
            </li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.31pt; text-indent:0pt">
                <span style="background-color:#ffffff;  font-size:10.5pt">未经</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">简学科技</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">许可，用户不得将竞赛平台服务或者部分用于商业用途，包括但不仅限于转让、出售等等。</span>
            </li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.31pt; text-indent:0pt">
                <span style="background-color:#ffffff;  font-size:10.5pt">简学科技</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">保留并有权在任何时候不经通知通过为您提供平台产品服务替换、修改、升级版本的权利以及为替换、修改或升级收取费用的权利。</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">简学科技</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">保留因业务发展需要，单方面对产品服务的部分功能效果进行改变或进行限制，所有用户需承担此风险。</span>
            </li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 19.84pt; padding-left:1.16pt; text-indent:0pt">
                <span style="background-color:#ffffff;  font-size:10.5pt">简学科技</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">有权在产品服务中或经过服务投放各种广告和宣传信息，如产生相关收益均由</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">简学科技</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">单独享有，所有用户对此已充分理解并完全同意。</span>
            </li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 19.84pt; padding-left:1.16pt; text-indent:0pt">
                <span style="background-color:#ffffff;  font-size:10.5pt">简学科技</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">有权对用户使用竞赛平台情况进行审查和监督，如用户在使用竞赛平台时违反任何上述规定，</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">简学科技</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">或其授权的人有权要求用户改正或直接采取一切必要的措施（包括但不限于更改或删除用户张贴的内容、暂停或终止用户使用竞赛平台的权利）以减轻用户不当行为造成的影响，因用户对上述该等行为的违反，导致</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">简学科技或</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">竞赛平台遭受损失的，用户须承担包括赔偿损失在内的违约责任，其损失包括但不限于实际损失、用户的违约所得与</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">简学科技</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">为了维护权益而支付的包括但不限于诉讼费、保全费、执行费、审计费、公证费、律师费、维护费等费用。</span>
            </li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 19.84pt; padding-left:1.16pt; text-indent:0pt">
                <span
                    style="background-color:#ffffff;  font-size:10.5pt">本协议终止后，如用户欲导出平台上用户的数据，用户可</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">在本协议终止前</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">70</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">天内以</span><span
                    style="background-color:#ffffff;  font-size:10.5pt; font-weight:bold">EMS</span><span
                    style="background-color:#ffffff;  font-size:10.5pt; font-weight:bold">邮寄</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">的方式</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">向</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">简学科技</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">提出书面申请，</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">简学科技</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">应在收到用户申请后的</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">30</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">日之内，向用户提供用户数据信息的文件或获取该文件的方法。</span><span
                    style="background-color:#ffffff;  font-size:10.5pt; font-weight:bold">在本协议终止</span><span
                    style="background-color:#ffffff;  font-size:10.5pt; font-weight:bold">100</span><span
                    style="background-color:#ffffff;  font-size:10.5pt; font-weight:bold">天后，</span><span
                    style="background-color:#ffffff;  font-size:10.5pt; font-weight:bold">简学科技</span><span
                    style="background-color:#ffffff;  font-size:10.5pt; font-weight:bold">将不可恢复地删除平台服务器上的任何用户数据信息，并不留存副本</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">。</span></li>
        </ol>
        <p style="background-color:#ffffff; line-height:25pt; margin:0pt"><span
                style=" font-size:10.5pt">&#xa0;</span></p>
        <h4 style="background-color:#ffffff; line-height:25pt; margin:0pt"><span
                style="background-color:#ffffff; color:#333333;  font-size:15pt; font-weight:bold">知识产权</span>
        </h4>
        <ol type="1" style="margin:0pt; padding-left:0pt">
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.31pt; text-indent:0pt">
                <span style="background-color:#ffffff;  font-size:10.5pt">竞赛平台是</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">聚合聚合</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">竞赛人才和竞赛问题的在线平台，</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">简学科技</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">尊重和鼓励竞赛平台用户创作的内容，认识到保护知识产权对竞赛平台生存与发展的重要性，承诺将保护知识产权作为竞赛平台运营的基本原则之一。</span>
            </li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.31pt; text-indent:0pt">
                <span
                    style="background-color:#ffffff;  font-size:10.5pt">用户在竞赛平台上发表的全部原创内容（包括但不仅限于回答、文章和评论），著作权均归用户本人所有。用户可授权第三方以任何方式使用，不需要得到竞赛平台的同意。</span>
            </li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.31pt; text-indent:0pt">
                <span style="background-color:#ffffff;  font-size:10.5pt">简学科技通过</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">竞赛平台提供的网络服务中包含的标识、版面设计、排版方式、文本、图片、图形等均受著作权、商标权及其它法律保护，未经相关权利人（含竞赛平台及其他原始权利人）同意，上述内容均不得在任何平台被直接或间接发布、使用、出于发布或使用目的的改写或再发行，或被用于其他任何商业目的。</span>
            </li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.31pt; text-indent:0pt">
                <span
                    style="background-color:#ffffff;  font-size:10.5pt">为了促进知识的分享和传播，用户将其在竞赛平台上发表的全部内容，授予竞赛平台免费的、不可撤销的、非独家使用许可，竞赛平台有权将该内容用于竞赛平台各种形态的产品和服务上，包括但不限于网站以及发表的应用或其他互联网产品。</span>
            </li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.31pt; text-indent:0pt">
                <span style="background-color:#ffffff;  font-size:10.5pt">第三方若出于非商业目的，将用</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">户在竞赛平台上发表的内容转载在竞赛平台之外的地方，应当在作品的正文开头的显著位置注明原作者姓名（或原作者在竞赛平台上使用的</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">帐号</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">名称），给出原始链接，注明「发表于竞赛平</span><span
                    style="background-color:#ffffff;  font-size:10.5pt"> </span><span
                    style="background-color:#ffffff;  font-size:10.5pt">」，并不得对作品进行修改演绎。若需要对作品进行修改，或用于商业目的，第三方应当联系用户获得单独授权，按照用户规定的方式使用该内容。</span>
            </li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.31pt; text-indent:0pt">
                <span
                    style="background-color:#ffffff;  font-size:10.5pt">在竞赛平台上传或发表的内容，用户应保证其为著作权人或已取得合法授权，并且该内容不会侵犯任何第三方的合法权益。如果第三方提出关于著作权的异议，竞赛平台有权根据实际情况删除相关的内容，且有权追究用户的法律责任。给竞赛</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">平台或任何第三方</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">造成损失的，用户应负责包括但不限于诉讼费、保全费、执行费、审计费、公证费、律师费、维护费等费用与实际的损失等在内的全额赔偿。</span>
            </li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.31pt; text-indent:0pt">
                <span
                    style="background-color:#ffffff;  font-size:10.5pt">如果任何第三方侵犯了竞赛平台用户相关的权利，用户同意授权</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">简学科技</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">或其指定的代理人代表竞赛平台自身或用户对该第三方提出警告、投诉、发起行政执法、诉讼、进行上诉，或谈判和解，并且用户同意在竞赛平台认为必要的情况下参与共同维权。</span>
            </li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.31pt; text-indent:0pt">
                <span
                    style="background-color:#ffffff;  font-size:10.5pt">竞赛平台有权但无义务对用户发布的内容进行审核，有权根据相关证据结合《侵权责任法》、《信息网络传播权保护条例》等法律法规对侵权信息进行处理。</span>
            </li>
        </ol>
        <p style="background-color:#ffffff; line-height:25pt; margin:0pt"><span
                style=" font-size:10.5pt">&#xa0;</span></p>
        <h4 style="background-color:#ffffff; line-height:25pt; margin:0pt"><span
                style="background-color:#ffffff;  font-size:15pt; font-weight:bold">个人隐私</span></h4>
        <p style="background-color:#ffffff; line-height:25pt; margin:0pt"><span
                style="background-color:#ffffff;  font-size:10.5pt">尊重用户个人隐私信息的私有性是竞赛平台的一贯原则，竞赛平台将通过技术手段、强化内部管理等办法充分保护用户的个人隐私信息，除法律或有法律赋予权限的政府部门要求或事先得到用户明确授权等原因外，竞赛平台保证不对外公开或向第三方透露用户个人隐私信息，或用户在使用服务时存储的非公开内容。同时，为了运营和改善竞赛平台的技术与服务，竞赛平台将可能会自行收集使用或向第三方提供用户的非个人隐私信息，这将有助于竞赛平台向用户提供更好的用户体验和服务质量。</span>
        </p>
        <p style="background-color:#ffffff; line-height:25pt; margin:0pt"><span
                style=" font-size:10.5pt">&#xa0;</span></p>
        <h4 style="background-color:#ffffff; line-height:25pt; margin:0pt"><span
                style="background-color:#ffffff;  font-size:15pt; font-weight:bold">侵权举报</span></h4>
        <ol type="1" style="margin:0pt; padding-left:0pt">
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.31pt; text-indent:0pt">
                <span style="background-color:#ffffff;  font-size:10.5pt">处理原则</span></li>
        </ol>
        <p style="background-color:#ffffff; line-height:25pt; margin:0pt"><span
                style="background-color:#ffffff;  font-size:10.5pt">涉及个人隐私：发布内容中直</span><span
                style="background-color:#ffffff;  font-size:10.5pt">接涉及</span><span
                style="background-color:#ffffff;  font-size:10.5pt">身份信息，如个人姓名、家庭住址、身份证号码、工作单位、私人电话等详细个人隐私；</span><br /><span
                style="background-color:#ffffff;  font-size:10.5pt">造谣、诽谤：发布内容中指名道姓（包括自然人和企业）的直接谩骂、侮辱、虚构中伤、恶意诽谤等；</span><br /><span
                style="background-color:#ffffff;  font-size:10.5pt">商业侵权：泄露企业商业机密及其他根据保密协议不能公开讨论的内容。</span>
        </p>
        <ol start="2" type="1" style="margin:0pt; padding-left:0pt">
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.31pt; text-indent:0pt">
                <span style="background-color:#ffffff;  font-size:10.5pt">举报条件</span></li>
        </ol>
        <p style="background-color:#ffffff; line-height:25pt; margin:0pt"><span
                style="background-color:#ffffff;  font-size:10.5pt">用户在竞赛平台发表的内容仅表明其个人的立场和观点，并不代表</span><span
                style="background-color:#ffffff;  font-size:10.5pt">简学科技和</span><span
                style="background-color:#ffffff;  font-size:10.5pt">竞赛平台的立场或观点。如果个人或单位发现竞赛平台上存在侵犯自身合法权益的内容，请同步与竞赛平</span><span
                style="background-color:#ffffff;  font-size:10.5pt">台取得联系。为了保证问题能够及时有效地处理，请务必提交真实有效、完整清晰的材料，否则不予受理。</span>
        </p>
        <p style="line-height:25pt; margin:0pt 0pt 0pt 21.5pt; text-indent:-21pt"><span
                style=" font-size:10.5pt">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;1)</span><span
                style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; </span><span
                style="background-color:#ffffff;  font-size:10.5pt">权利人对涉嫌侵权内容拥有商标权、著作权和／或其他依法可以行使权利的权属证明；如果举报人</span><span
                style="background-color:#ffffff;  font-size:10.5pt">非权利</span><span
                style="background-color:#ffffff;  font-size:10.5pt">人，请举报人提供代表企业进行举报的书面授权证明。</span></p>
        <p style="line-height:25pt; margin:0pt 0pt 0pt 21.5pt; text-indent:-21pt"><span
                style=" font-size:10.5pt">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;2)</span><span
                style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; </span><span
                style="background-color:#ffffff;  font-size:10.5pt">充分、明确地描述侵犯了权利人合法权益的内容，提供涉嫌侵权内容在竞赛平台上的具体页面地址，指明涉嫌侵权内容中的哪些内容侵犯了上述列明的权利人的合法权益；</span>
        </p>
        <p style="line-height:25pt; margin:0pt 0pt 0pt 21.5pt; text-indent:-21pt"><span
                style=" font-size:10.5pt">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;3)</span><span
                style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; </span><span
                style="background-color:#ffffff;  font-size:10.5pt">权利人具体的</span><span
                style="background-color:#ffffff;  font-size:10.5pt">联络信息，包括姓名、身份证或护照复印件（对自然人）、单位登记证明复印件（对单位）、通信地址、电话号码、传真和电子邮件；</span>
        </p>
        <p style="line-height:25pt; margin:0pt 0pt 0pt 21.5pt; text-indent:-21pt"><span
                style=" font-size:10.5pt">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;4)</span><span
                style="font:7.0pt 'Times New Roman'">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; </span><span
                style="background-color:#ffffff;  font-size:10.5pt">在侵权举报中加入如下关于举报内容真实性的声明：</span></p>
        <p style="line-height:25pt; margin:0pt; text-indent:21pt">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;<span
                style="background-color:#ffffff;  font-size:10.5pt">我</span><span
                style="background-color:#ffffff;  font-size:10.5pt">本人为所举报内容的合法权利人；</span></p>
        <p style="line-height:25pt; margin:0pt; text-indent:21pt">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;<span
                style="background-color:#ffffff;  font-size:10.5pt">我举报的发布在竞赛平台中的内容侵犯了本人相应的合法权益；</span>
        </p>
        <p style="line-height:25pt; margin:0pt; text-indent:21pt">&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;<span
                style="background-color:#ffffff;  font-size:10.5pt">如果本侵权举报内容不完全属实，本人将承担由此产生的一切法律责任。</span>
        </p>
        <ol start="3" type="1" style="margin:0pt; padding-left:0pt">
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.31pt; text-indent:0pt">
                <span style="background-color:#ffffff;  font-size:10.5pt">处理流程</span></li>
        </ol>
        <p style="background-color:#ffffff; line-height:25pt; margin:0pt"><span
                style="background-color:#ffffff;  font-size:10.5pt">出于网络平台的监督属性，并非所有申请都必须受理。</span><span
                style="background-color:#ffffff;  font-size:10.5pt">简学科技</span><span
                style="background-color:#ffffff;  font-size:10.5pt">自收到举报的</span><span
                style="background-color:#ffffff;  font-size:10.5pt">15</span><span
                style="background-color:#ffffff;  font-size:10.5pt">个工作日内处理完毕并给出回复。处理期间，不提供任何电话、邮件及其他方式的查询服务。</span>
        </p>
        <p style="background-color:#ffffff; line-height:25pt; margin:0pt"><span
                style="background-color:#ffffff;  font-size:10.5pt">出现竞赛平台已经删除或处理的内容，但是百度、谷歌等搜索引擎依然可以搜索到的现象，是因为百度、谷歌等搜索引擎自带缓存，此类问题竞赛平台无权也无法处理，因此相关申请不予受理。您可以自行联系搜索引擎服务商进行处理。</span>
        </p>
        <p style="background-color:#ffffff; line-height:25pt; margin:0pt"><span
                style="background-color:#ffffff;  font-size:10.5pt">用户在竞赛平台中的商业行为引发的法律纠纷，由交易双方自行处理，与竞赛平台无关。</span>
        </p>
        <p style="background-color:#ffffff; line-height:25pt; margin:0pt"><span
                style=" font-size:10.5pt">&#xa0;</span></p>
        <h4 style="background-color:#ffffff; line-height:25pt; margin:0pt"><span
                style="background-color:#ffffff;  font-size:15pt; font-weight:bold">免责申明</span></h4>
        <ol type="1" style="margin:0pt; padding-left:0pt">
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.61pt; text-indent:0pt">
                <span style="background-color:#ffffff;  font-size:10.5pt">简学科技</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">不能对用户发表的回答或评论的正确性进行保证。</span><br /><span
                    style="background-color:#ffffff;  font-size:10.5pt">用户在竞赛平台发表的内容仅表明其个人的立场和观点，并不代表竞赛平台的立场或观点。作为内容的发表者，需自行对所发表内容负责，因所发表内容引发的一切纠纷，由该内容的发表者承担全部法律及连带责任。竞赛平台不承担任何法律及连带责任。</span>
            </li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.61pt; text-indent:0pt">
                <span style="background-color:#ffffff;  font-size:10.5pt">用户同意对于通过</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">本服务</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">传送或者存储的信息，如出现被删除或者无法存储情况，</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">简学科技或</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">竞赛平台无须承担责任。</span></li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.61pt; text-indent:0pt">
                <span style="background-color:#ffffff;  font-size:10.5pt">简学科技</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">努力维护</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">竞赛平台</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">系统正常运营，用户因系统故障而产生的任何损失包括但不仅限于经济收入、声誉等等，竞赛平台不承担任何责任。此外，竞赛平台保留在未经通知下因升级、维护或其他目的情况下，暂停部分或者全部服务的权利。因此而造成对用户的后果，竞赛平台不承担任何责任。</span>
            </li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.61pt; text-indent:0pt">
                <span style="background-color:#ffffff;  font-size:10.5pt">简学科技</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">可以根据所有用户使用状态和行为，为了改善服务和体验、完善业务内容，自己或与合作方合作开发新的服务或者调整产品功能。</span>
            </li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.61pt; text-indent:0pt">
                <span style="background-color:#ffffff;  font-size:10.5pt">简学科技</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">特别提请所有用户注意：</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">简学科技</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">为了保障公司业务发展和调整的自主权，</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">简学科技</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">拥有随时自行修改或中断</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">竞赛平台相关</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">软件授权而不需通知所有用户的权利，如有必要，修改或中断会以通告形式公布于竞赛平台网站重要页面上。</span>
            </li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.61pt; text-indent:0pt">
                <span
                    style="background-color:#ffffff;  font-size:10.5pt">所有用户违反本《协议》条款的规定，导致或产生的任何第三方主张的任何索赔、要求或损失，包括但不限于诉讼费、保全费、执行费、审计费、公证费、律师费、维护费等费用与实际的损失等在内，所有用户同意赔偿</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">简学科技</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">与合作公司、关联公司，并使之免受损害。</span></li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.61pt; text-indent:0pt">
                <span
                    style="background-color:#ffffff;  font-size:10.5pt">使用竞赛平台服务涉及到互联网服务，可能会受到各个环节不稳定因素的影响，存在因不可抗力、计算机病毒、黑客攻击、系统不稳定、用户所在位置</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">、用户关机，非法内容信息、骚扰信息屏蔽以及其他任何网络、技术、通信线路、信息安全管理措施等原因造成的服务中断、受阻等不能满足所有用户要求的风险，所有用户须明白并自行承担以上风险。</span>
            </li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.61pt; text-indent:0pt">
                <span
                    style="background-color:#ffffff;  font-size:10.5pt">使用竞赛平台服务由所有用户自己承担风险，竞赛平台服务及合作单位对竞赛平台“服务”不作任何类型的担保，不论是明示的、默示的或法令的保证和条件，包括但不限于本“服务”的适销性、适用性、无病毒、无疏忽或无技术瑕疵问题、所有权和无侵权的明示或默示担保和条件，对在任何情况下因使用或不能使用本“服务”所产生的直接、间接、偶然、特殊及后续的损害</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">及风险，竞赛平台及合作单位不承担任何责任。</span>
            </li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.61pt; text-indent:0pt">
                <span
                    style="background-color:#ffffff;  font-size:10.5pt">所有用户因第三方如电信部门的通讯线路故障、技术问题、网络、电脑故障、系统不稳定性及其他各种不可抗力原因而遭受的一切损失，竞赛平台及合作单位不承担责任。</span>
            </li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 19.84pt; padding-left:1.46pt; text-indent:0pt">
                <span style="background-color:#ffffff;  font-size:10.5pt">因技术故障等不可</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">抗事件</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">影响到服务的正常运行的，</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">简学科技</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">及合作单位承诺在第一时间内与相关单位配合，及时处理进行修复，但用户因此而遭受的一切损失，竞赛平台及合作单位不承担责任。</span>
            </li>
        </ol>
        <p style="background-color:#ffffff; line-height:25pt; margin:0pt"><span
                style=" font-size:10.5pt">&#xa0;</span></p>
        <h4 style="background-color:#ffffff; line-height:25pt; margin:0pt"><span
                style="background-color:#ffffff;  font-size:15pt; font-weight:bold">协议修改</span></h4>
        <ol type="1" style="margin:0pt; padding-left:0pt">
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.31pt; text-indent:0pt">
                <span
                    style="background-color:#ffffff;  font-size:10.5pt">根据互联网的发展和有关法律、法规及规范性文件的变化，或者因业务发展需要，竞赛平台有权对本协议的条款</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">作出</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">修改或变更，一旦本协议的内容发生变动，竞赛平台将会直接在竞赛平台网站上公布修改之后的协议内容，</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">该公</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">布行为视为竞赛平台已经通知用户修改内容。竞赛平台也可采用电子邮件或私信的传送方式，提示用户协议条款的修改、服务变更、或其它重要事项。</span>
            </li>
            <li
                style="background-color:#ffffff;  font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.31pt; text-indent:0pt">
                <span
                    style="background-color:#ffffff;  font-size:10.5pt">如果不同意竞赛平台对本协议相关条款所做的修改，用户有权并应当停止使用竞赛平台。如果用户继</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">续使用</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">竞赛平台，则视为用户接受竞赛平台对本协议相关条款所做的修改。</span>
            </li>
        </ol>
        <p style="background-color:#ffffff; line-height:25pt; margin:0pt"><span
                style=" font-size:10.5pt">&#xa0;</span></p>
        <h4 style="background-color:#ffffff; line-height:25pt; margin:0pt"><span
                style="background-color:#ffffff;  font-size:15pt; font-weight:bold">其他条款</span></h4>
        <ol type="1" style="margin:0pt; padding-left:0pt">
            <li
                style=" font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.69pt; padding-left:7.51pt; text-indent:0pt">
                <span style="background-color:#ffffff;  font-size:10.5pt">本《协议》所</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">定的任何条款的部分或全部无效者，不影响其它条款的效力。</span>
            </li>
            <li
                style=" font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.89pt; padding-left:7.51pt; text-indent:0pt">
                <span
                    style="background-color:#ffffff;  font-size:10.5pt">本《协议》的所有标题仅仅是为了醒目及阅读方便，本身并无实际涵义，不能作为本《协议》涵义解释之依据。</span>
            </li>
            <li
                style=" font-size:10.5pt; line-height:25pt; margin:0pt 0pt 0pt 13.89pt; padding-left:7.51pt; text-indent:0pt">
                <span
                    style="background-color:#ffffff;  font-size:10.5pt">本《协议》签订地为杭州。本《协议》的解释、效力及纠纷的解决，适用于中华人民共和国法律。若用户和伙伴之间发生任何纠纷或争议，首先应友好协商解决，协商不成的，用户在此完全同意将纠纷或争议提交简学科技所在地</span><span
                    style="background-color:#ffffff;  font-size:10.5pt">人民法院管辖。</span></li>
        </ol>
        <p style="line-height:21pt; margin:0pt"><span style=" font-size:10.5pt">&#xa0;</span></p>
    </div>
  <span slot="footer" class="dialog-footer">
    <!-- <el-button @click="centerDialogVisible = false">取 消</el-button> -->
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>
<script>
  export default {
    data() {
      return {
        centerDialogVisible: false
      };
    }
  };
</script>
 <style lang="less" scoped>
 .disclaimer{
     display: inline-block;
     max-height: 80%;
     //overflow: scroll
 }
ol{
        display: block;
}
</style>
