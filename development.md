# 开发说明
## login页面开发
1. 登录的时候 按钮变成加载中模式
2. 如果已经登录,页面跳转到home页面
3. 把login的状态存到本地，刷新的时候不会退出页面
4. vue错误提示动画效果

# 2018-6-21工作安排

## 系统接口Url设置
1. 在static 里面放入接口: port, 并且把接口地址存在本地，每次请求数据先到本地获取地址,如果本地没有地址, 那么从static/config.json 里面获取地址
```js
export function getUrl (port="port") {
  if (loS.getItem('BASEURL',true)) {
    return Promise.resolve(loS.getItem('BASEURL',true))
  }
  return axios.get('static/config.json').then((res)=>{
    // 存储BASEURL
    loS.setItem('BASEURL',res.data[port])
    return Promise.resolve(res.data[port])
  })
}
```
## 表格数据导出
1. 需要安装三个依赖
```js
npm install -S file-saver xlsx
npm install -D script-loader
```
2. 项目中新建一个文件夹：（vendor—名字任取） 里面放置两个文件Blob.js和 Export2Excel.js。
3. HTML部分：增加导出按钮
```html
 <span  @click="export2Excel()"><i class="fa fa-download"></i> 导出数据</span>
```
4. .methods里面：
```js
      export2Excel() {
      　　require.ensure([], () => {
      　　　　const { export_json_to_excel } = require('vendor/Export2Excel');
      　　　　const tHeader = ['序号', '设备号', '设备名称', '设备类型', '状态'];
      　　　　const filterVal = ['deviceId', 'deviceCode', 'deviceName','deviceTypeName','status'];
      　　　　const list = this.tableData;
      　　　　const data = this.formatJson(filterVal, list);
      　　　　export_json_to_excel(tHeader, data, '列表excel');
      　　})
      },
      formatJson(filterVal, jsonData) {
      　　return jsonData.map(v => filterVal.map(j => v[j]))
      }
```
5. 按钮导出调用export2Excel方法
```js
    注：如果webpack报解析错误：
    在build----webpack.base.conf.js中resolve的alias加入 
    'vendor': path.resolve(__dirname, '../src/vendor'),
    vue-cli 的话加入
    'vendor': resolve('src/vendor')
    即可解决
    另：alias是配置别名　
```
## 修改密码细节接口完善
## 路由配置  
## 打包环境配置和测试
1. ie 项目空白原因: lostroage.getItem 需要在服务器上才能运行 否则会报错