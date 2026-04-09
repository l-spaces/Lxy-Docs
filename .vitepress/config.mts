import { defineConfig } from 'vitepress';

export default defineConfig({
  base: '/Lxy-Docs/',
  lang: 'zh-CN',
  title: 'Lxy-Vue-Admin',
  titleTemplate: ':title | Lxy-Vue-Admin 文档',
  description: '基于 Vben Admin 5 与 antdv-next 的企业级中后台项目文档',

  head: [
    ['meta', { charset: 'utf8' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    ['meta', { name: 'theme-color', content: '#1890ff' }],
    ['meta', { name: 'author', content: 'Lxy-Vue-Admin Team' }],
    [
      'meta',
      {
        name: 'keywords',
        content: 'Vue,Admin,Vben,Ant Design,TypeScript,中后台,管理系统',
      },
    ],
    ['link', { rel: 'icon', href: '/images/logo.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'apple-touch-icon', href: '/images/logo.svg' }],
  ],

  sitemap: {
    hostname: 'https://l-spaces.github.io/Lxy-Docs/',
    lastmodDateOnly: true,
  },

  themeConfig: {
    logo: '/images/logo.svg',
    siteTitle: 'Lxy-Vue-Admin',

    editLink: {
      pattern: 'https://gitee.com/my_spaces/lxy-vue-admin/edit/main/:path',
      text: '在 Gitee 上编辑此页',
    },

    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/scripts/web/guide/README' },
      { text: '接口', link: '/scripts/web/api/README' },
      { text: '组件', link: '/scripts/web/components/README' },
      {
        text: '工程文档',
        items: [
          { text: '分析', link: '/scripts/web/analysis/README' },
          { text: '开发', link: '/scripts/web/development/README' },
          { text: '部署', link: '/scripts/web/deployment/README' },
          { text: '维护', link: '/scripts/web/maintenance/README' },
        ],
      },
      { text: '索引', link: '/scripts/web/reference/README' },
      { text: '更新日志', link: '/scripts/web/changelog/CHANGELOG' },
      { text: '后端', link: '/scripts/java/explain/README' },
    ],

    sidebar: {
      '/scripts/web/guide/': [
        {
          text: '阅读入口',
          items: [
            { text: '总览', link: '/scripts/web/guide/README' },
            { text: '项目概述', link: '/scripts/web/guide/01-项目概述' },
            { text: '环境配置指南', link: '/scripts/web/guide/02-环境配置指南' },
            { text: '架构设计说明', link: '/scripts/web/guide/03-架构设计说明' },
            { text: '核心模块功能详解', link: '/scripts/web/guide/04-核心模块功能详解' },
            { text: '内部工具与配置', link: '/scripts/web/guide/05-仓库内部工具与配置' },
            { text: '开发规范', link: '/scripts/web/guide/06-开发规范' },
            { text: '常见问题解决方案', link: '/scripts/web/guide/07-常见问题解决方案' },
          ],
        },
      ],
      '/scripts/web/api/': [
        {
          text: '阅读入口',
          items: [
            { text: '总览', link: '/scripts/web/api/README' },
            { text: 'API 接口文档', link: '/scripts/web/api/05-API接口文档' },
            { text: '请求层封装', link: '/scripts/web/api/请求层封装' },
            { text: 'API 模块组织', link: '/scripts/web/api/API模块组织' },
            { text: '核心接口说明', link: '/scripts/web/api/核心接口说明' },
          ],
        },
      ],
      '/scripts/web/components/': [
        {
          text: '阅读入口',
          items: [
            { text: '总览', link: '/scripts/web/components/README' },
            { text: '组件介绍', link: '/scripts/web/components/introduction' },
            { text: '应用层组件体系', link: '/scripts/web/components/应用层组件体系' },
          ],
        },
        {
          text: '通用组件',
          collapsed: false,
          items: [
            { text: '通用组件总览', link: '/scripts/web/components/common-ui/vben-common-ui' },
            { text: '场景页面', link: '/scripts/web/components/common-ui/scene-ui' },
            { text: 'Shadcn UI', link: '/scripts/web/components/common-ui/shadcn-ui' },
            { text: '表单能力', link: '/scripts/web/components/common-ui/vben-form' },
            { text: '提示弹窗', link: '/scripts/web/components/common-ui/vben-alert' },
            { text: '模态弹窗', link: '/scripts/web/components/common-ui/vben-modal' },
            { text: '抽屉弹窗', link: '/scripts/web/components/common-ui/vben-drawer' },
            { text: '菜单能力', link: '/scripts/web/components/common-ui/vben-menu' },
            { text: '标签页能力', link: '/scripts/web/components/common-ui/vben-tabs' },
            { text: '插件能力', link: '/scripts/web/components/common-ui/vben-plugins' },
            { text: 'VxeTable 表格', link: '/scripts/web/components/common-ui/vben-vxe-table' },
            { text: 'API 组件', link: '/scripts/web/components/common-ui/vben-api-component' },
            { text: '数字动画', link: '/scripts/web/components/common-ui/vben-count-to-animator' },
            { text: '省略文本', link: '/scripts/web/components/common-ui/vben-ellipsis-text' },
            { text: '验证码', link: '/scripts/web/components/common-ui/captcha' },
            { text: '代码编辑器', link: '/scripts/web/components/common-ui/code-mirror' },
            { text: '分栏页面', link: '/scripts/web/components/common-ui/col-page' },
            { text: '图片裁剪', link: '/scripts/web/components/common-ui/cropper' },
            { text: '图标选择器', link: '/scripts/web/components/common-ui/icon-picker' },
            { text: 'JSON 预览', link: '/scripts/web/components/common-ui/json-preview' },
            { text: 'JSON 查看器', link: '/scripts/web/components/common-ui/json-viewer' },
            { text: '加载态', link: '/scripts/web/components/common-ui/loading' },
            { text: 'Markdown', link: '/scripts/web/components/common-ui/markdown' },
            { text: '页面容器', link: '/scripts/web/components/common-ui/page' },
            { text: '拖拽缩放', link: '/scripts/web/components/common-ui/resize' },
            { text: 'Tippy 提示器', link: '/scripts/web/components/common-ui/tippy' },
            { text: '树组件', link: '/scripts/web/components/common-ui/tree' },
          ],
        },
        {
          text: '布局组件',
          items: [
            { text: '布局系统', link: '/scripts/web/components/layout-ui/vben-layout-system' },
          ],
        },
      ],
      '/scripts/web/development/': [
        {
          text: '阅读入口',
          items: [
            { text: '总览', link: '/scripts/web/development/README' },
            { text: '常用命令', link: '/scripts/web/development/常用命令' },
            { text: '本地开发与联调', link: '/scripts/web/development/本地开发与联调' },
            { text: '分支与提交规范', link: '/scripts/web/development/分支与提交规范' },
          ],
        },
      ],
      '/scripts/web/deployment/': [
        {
          text: '阅读入口',
          items: [
            { text: '总览', link: '/scripts/web/deployment/README' },
            { text: '环境变量与代理', link: '/scripts/web/deployment/环境变量与代理' },
            { text: '构建与部署', link: '/scripts/web/deployment/构建与部署' },
          ],
        },
      ],
      '/scripts/web/maintenance/': [
        {
          text: '阅读入口',
          items: [
            { text: '总览', link: '/scripts/web/maintenance/README' },
            { text: '常见排障', link: '/scripts/web/maintenance/常见排障' },
            { text: '依赖升级与日常维护', link: '/scripts/web/maintenance/依赖升级与日常维护' },
          ],
        },
      ],
      '/scripts/web/reference/': [
        {
          text: '阅读入口',
          items: [
            { text: '总览', link: '/scripts/web/reference/README' },
            { text: '文档目录', link: '/scripts/web/reference/文档目录' },
            { text: '阅读入口', link: '/scripts/web/reference/阅读入口' },
            { text: '文档关系', link: '/scripts/web/reference/文档关系' },
          ],
        },
      ],
      '/scripts/web/analysis/': [
        {
          text: '阅读入口',
          items: [
            { text: '总览', link: '/scripts/web/analysis/README' },
            { text: '文档治理分析', link: '/scripts/web/analysis/文档治理分析' },
            { text: 'package.json 对比分析', link: '/scripts/web/analysis/package.json%20对比分析' },
            { text: '登录页面架构分析', link: '/scripts/web/analysis/登录页面架构分析' },
          ],
        },
      ],
      '/scripts/web/changelog/': [
        {
          text: '更新记录',
          items: [{ text: '更新日志', link: '/scripts/web/changelog/CHANGELOG' }],
        },
      ],
      '/scripts/java/explain/': [
        {
          text: '阅读入口',
          items: [
            { text: '总览', link: '/scripts/java/explain/README' },
            { text: '项目整体架构说明', link: '/scripts/java/explain/项目整体架构说明' },
            { text: '启动与部署说明', link: '/scripts/java/explain/启动与部署说明' },
            { text: '核心配置项说明', link: '/scripts/java/explain/核心配置项说明' },
            { text: '数据库与基础设施说明', link: '/scripts/java/explain/数据库与基础设施说明' },
          ],
        },
        {
          text: '模块总览',
          collapsed: false,
          items: [
            { text: 'lxy-admin', link: '/scripts/java/explain/lxy-admin代码结构说明' },
            { text: 'lxy-common模块总览', link: '/scripts/java/explain/lxy-common模块总览' },
            { text: 'lxy-demo', link: '/scripts/java/explain/lxy-demo代码结构说明' },
            { text: 'lxy-generator', link: '/scripts/java/explain/lxy-generator代码结构说明' },
            { text: 'lxy-job', link: '/scripts/java/explain/lxy-job代码结构说明' },
            { text: 'lxy-monitor-admin', link: '/scripts/java/explain/lxy-monitor-admin代码结构说明' },
            { text: 'lxy-snailjob-server', link: '/scripts/java/explain/lxy-snailjob-server代码结构说明' },
            { text: 'lxy-system', link: '/scripts/java/explain/lxy-system代码结构说明' },
            { text: 'lxy-workflow', link: '/scripts/java/explain/lxy-workflow代码结构说明' },
          ],
        },
        {
          text: 'common 子模块',
          collapsed: false,
          items: [
            { text: 'lxy-common-bom', link: '/scripts/java/explain/lxy-common-bom代码结构说明' },
            { text: 'lxy-common-core', link: '/scripts/java/explain/lxy-common-core代码结构说明' },
            { text: 'lxy-common-doc', link: '/scripts/java/explain/lxy-common-doc代码结构说明' },
            { text: 'lxy-common-encrypt', link: '/scripts/java/explain/lxy-common-encrypt代码结构说明' },
            { text: 'lxy-common-excel', link: '/scripts/java/explain/lxy-common-excel代码结构说明' },
            { text: 'lxy-common-idempotent', link: '/scripts/java/explain/lxy-common-idempotent代码结构说明' },
            { text: 'lxy-common-job', link: '/scripts/java/explain/lxy-common-job代码结构说明' },
            { text: 'lxy-common-json', link: '/scripts/java/explain/lxy-common-json代码结构说明' },
            { text: 'lxy-common-log', link: '/scripts/java/explain/lxy-common-log代码结构说明' },
            { text: 'lxy-common-mail', link: '/scripts/java/explain/lxy-common-mail代码结构说明' },
            { text: 'lxy-common-mybatis', link: '/scripts/java/explain/lxy-common-mybatis代码结构说明' },
            { text: 'lxy-common-oss', link: '/scripts/java/explain/lxy-common-oss代码结构说明' },
            { text: 'lxy-common-ratelimiter', link: '/scripts/java/explain/lxy-common-ratelimiter代码结构说明' },
            { text: 'lxy-common-redis', link: '/scripts/java/explain/lxy-common-redis代码结构说明' },
            { text: 'lxy-common-satoken', link: '/scripts/java/explain/lxy-common-satoken代码结构说明' },
            { text: 'lxy-common-security', link: '/scripts/java/explain/lxy-common-security代码结构说明' },
            { text: 'lxy-common-sensitive', link: '/scripts/java/explain/lxy-common-sensitive代码结构说明' },
            { text: 'lxy-common-sms', link: '/scripts/java/explain/lxy-common-sms代码结构说明' },
            { text: 'lxy-common-social', link: '/scripts/java/explain/lxy-common-social代码结构说明' },
            { text: 'lxy-common-sse', link: '/scripts/java/explain/lxy-common-sse代码结构说明' },
            { text: 'lxy-common-tenant', link: '/scripts/java/explain/lxy-common-tenant代码结构说明' },
            { text: 'lxy-common-translation', link: '/scripts/java/explain/lxy-common-translation代码结构说明' },
            { text: 'lxy-common-websocket', link: '/scripts/java/explain/lxy-common-websocket代码结构说明' },
            { text: 'lxy-common-web', link: '/scripts/java/explain/lxy-common-web代码结构说明' },
          ],
        },
      ],
      '/scripts/': [
        {
          text: '文档中心',
          items: [
            { text: '总览', link: '/scripts/README' },
            { text: '指南', link: '/scripts/web/guide/README' },
            { text: '接口', link: '/scripts/web/api/README' },
            { text: '组件', link: '/scripts/web/components/README' },
            { text: '分析', link: '/scripts/web/analysis/README' },
            { text: '开发', link: '/scripts/web/development/README' },
            { text: '部署', link: '/scripts/web/deployment/README' },
            { text: '维护', link: '/scripts/web/maintenance/README' },
            { text: '索引', link: '/scripts/web/reference/README' },
            { text: '更新日志', link: '/scripts/web/changelog/CHANGELOG' },
            { text: '后端', link: '/scripts/java/explain/README' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://gitee.com/my_spaces/lxy-vue-admin', ariaLabel: 'Gitee' },
    ],

    footer: {
      message: '基于 MIT 许可证发布',
      copyright: 'Copyright © 2026 Lxy-Vue-Admin Team',
    },

    search: {
      provider: 'local',
      options: {
        detailedView: true,
      },
    },

    outline: {
      level: [2, 3],
      label: '页面导航',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short',
      },
    },

    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    externalLinkIcon: true,
  },

  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true,
    },
  },

  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,

  vite: {
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/chunks/[name]-[hash].js',
        },
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  },
});
