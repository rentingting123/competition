/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcompetition"] = self["webpackChunkcompetition"] || []).push([["src_components_fileReview_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-1!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/fileReview.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/fileReview.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = (__webpack_require__(/*! ./node_modules/@babel/runtime/helpers/interopRequireDefault.js */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\")[\"default\"]);\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\n\nvar _regeneratorRuntime2 = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js */ \"./node_modules/@babel/runtime/helpers/regeneratorRuntime.js\"));\n\nvar _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/helpers/asyncToGenerator.js */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\"));\n\nvar _network = _interopRequireDefault(__webpack_require__(/*! @@/utils/network */ \"./src/utils/network.js\"));\n\nvar _util = __webpack_require__(/*! @@/utils/util */ \"./src/utils/util.js\");\n\n//ow365参数\nvar ow365 = {\n  i: '28879',\n  url: 'oss.moocollege.com'\n};\nvar _default = {\n  name: \"FileReview\",\n  props: [\"url\", \"index\", 'isdownload'],\n  data: function data() {\n    return {\n      ow365Url: '',\n      name: \"free9\",\n      videoList: [\"mp4\", \"avi\"],\n      audioList: [\"mp3\"],\n      imgListExt: [\"jpg\", 'png', 'jpeg', 'gif'],\n      pageNum: 0,\n      loading: false,\n      imgList: [],\n      displayType: 'img',\n      owClass: 'ow365m'\n    };\n  },\n  mounted: function mounted() {\n    window.document.oncontextmenu = function () {\n      return false;\n    };\n\n    if (this.isPdf()) {\n      //todo判断可以下载执行取消工具栏\n      if (this.isdownload) {\n        this.pdfObj(1);\n      } else {\n        // this.pdfObj(0)\n        this.pdfLoad();\n      }\n    }\n  },\n  beforeDestroy: function beforeDestroy() {\n    window.document.oncontextmenu = null;\n  },\n  methods: {\n    //判断是否可以使用ow365 加载\n    checkOw: function checkOw(url) {\n      return url.indexOf(ow365.url) > -1;\n    },\n    //使用365 加载文件\n    loadByOw365: function loadByOw365(file) {\n      this.displayType = 'ow365'; //ow365https没法使用高清模式\n\n      this.ow365Url = \"https://ow365.cn/?i=\".concat(ow365.i, \"&ssl=1&furl=\").concat(file); // this.ow365Url=`http://ow365.cn/?i=${ow365.i}&ssl=1&n=7&furl=${file}`\n    },\n    pdfObj: function pdfObj(toolbar) {\n      this.loading = true;\n\n      var _url = this.url.indexOf(\"http:\") > -1 ? this.url.replace(\"http:\", \"https:\") : this.url;\n\n      try {\n        console.log(toolbar);\n        PDFObject.embed(_url, \"#pdf-div-\".concat(this.index), {\n          pdfOpenParams: {\n            view: \"FitV\",\n            toolbar: toolbar\n          }\n        });\n        this.loading = false;\n      } catch (e) {\n        (0, _util.loadJs)(\"https://web.moocollege.com/cc/pdfobject.min.js\").then(this.pdfObj.bind(this, toolbar));\n      }\n    },\n    renderPDF: function renderPDF(pdf, ci) {\n      var _this = this;\n\n      pdf.getPage(ci).then(function (page) {\n        // 设置展示比例\n        var scale = 1.5; // 获取pdf尺寸\n\n        var viewport = page.getViewport({\n          scale: scale\n        }); // 获取需要渲染的元素\n\n        var canvas = document.createElement(\"canvas\");\n        canvas.setAttribute(\"style\", \"width: 100%\");\n        var context = canvas.getContext(\"2d\");\n        canvas.height = viewport.height;\n        canvas.width = viewport.width;\n        var container = document.getElementById(\"pdf-\".concat(_this.index, \"-\").concat(ci));\n        container.appendChild(canvas);\n        var renderContext = {\n          canvasContext: context,\n          viewport: viewport\n        };\n        page.render(renderContext);\n      });\n    },\n    pdfLoad: function pdfLoad() {\n      var _this2 = this;\n\n      return (0, _asyncToGenerator2.default)( /*#__PURE__*/(0, _regeneratorRuntime2.default)().mark(function _callee() {\n        var _url, res, PDFJS, pdfjsWorker, CMAP_URL, loadingTask;\n\n        return (0, _regeneratorRuntime2.default)().wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                _url = _this2.url.indexOf(\"http:\") > -1 ? _this2.url.replace(\"http:\", \"https:\") : _this2.url;\n\n                if (!_this2.checkOw(_url)) {\n                  _context.next = 3;\n                  break;\n                }\n\n                return _context.abrupt(\"return\", _this2.loadByOw365(_url));\n\n              case 3:\n                _this2.loading = true;\n                _context.next = 6;\n                return _network.default.node('pdf/get', {\n                  data: {\n                    url: _url\n                  }\n                });\n\n              case 6:\n                res = _context.sent;\n\n                if (res == \"error\" || res.list.length < 1) {\n                  PDFJS = __webpack_require__(/*! pdfjs-dist */ \"./node_modules/pdfjs-dist/build/pdf.js\");\n                  pdfjsWorker = __webpack_require__(/*! pdfjs-dist/build/pdf.worker.entry.js */ \"./node_modules/pdfjs-dist/build/pdf.worker.entry.js\");\n                  PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;\n                  _this2.displayType = 'pdf';\n                  CMAP_URL = 'https://competition-web.oss-cn-hangzhou.aliyuncs.com/cmaps/'; //'https://unpkg.com/pdfjs-dist@2.7.570/cmaps/'\n\n                  loadingTask = PDFJS.getDocument({\n                    url: _url,\n                    cMapUrl: CMAP_URL,\n                    cMapPacked: true\n                  });\n                  loadingTask.promise.then(function (pdf) {\n                    _this2.pageNum = pdf.numPages;\n\n                    for (var i = 1; i <= pdf.numPages; i++) {\n                      _this2.renderPDF(pdf, i);\n                    }\n\n                    _this2.loading = false;\n                  }).catch(function (err) {\n                    if (err.message == 'Failed to fetch') {\n                      window.location.reload();\n                    }\n\n                    _this2.$message(\"PDF文件加载失败：\" + err.message);\n\n                    _this2.loading = false;\n                    var errDom = document.createElement('div');\n                    errDom.innerHTML = \"文件加载失败：\" + err.message;\n                    errDom.className = 'err-pdf-dom';\n                    var container = document.getElementById(\"pdf-div-\".concat(_this2.index));\n                    container.appendChild(errDom);\n                  });\n                } else {\n                  console.log('res.list', res.list);\n                  _this2.imgList = res.list;\n                  _this2.displayType = 'img';\n                  _this2.loading = false;\n                }\n\n              case 8:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee);\n      }))();\n    },\n    //判断是不是可以用pdf或者ow365加载\n    isPdf: function isPdf() {\n      if (this.url) {\n        return this.url.endsWith(\".pdf\") || this.checkOw(this.url);\n      }\n\n      return false;\n    },\n    isAudio: function isAudio() {\n      if (this.url) {\n        var index = this.url.lastIndexOf(\".\");\n        var extra = this.url.substring(index + 1);\n        return this.audioList.includes(extra);\n      }\n\n      return false;\n    },\n    isVideo: function isVideo() {\n      if (this.url) {\n        var index = this.url.lastIndexOf(\".\");\n        var extra = this.url.substring(index + 1);\n        return this.videoList.includes(extra.toLowerCase());\n      }\n\n      return false;\n    },\n    isImg: function isImg() {\n      if (this.url) {\n        var extra = this.url.split('.').pop();\n        return this.imgListExt.includes(extra.toLowerCase());\n      }\n\n      return false;\n    }\n  }\n};\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://competition/./src/components/fileReview.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-1!./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-1!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/fileReview.vue?vue&type=template&id=740bfff8&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/fileReview.vue?vue&type=template&id=740bfff8&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.staticRenderFns = exports.render = void 0;\n\nvar render = function render() {\n  var _vm = this,\n      _c = _vm._self._c;\n\n  return _c(\"div\", [_vm.isAudio() ? _c(\"div\", [_c(\"div\", {\n    attrs: {\n      id: \"audio-div-\".concat(_vm.index)\n    }\n  }), _vm._v(\" \"), _c(\"audio\", {\n    staticStyle: {\n      width: \"100%\"\n    },\n    attrs: {\n      src: _vm.url,\n      controls: \"controls\"\n    }\n  }, [_vm._v(\"您的浏览器不支持 video 标签。\")])]) : _vm.isVideo() ? _c(\"div\", [_c(\"video\", {\n    staticStyle: {\n      width: \"100%\"\n    },\n    attrs: {\n      src: _vm.url,\n      controlsList: \"nodownload\",\n      controls: \"controls\"\n    }\n  }, [_vm._v(\"您的浏览器不支持 video 标签。\")])]) : _vm.isImg() ? _c(\"div\", [_c(\"img\", {\n    staticStyle: {\n      width: \"100%\"\n    },\n    attrs: {\n      src: _vm.url,\n      alt: \"作品\"\n    }\n  })]) : _vm.isPdf() || _vm.ow365Url ? _c(\"div\", [_c(\"div\", {\n    directives: [{\n      name: \"loading\",\n      rawName: \"v-loading\",\n      value: _vm.loading,\n      expression: \"loading\"\n    }],\n    attrs: {\n      id: \"pdf-div-\".concat(_vm.index)\n    }\n  }, [_vm.displayType == \"pdf\" ? _c(\"div\", _vm._l(_vm.pageNum, function (page) {\n    return _c(\"div\", {\n      key: page,\n      attrs: {\n        id: \"pdf-\".concat(_vm.index, \"-\").concat(page)\n      }\n    });\n  }), 0) : _vm.displayType == \"img\" ? _c(\"div\", {\n    staticStyle: {\n      \"text-align\": \"center\"\n    }\n  }, _vm._l(_vm.imgList, function (item) {\n    return _c(\"img\", {\n      key: item,\n      staticStyle: {\n        \"max-width\": \"100%\"\n      },\n      attrs: {\n        src: item\n      }\n    });\n  }), 0) : _vm.displayType == \"ow365\" ? _c(\"div\", {\n    class: _vm.owClass\n  }, [_c(\"div\", {\n    staticClass: \"ow365ctool\"\n  }, [_vm.owClass == \"ow365m\" ? _c(\"i\", {\n    staticClass: \"el-icon-full-screen\",\n    on: {\n      click: function click($event) {\n        _vm.owClass = \"ow365l\";\n      }\n    }\n  }) : _vm._e(), _vm._v(\" \"), _vm.owClass == \"ow365l\" ? _c(\"i\", {\n    staticClass: \"el-icon-aim\",\n    on: {\n      click: function click($event) {\n        _vm.owClass = \"ow365m\";\n      }\n    }\n  }) : _vm._e()]), _vm._v(\" \"), _c(\"iframe\", {\n    staticStyle: {\n      width: \"100%\",\n      border: \"none\",\n      height: \"100%\"\n    },\n    attrs: {\n      id: \"we365-\".concat(_vm.index),\n      src: _vm.ow365Url\n    }\n  })]) : _vm._e()])]) : _c(\"div\", [_vm._v(\"\\r\\n      未匹配到显示格式\\r\\n    \")])]);\n};\n\nexports.render = render;\nvar staticRenderFns = [];\nexports.staticRenderFns = staticRenderFns;\nrender._withStripped = true;\n\n//# sourceURL=webpack://competition/./src/components/fileReview.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-1!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet%5B1%5D.rules%5B2%5D!./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-6.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-6.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/fileReview.vue?vue&type=style&index=0&id=740bfff8&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-6.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-6.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/fileReview.vue?vue&type=style&index=0&id=740bfff8&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://competition/./src/components/fileReview.vue?./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-6.use%5B1%5D!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-6.use%5B2%5D!./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/less-loader/dist/cjs.js??clonedRuleSet-8.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/fileReview.vue?vue&type=style&index=1&id=740bfff8&lang=less&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/less-loader/dist/cjs.js??clonedRuleSet-8.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/fileReview.vue?vue&type=style&index=1&id=740bfff8&lang=less&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://competition/./src/components/fileReview.vue?./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use%5B1%5D!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use%5B2%5D!./node_modules/less-loader/dist/cjs.js??clonedRuleSet-8.use%5B3%5D!./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ }),

/***/ "./src/components/fileReview.vue":
/*!***************************************!*\
  !*** ./src/components/fileReview.vue ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__esModule\": function() { return /* reexport safe */ _fileReview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.__esModule; }\n/* harmony export */ });\n/* harmony import */ var _fileReview_vue_vue_type_template_id_740bfff8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fileReview.vue?vue&type=template&id=740bfff8&scoped=true& */ \"./src/components/fileReview.vue?vue&type=template&id=740bfff8&scoped=true&\");\n/* harmony import */ var _fileReview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fileReview.vue?vue&type=script&lang=js& */ \"./src/components/fileReview.vue?vue&type=script&lang=js&\");\n/* harmony import */ var _fileReview_vue_vue_type_style_index_0_id_740bfff8_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fileReview.vue?vue&type=style&index=0&id=740bfff8&lang=css& */ \"./src/components/fileReview.vue?vue&type=style&index=0&id=740bfff8&lang=css&\");\n/* harmony import */ var _fileReview_vue_vue_type_style_index_1_id_740bfff8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fileReview.vue?vue&type=style&index=1&id=740bfff8&lang=less&scoped=true& */ \"./src/components/fileReview.vue?vue&type=style&index=1&id=740bfff8&lang=less&scoped=true&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n;\n\n\n\n/* normalize component */\n\nvar component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(\n  _fileReview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _fileReview_vue_vue_type_template_id_740bfff8_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,\n  _fileReview_vue_vue_type_template_id_740bfff8_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,\n  false,\n  null,\n  \"740bfff8\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/fileReview.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack://competition/./src/components/fileReview.vue?");

/***/ }),

/***/ "./src/components/fileReview.vue?vue&type=script&lang=js&":
/*!****************************************************************!*\
  !*** ./src/components/fileReview.vue?vue&type=script&lang=js& ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__esModule\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_1_node_modules_vue_loader_lib_index_js_vue_loader_options_fileReview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.__esModule; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_1_node_modules_vue_loader_lib_index_js_vue_loader_options_fileReview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-1!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./fileReview.vue?vue&type=script&lang=js& */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-1!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/fileReview.vue?vue&type=script&lang=js&\");\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_1_node_modules_vue_loader_lib_index_js_vue_loader_options_fileReview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack://competition/./src/components/fileReview.vue?");

/***/ }),

/***/ "./src/components/fileReview.vue?vue&type=template&id=740bfff8&scoped=true&":
/*!**********************************************************************************!*\
  !*** ./src/components/fileReview.vue?vue&type=template&id=740bfff8&scoped=true& ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__esModule\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_fileReview_vue_vue_type_template_id_740bfff8_scoped_true___WEBPACK_IMPORTED_MODULE_0__.__esModule; },\n/* harmony export */   \"render\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_fileReview_vue_vue_type_template_id_740bfff8_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render; },\n/* harmony export */   \"staticRenderFns\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_fileReview_vue_vue_type_template_id_740bfff8_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_1_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_fileReview_vue_vue_type_template_id_740bfff8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js??clonedRuleSet-1!../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./fileReview.vue?vue&type=template&id=740bfff8&scoped=true& */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-1!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/fileReview.vue?vue&type=template&id=740bfff8&scoped=true&\");\n\n\n//# sourceURL=webpack://competition/./src/components/fileReview.vue?");

/***/ }),

/***/ "./src/components/fileReview.vue?vue&type=style&index=0&id=740bfff8&lang=css&":
/*!************************************************************************************!*\
  !*** ./src/components/fileReview.vue?vue&type=style&index=0&id=740bfff8&lang=css& ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_6_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_6_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_fileReview_vue_vue_type_style_index_0_id_740bfff8_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-6.use[1]!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-6.use[2]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./fileReview.vue?vue&type=style&index=0&id=740bfff8&lang=css& */ \"./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-6.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-6.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/fileReview.vue?vue&type=style&index=0&id=740bfff8&lang=css&\");\n\n\n//# sourceURL=webpack://competition/./src/components/fileReview.vue?");

/***/ }),

/***/ "./src/components/fileReview.vue?vue&type=style&index=1&id=740bfff8&lang=less&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./src/components/fileReview.vue?vue&type=style&index=1&id=740bfff8&lang=less&scoped=true& ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_less_loader_dist_cjs_js_clonedRuleSet_8_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_fileReview_vue_vue_type_style_index_1_id_740bfff8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../node_modules/less-loader/dist/cjs.js??clonedRuleSet-8.use[3]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./fileReview.vue?vue&type=style&index=1&id=740bfff8&lang=less&scoped=true& */ \"./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/less-loader/dist/cjs.js??clonedRuleSet-8.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/fileReview.vue?vue&type=style&index=1&id=740bfff8&lang=less&scoped=true&\");\n\n\n//# sourceURL=webpack://competition/./src/components/fileReview.vue?");

/***/ }),

/***/ "?fe90":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (function() {

eval("/* (ignored) */\n\n//# sourceURL=webpack://competition/fs_(ignored)?");

/***/ }),

/***/ "?d446":
/*!**********************!*\
  !*** http (ignored) ***!
  \**********************/
/***/ (function() {

eval("/* (ignored) */\n\n//# sourceURL=webpack://competition/http_(ignored)?");

/***/ }),

/***/ "?4c38":
/*!***********************!*\
  !*** https (ignored) ***!
  \***********************/
/***/ (function() {

eval("/* (ignored) */\n\n//# sourceURL=webpack://competition/https_(ignored)?");

/***/ }),

/***/ "?9f5f":
/*!*********************!*\
  !*** url (ignored) ***!
  \*********************/
/***/ (function() {

eval("/* (ignored) */\n\n//# sourceURL=webpack://competition/url_(ignored)?");

/***/ }),

/***/ "?afbb":
/*!**********************!*\
  !*** zlib (ignored) ***!
  \**********************/
/***/ (function() {

eval("/* (ignored) */\n\n//# sourceURL=webpack://competition/zlib_(ignored)?");

/***/ })

}]);