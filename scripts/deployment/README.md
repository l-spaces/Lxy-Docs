---
title: 部署指南
description: 环境变量、代理、构建与部署流程入口
---

# 部署指南

## 简介

本分类基于当前仓库的构建命令、Docker/Nginx 配置和文档站点工作流整理。

## 适用范围

- 主应用构建与发布
- 生产环境变量与代理配置
- 文档站点发布

## 对应源码目录或关键文件

- `apps/web-antd/.env.production`
- `apps/web-antd/vite.config.ts`
- `scripts/deploy/Dockerfile`
- `scripts/deploy/build-local-docker-image.sh`
- `scripts/deploy/nginx.conf`
- `.github/workflows/deploy.yml`

## 文档清单

- [环境变量与代理](./环境变量与代理.md)
- [构建与部署](./构建与部署.md)
