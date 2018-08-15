# 预约挂号

>  web页面
# 注册建档 --reg-book
## 1. 选择注册方式
## 2. 读取卡信息
## 3. 完善信息
## 4. 完成建档
# 预存金充值 -- pre-deposit
## 1. 选择卡种类
## 2. 读取卡信息
## 3. 填写充值信息
## 4. 完成充值并打印
# 预约挂号 -- department
## 1. 选择科室
## 2. 选择专家
## 3. 支付挂号费
## 4. 完成挂号
# 当日挂号 -- reg-today
## 1. 选择科室
## 2. 选择医生
## 3. 支付挂号费
## 4. 完成挂号
# 门诊缴费  --out-patient
## 1. 选择卡种类
## 2. 读取卡信息
## 3. 选择缴费项目
## 4. 完成缴费
# 预约取号 --book-no
## 1. 选择卡种类
## 2. 读取卡信息
## 3. 选择预约号
## 4. 打印并完成取号 
# 自助查询 --self-query
## 历史消费明细
## 就诊记录
## 提示页面 tip-page
## 1. 该用户已经存在
## 2. 该用户账号已经锁定
# 自助打印页面 self-print
## 1. 读取或者输入就诊卡号
## 2. 根据类别查看打印信息
## 3. 答应化验单
## Build Setup
> 基础组件
1. 分页组件
## 修改列表
1. 倒计时问题: 正常情况: 60s 提示成功页面:10s 提示错误页面: 15s
2. 添加就诊卡
3. 页面布局统一修改
4. 预约页面 选择专家 修改 没有数据修改
5. 读取身份证 成功之后修改
6. code码修改 
7. 添加语音接口 SharpForeign.SpeechText("请放入身份证");

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
