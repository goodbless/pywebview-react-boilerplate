# 项目命令详细说明文档

本文档详细说明了 pywebview-react-boilerplate 项目中 package.json 中定义的所有脚本命令，包括其用途、工作原理和跨平台兼容性说明。

## 目录
1. [开发相关命令](#开发相关命令)
2. [构建相关命令](#构建相关命令)
3. [初始化命令](#初始化命令)
4. [清理命令](#清理命令)
5. [跨平台兼容性说明](#跨平台兼容性说明)

---

## 开发相关命令

### `yarn run dev`
```json
"dev": "react-scripts start"
```

**用途**：启动 React 开发服务器
**工作原理**：
- 使用 Create React App 的开发服务器
- 默认在 http://localhost:3000 运行
- 支持热重载（Hot Module Replacement）
- 仅用于前端开发测试，不启动 pywebview 窗口

**输出示例**：
```
Compiled successfully!

You can now view react-pywebview-boilerplate in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.100:3000
```

**跨平台兼容性**：✅ 完全兼容

### `yarn run frontend:dev`
```json
"frontend:dev": "cross-env BUILD_PATH=./gui react-scripts build"
```

**用途**：构建前端开发版本到 gui 目录
**工作原理**：
- `cross-env` 设置环境变量 `BUILD_PATH=./gui`
- `react-scripts build` 创建生产构建
- 输出到 `./gui/` 目录而不是默认的 `./build/`
- 为 pywebview 应用程序准备静态文件

**输出示例**：
```
Creating an optimized production build...
Compiled with warnings.

File sizes after gzip:
  47.43 kB  gui\static\js\main.f657ed6d.js
  2.64 kB   gui\static\js\496.0ece9f2d.chunk.js

The gui folder is ready to be deployed.
```

**跨平台兼容性**：✅ 使用 `cross-env` 确保跨平台兼容

### `yarn run frontend:prod`
```json
"frontend:prod": "cross-env BUILD_PATH=./gui react-scripts build"
```

**用途**：构建前端生产版本到 gui 目录
**工作原理**：与 `frontend:dev` 完全相同

**注意**：当前实现中 `frontend:dev` 和 `frontend:prod` 功能相同

### `yarn run frontend:test`
```json
"frontend:test": "react-scripts test"
```

**用途**：运行前端测试套件
**工作原理**：
- 启动 Jest 测试运行器
- 在监视模式下运行，文件变化时自动重新测试
- 交互式测试界面

**跨平台兼容性**：✅ 完全兼容

### `yarn run frontend:eject`
```json
"frontend:eject": "react-scripts eject"
```

**用途**：弹出 Create React App 配置
**工作原理**：
- 将 Create React App 的所有配置文件复制到项目目录
- 允许自定义 Webpack、Babel 等配置
- **不可逆操作**

**⚠️ 警告**：一旦执行，无法撤销

---

## 构建相关命令

### `yarn run build`
```json
"build": "yarn run clean && yarn run frontend:prod && run-script-os"
```

**用途**：构建完整的桌面应用程序
**工作原理**：
1. `yarn run clean`：清理之前的构建文件
2. `yarn run frontend:prod`：构建前端到 gui 目录
3. `run-script-os`：根据操作系统运行相应的构建脚本

**跨平台兼容性**：✅ 使用 `run-script-os` 自动选择平台特定脚本

### 平台特定构建命令

#### `yarn run build:windows`
```json
"build:windows": ".\\venv-pywebview\\Scripts\\pyinstaller build-windows.spec"
```

**用途**：在 Windows 上构建可执行文件
**工作原理**：
- 使用 PyInstaller 打包 Python 应用
- 根据 `build-windows.spec` 配置文件进行打包
- 生成独立的 `.exe` 文件

**输出位置**：`dist/` 目录

**路径说明**：
- `.\\venv-pywebview\\Scripts\\`：Windows 虚拟环境 Python 脚本路径
- 使用反斜杠分隔符，Windows CMD/PowerShell 兼容

#### `yarn run build:macos`
```json
"build:macos": "./venv-pywebview/bin/python build-macos.py py2app"
```

**用途**：在 macOS 上构建应用程序包
**工作原理**：
- 使用 py2app 创建 macOS 应用包
- 通过 `build-macos.py` 脚本执行构建
- 生成 `.app` 应用程序包

#### `yarn run build:linux`
```json
"build:linux": "./venv-pywebview/bin/pyinstaller build-linux.spec --onefile"
```

**用途**：在 Linux 上构建可执行文件
**工作原理**：
- 使用 PyInstaller 打包
- `--onefile` 参数创建单个可执行文件
- 根据 `build-linux.spec` 配置打包

---

## 初始化命令

### `yarn run init`
```json
"init": "yarn install && run-script-os"
```

**用途**：初始化项目开发环境
**工作原理**：
1. `yarn install`：安装 Node.js 依赖
2. `run-script-os`：根据操作系统运行相应的初始化脚本

**跨平台兼容性**：✅ 自动选择平台特定脚本

### 平台特定初始化命令

#### `yarn run init:windows`
```json
"init:windows": "virtualenv -p python venv-pywebview && .\\venv-pywebview\\Scripts\\pip install -r requirements.txt"
```

**用途**：Windows 环境初始化
**工作原理**：
1. 创建名为 `venv-pywebview` 的 Python 虚拟环境
2. 在虚拟环境中安装 requirements.txt 中的 Python 包

**步骤分解**：
- `virtualenv -p python venv-pywebview`：使用系统 Python 创建虚拟环境
- `.\\venv-pywebview\\Scripts\\pip install -r requirements.txt`：在虚拟环境中安装依赖

#### `yarn run init:linux`
```json
"init:linux": "virtualenv -p python3 venv-pywebview && if [[ -z \"${KDE_FULL_SESSION}\" ]]; then yarn run init:qt5; else yarn run init:gtk; fi"
```

**用途**：Linux 环境初始化
**工作原理**：
1. 创建 Python3 虚拟环境
2. 检测桌面环境并安装相应的 GUI 依赖

**智能检测**：
- KDE 桌面：执行 `init:qt5`（安装 Qt5 依赖）
- 其他桌面：执行 `init:gtk`（安装 GTK 依赖）

#### `yarn run init:default`
```json
"init:default": "virtualenv -p python3 venv-pywebview && ./venv-pywebview/bin/pip install -r requirements.txt"
```

**用途**：默认 Unix 系统初始化
**工作原理**：类似 Linux，但不包含 GUI 库自动检测

### GUI 库安装命令

#### `yarn run init:qt5`
```json
"init:qt5": "./venv-pywebview/bin/pip install pyqt5 pyqtwebengine -r requirements.txt"
```

**用途**：安装 Qt5 GUI 库
**适用场景**：KDE 桌面环境或需要 Qt5 的系统

#### `yarn run init:gtk`
```json
"init:gtk": "sudo apt install libgirepository1.0-dev gcc libcairo2-dev pkg-config python3-dev gir1.2-gtk-3.0 && ./venv-pywebview/bin/pip install pycairo pygobject -r requirements.txt"
```

**用途**：安装 GTK GUI 库
**工作原理**：
1. 使用 `apt` 安装系统级 GTK 依赖（需要 sudo 权限）
2. 在虚拟环境中安装 Python GTK 绑定

**系统要求**：Debian/Ubuntu 系统

---

## 启动命令

### `yarn run start`
```json
"start": "yarn run frontend:dev && run-script-os"
```

**用途**：启动完整的桌面应用程序
**工作原理**：
1. `yarn run frontend:dev`：构建前端到 gui 目录
2. `run-script-os`：根据操作系统启动 pywebview 应用

**跨平台兼容性**：✅ 自动选择平台特定启动脚本

### 平台特定启动命令

#### `yarn run start:windows`
```json
"start:windows": ".\\venv-pywebview\\Scripts\\python src\\index.py"
```

**用途**：在 Windows 上启动应用程序
**工作原理**：
- 使用虚拟环境中的 Python 解释器
- 运行 `src/index.py` 主程序

#### `yarn run start:default`
```json
"start:default": "./venv-pywebview/bin/python src/index.py"
```

**用途**：在 Unix 系统上启动应用程序
**工作原理**：与 Windows 版本相同，但使用 Unix 路径分隔符

---

## 清理命令

### `yarn run clean`
```json
"clean": "run-script-os"
```

**用途**：清理构建文件
**工作原理**：使用 `run-script-os` 选择平台特定的清理命令

### 平台特定清理命令

#### `yarn run clean:windows`
```json
"clean:windows": "if exist gui rd /S /Q gui & if exist build rd /S /Q build & if exist dist rd /S /Q dist"
```

**用途**：Windows 平台清理
**工作原理**：使用 Windows CMD 命令删除目录

**命令分解**：
- `if exist gui rd /S /Q gui`：如果 gui 目录存在，递归删除（不询问）
- `&`：命令连接符，顺序执行
- `/S`：递归删除子目录和文件
- `/Q`：安静模式，不询问确认

#### `yarn run clean:default`
```json
"clean:default": "rm -rf gui 2>/dev/null; rm -rf build 2>/dev/null; rm -rf dist 2>/dev/null; "
```

**用途**：Unix 平台清理
**工作原理**：使用 Unix shell 命令删除目录

**命令分解**：
- `rm -rf`：递归强制删除
- `2>/dev/null`：将错误输出重定向到 /dev/null（抑制错误信息）
- `;`：命令分隔符

---

## 跨平台兼容性说明

### 关键依赖

1. **run-script-os** (`^1.1.6`)
   - 自动根据操作系统选择对应的脚本
   - 支持 windows、linux、macos 和 default 四个后缀
   - 优先级：特定平台 > default

2. **cross-env** (`^10.1.0`)
   - 提供跨平台的环境变量设置
   - 解决 Windows PowerShell 不支持 `VAR=value command` 语法的问题

### 平台检测逻辑

`run-script-os` 按以下优先级选择脚本：
1. `{script-name}:{platform}` (精确匹配)
2. `{script-name}:default` (默认选项)
3. 如果都不存在，报错

### 路径处理

| 平台 | 路径分隔符 | 示例 |
|------|------------|------|
| Windows | `\` 或 `/` | `.\venv-pywebview\Scripts\python` |
| Unix | `/` | `./venv-pywebview/bin/python` |

### Shell 语法差异

| 功能 | Windows CMD/PowerShell | Unix Shell |
|------|------------------------|------------|
| 环境变量 | `set VAR=value` 或 `$env:VAR="value"` | `VAR=value` |
| 目录删除 | `rd /S /Q folder` | `rm -rf folder` |
| 文件存在检查 | `if exist file` | `test -f file` 或 `[ -f file ]` |
| 命令连接 | `&` (CMD) 或 `;` (PowerShell) | `;` 或 `&&` |

### 最佳实践

1. **使用 `run-script-os`**：处理平台特定的命令
2. **使用 `cross-env`**：设置环境变量
3. **避免硬编码路径**：使用相对路径
4. **测试所有目标平台**：确保脚本在所有平台上正常工作

---

## 常见问题排查

### 1. "BUILD_PATH 不是内部或外部命令"
**原因**：Windows PowerShell 不支持 Unix 风格的环境变量设置
**解决**：使用 `cross-env`（已在项目中修复）

### 2. 虚拟环境创建失败
**排查步骤**：
1. 确认 Python 已安装并添加到 PATH
2. 检查是否有权限创建目录
3. Windows 用户确认 `virtualenv` 已安装：`pip install virtualenv`

### 3. PyInstaller 构建失败
**排查步骤**：
1. 确认虚拟环境已激活
2. 检查 `.spec` 文件是否存在
3. Windows 用户确认 pyinstaller 已安装

### 4. GUI 应用无法启动
**排查步骤**：
1. 确认前端已构建：检查 `gui/` 目录是否存在
2. 检查 Python 虚拟环境状态
3. 查看控制台错误信息

---

## 使用建议

### 开发工作流
1. **首次设置**：`yarn run init`
2. **日常开发**：`yarn run dev`（仅前端）或 `yarn run start`（完整应用）
3. **测试**：`yarn run frontend:test`
4. **构建**：`yarn run build`

### 部署工作流
1. **清理**：`yarn run clean`
2. **构建**：`yarn run build`
3. **发布**：`dist/` 目录中的文件

### 维护建议
1. 定期更新依赖：`yarn upgrade`
2. 保持虚拟环境干净：定期重建虚拟环境
3. 备份 `.spec` 配置文件，包含自定义配置