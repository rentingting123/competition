import jxApi from "@@/api/jxapi/personalCenterApi";
import store from "@@/vuex/store.js";
import { getToken } from "./oauth";
import Vue from "vue";
//import {createElement} from 'vue/src/core/vdom/create-elemenet.js'
import { Message, MessageBox, Radio, RadioGroup } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

function formatKey(key) {
  return `${key}${COOKIE_SUFFIX}`;
}

export async function setNoviceGuide(name) {
  let noviceGuide =
    (localStorage.getItem("noviceGuide") &&
      JSON.parse(localStorage.getItem("noviceGuide"))) ||
    {};
  if (noviceGuide[name] != 1) {
    noviceGuide[name] = 1;
    localStorage.setItem("noviceGuide", JSON.stringify(noviceGuide));
    let params = {
      noviceGuide: JSON.stringify(noviceGuide),
    };
    let res = await jxApi.updateUserBankInfo({ data: params });
    if (res == "error") return;
  }
}

export function getNoviceGuide(name) {
  let noviceGuide =
    localStorage.getItem("noviceGuide") &&
    JSON.parse(localStorage.getItem("noviceGuide"));
  if (noviceGuide && noviceGuide[name] == 1) {
    return false;
  } else {
    return true;
  }
}

export function setCookie(
  cName,
  cValue,
  exdays = 1,
  domain = window.location.hostname
) {
  var d = new Date(),
    expires,
    value;

  value = JSON.stringify(cValue);
  // if (typeof exdays !== 'undefined') {
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  expires = ` expires=${d.toUTCString()}`;
  // }
  document.cookie = `${formatKey(cName)}=${encodeURIComponent(
    value
  )}; path=/; expires=${expires}; domain=${domain}`;
}

export function getCookie(cName) {
  var name = formatKey(cName) + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1);
    if (c.indexOf(name) == 0)
      return JSON.parse(decodeURIComponent(c.substring(name.length, c.length)));
  }
  return "";
}

export function setItem(n, v) {
  var name = formatKey(n);
  localStorage.setItem(name, JSON.stringify(v));
}

export function getItem(n) {
  var name = formatKey(n);
  let r = localStorage.getItem(name);
  try {
    r = JSON.parse(r);
  } catch (e) {
    r = r;
  }
  return r;
}
export function removeItem(n, v) {
  var name = formatKey(n);
  localStorage.removeItem(name);
}

export function isEmpty(obj) {
  for (const el in obj) {
    return false;
  }
  return true;
}

export function getTokenHeader(oauth = false) {
  let Authorization;
  let token = getToken();
  if (token && !oauth) {
    Authorization = `Bearer ${token}`;
  } else {
    Authorization = "Basic bGFudGluLXdlYjpsYW50aW4td2ViLXNlY3VyaXR5";
  }
  return { Authorization };
}
export function getGroupId() {
  //let groupId = localStorage.getItem('userInfo')&&JSON.parse(localStorage.getItem('userInfo')).groupId
  return localStorage.getItem("groupId") || null;
}

export function setGroupId(value) {
  localStorage.setItem("groupId", value);
}

export function getUserInfo() {
  return (
    localStorage.getItem("userInfo") &&
    JSON.parse(localStorage.getItem("userInfo"))
  );
}

export function getBaseInfo() {
  return (
    localStorage.getItem("baseInfo") &&
    JSON.parse(localStorage.getItem("baseInfo"))
  );
}
export function getCompetitionId() {
  return (
    localStorage.getItem("competitionId") &&
    parseInt(localStorage.getItem("competitionId"))
  );
}

export function getTabsName(tabs, index) {
  let str = "";
  for (let i in tabs) {
    if (tabs[i].type == index) {
      str = tabs[i].tabName;
    }
  }
  return str;
}

export function loadStyle(url) {
  const link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;
  const head = document.getElementsByTagName("head")[0];
  head.appendChild(link);
}

export function addClass(name) {
  const classList = document.body.classList;
  if (!classList.contains(name)) {
    classList.add(name);
  }
}

export function getParams(location) {
  const params = {};
  const search = location.search;
  const query =
    search.indexOf("?") === -1 ? search : search.substring(1, search.length);

  query.split("&").forEach((it) => {
    const index = it.indexOf("=");
    const key = it.substring(0, index);
    const value = it.substring(index + 1, it.length);
    params[key] = value;
  });
  return params;
}

export function getHashParam(key) {
  const href = window.location.href;
  const index = href.indexOf("?");
  const query = index === -1 ? null : href.substring(index + 1);
  const params = {};
  if (query) {
    const list = query.split("&");
    for (let i = 0; i < list.length; i++) {
      const kv = list[i].split("=");
      params[kv[0]] = kv[1] || "";
    }
  }

  return params[key];
}
//页面跳转，储存groupId isAdmin contactPhone
export async function setUserInfo() {
  var result = await jxApi.getUserInfo();
  if (result == "error") return console.log("getUserInfo");
  this.mName = result.nickname || result.idcardName;
  this.headImg = result.icon;
  this.jurisdiction = result.isAdmin;
  localStorage.setItem("isAdmin", result.isAdmin);
  localStorage.setItem("userInfo", JSON.stringify(result));
  let noviceGuide = result && result.noviceGuide;
  noviceGuide && localStorage.setItem("noviceGuide", noviceGuide);
  var groupType = await jxApi.getGroupType();
  localStorage.setItem("groupType",groupType);
  store.dispatch("setAuthority");
  await selectGroup(null, true);
}

const groupSelect = {
  props: {
    options: {
      require: true,
      type: Array,
    },
    selectGroup: {
      reuire: false,
      type: Function,
    },
    groupId: {
      reuire: false,
      type: String,
    },
  },
  data() {
    return {
      radio: (this.groupId || this.options[0].objectId).toString(),
    };
  },
  render() {
    return (
      <div style="max-height:40vh;overflow:auto">
        <RadioGroup on-change={this.selectGroup} v-model={this.radio}>
          {this.options.map((item) => (
            <Radio
              style={{ marginTop: "10px" }}
              key={item.objectId}
              label={item.objectId + ""}
            >{`${item.objectName}(${
              item.type == 0 ? "管理员" : "竞赛"
            })`}</Radio>
          ))}
        </RadioGroup>
      </div>
    );
  },
};

Vue.component("g-select", groupSelect);
let cVue = new Vue({});
//all 返回最高权限
export async function selectGroup(cb, all, expert) {
  var groups = await jxApi.getUserGroupIds({
    data: {
      expert: !!all,
      review: !!expert,
    },
  });
  if (groups == "error" || !groups) return;
  let groupId = null;
  if (groups.length < 1) {
    setGroupId("-1");
  } else {
    groupId = (getGroupId() || groups[0].objectId).toString();

    // 20200815 专家身份由后端提供
    // if(!!expert){
    //   groups.push({
    //     objectId: -1,
    //     objectName: "专家",
    //     type:-1,
    //   })
    // }
    //必须要定义h不然在当前作用域下面没有vue会报错
    const h = cVue.$createElement;
    if (groups.length == 1) {
      groupId = groups[0].objectId.toString();
      setGroupId(groupId);
    } else {
      await MessageBox({
        title: "角色身份选择",
        message: (
          <g-select
            options={groups}
            groupId={groupId}
            selectGroup={(v) => (groupId = v)}
          />
        ),
        showCancelButton: false,
        showClose: false,
        closeOnPressEscape: false,
        closeOnClickModal: false,
        confirmButtonText: "确定",

        beforeClose: (action, instance, done) => {
          if (!groupId) {
            Message.warning("必须选择身份！");
          } else {
            done();
          }
        },
      }).then((action) => {
        setGroupId(groupId);
      });
    }
    let selOpt = {};
    groups.map((item) => {
      if (item.objectId == groupId) selOpt = item;
    });
    localStorage.setItem("selectGroup", JSON.stringify(selOpt));
    await jxApi.setUserGroup({ data: selOpt });
    store.dispatch("setAuthorityByCodeNoID", {
      // cId:this.competitionId,
      codes: [
        "managerPermission",
        "manageCompetitionAdmin",
        "manageMyCompetition",
        "managePersonalSettings",
      ],
    });
  }
  cb && cb();
}
