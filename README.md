[lesson](https://www.bilibili.com/video/BV1rC4y187Vw?spm_id_from=333.824.header_right.fav_list.click&vd_source=5427a9618d45359fd6de52c0c05c17e7)

## compiler module
- 将html转为render function
## reactive module
- 进行数据的初始化
### renderer module
- 渲染阶段：调用 render function （render function又调用了 响应式对象）返回一个虚拟dom
- 挂载阶段：调用dom api 创建真实dom
- patch：数据发生改变 renderer module 重新生成vnode 这时候比较new vnode和old vnode，然后更新真实dom



