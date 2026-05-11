# 源极科技官网 - 后台操作 SOP 及部署信息文档

## 1. 系统访问地址与账号信息

| 平台层级 | 访问地址 | 说明 |
| :--- | :--- | :--- |
| **公网前台** | [http://www.originapex.cn](http://www.originapex.cn) 或 [http://originapex.cn](http://originapex.cn) | 对外公开的客户访问主入口 |
| **后端 API** | `http://www.originapex.cn/api` | 提供给前端调用的接口 (例如 `/api/news`) |
| **管理后台** | [http://www.originapex.cn/admin](http://www.originapex.cn/admin) | 内部运营管理控制台入口 |

### 🔑 默认管理员账号密码
> **注意**：为了防止越权访问，请勿向外人泄露此密码。如需修改，请直接修改服务端 `server/src/routes/auth.js` 里的默认密码 `ADMIN_PASSWORD` 变量，重启 PM2 即可生效。

- **账号**：`admin`
- **密码**：`originx2026`

---

## 2. 运营操作标准流程 (SOP)

### 2.1 客户“合作联系”线索处理
1. 访问后台 `[域名]/admin` 并登录。
2. 点击左侧菜单**「客户需求表单」**。
3. 列表中会按时间倒序展示客户从首页底部提交的姓名、公司、联系方式及具体需求。
4. **状态管理**：新提交的数据默认高亮显示“未读 (Unread)”状态。一旦您安排架构师联络了客户，请点击右侧的**「标为已处理 (Mark as Read)」**按钮进行归档。

### 2.2 “源极视界”文章发布
1. 点击左侧菜单**「资讯内容管理」**。
2. 点击**「新建文章 (Create News)」**。
3. **上传封面**：如果您的文章带有头图，可以点击上传。图片会自动存储在服务器并返回链接。
4. **编辑内容**：支持完整的 Markdown 语法。
5. **发布逻辑**：
   - 勾选为“草稿 (Draft)”并保存时，该文章**不会**出现在官网前台的列表中，仅存在于后台数据库。
   - 勾选为“已发布 (Published)”并保存时，该文章会立即同步更新到官网前台。

### 2.3 全站文案配置修改 (JSON 模式)
1. 访问**「全站页面配置」**。
2. **首页内容替换**：选中 `home_hero` 键。您可以直接在右侧的 JSON 编辑器里修改首页的大标题（`title`）、关键词数组（`keywords`）和描述段落（`description`）。
3. **SEO 标题修改**：选中 `global_seo` 键。您可以修改默认的网站 Title、Description 和各类 OpenGraph 标签信息。
4. **保存生效**：点击【保存更改】后，刷新前台网页，修改立即生效（无需重新部署代码）。

---

## 3. 服务器部署与运维信息

### 3.1 腾讯云服务器基础信息
- **公网 IP**：`124.222.88.25`
- **系统环境**：Ubuntu 24.04 LTS
- **SSH 登录凭证**：
  - 用户名：`ubuntu`
  - 密钥文件：`/Users/cs/Desktop/CS/AI/FWQ_sshkey/cs_fwq.pem` (您的本地电脑路径)

#### 快速连接服务器的命令（Mac 终端）：
```bash
ssh -i /Users/cs/Desktop/CS/AI/FWQ_sshkey/cs_fwq.pem ubuntu@124.222.88.25
```

### 3.2 部署目录结构
您的源极科技项目被放置在云服务器的 `/var/www/originx/` 目录下：
- `/var/www/originx/frontend/`：**存放打包好的 React 静态前台页面 (`dist` 内容)**。
- `/var/www/originx/backend/`：**存放 Node.js 后端源代码与 SQLite 数据库文件**。

### 3.3 Nginx (代理网关) 维护
Nginx 负责将请求转发至前端静态文件或后端 PM2 服务。
- **配置文件位置**：`/etc/nginx/sites-available/originx`
- **重启 Nginx（修改配置后必须执行）**：`sudo systemctl restart nginx`
- **查看运行状态**：`sudo systemctl status nginx`

### 3.4 PM2 (Node.js 进程守护) 维护
后端由 PM2 在后台 24 小时进程守护运行，确保其崩溃自启。
- **重启后端服务**：`pm2 restart originx-backend`
- **查看后端运行日志（排查接口报错极其有用）**：`pm2 logs originx-backend`
- **查看后端服务运行状态/内存占用**：`pm2 status`

### 3.5 数据库定期备份建议
系统所有的文字、配置和图片，本质上就是以下两个数据源，**建议每隔几周用 SFTP 下载到本地以防服务器重置**：
1. **核心数据库文件**：`/var/www/originx/backend/data/database.sqlite` (体积极小，不到 1MB)
2. **后台上传的图片**：`/var/www/originx/backend/public/uploads/` 目录里的文件。

官网前台地址：http://124.222.88.25:8080
管理后台地址：http://124.222.88.25:8080/admin
后端 API 接口：统一反向代理在 http://124.222.88.25:8080/api/...