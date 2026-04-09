# lxy-common-web 代码结构说明

## 1. 文档主题概述

`lxy-common-web` 提供 MVC 基础设施、验证码、XSS 过滤、重复读取请求体、国际化和全局异常处理，是大多数 Web 模块都会直接依赖的基础模块。

## 2. 对应源码位置

- ` /lxy-common/lxy-common-web/src/main/java/cn/com/lxy/common/web`

## 3. 核心内容梳理

### 3.1 MVC 基础设施

- `ResourcesConfig`
- `I18nConfig`
- `UndertowConfig`
- `BaseController`
- `GlobalExceptionHandler`

### 3.2 验证码

- `CaptchaConfig`
- `CaptchaProperties`
- `WaveAndCircleCaptcha`

### 3.3 过滤器

- `FilterConfig`
- `RepeatableFilter`
- `XssFilter`
- `XssProperties`

## 4. 关键实现说明

- `FilterConfig` 会注册重复读取请求体过滤器，JSON 请求可重复读取。
- `xss.enabled=true` 时会启用 `XssFilter`。
- `ResourcesConfig` 注册了全局访问耗时拦截器、日期转换器和 CORS 配置。
- `I18nConfig` 使用 `content-language` 请求头做语言解析。
- `UndertowConfig` 会禁用 `CONNECT` / `TRACE` / `TRACK` 等不安全方法。

## 5. 使用方式或示例

`BaseController` 常见用法：

```java
public class SysDeptController extends BaseController {
    @PostMapping
    public R<Void> add(@RequestBody SysDeptBo bo) {
        return toAjax(service.insertByBo(bo));
    }
}
```

验证码开关由 `captcha.enable` 控制，验证码内容由 `CaptchaController` 使用。

## 6. 注意事项

- `RepeatableFilter` 只对 `application/json` 请求体生效。
- `XssFilter` 默认不拦截 `GET` 和 `DELETE`。
- `GlobalExceptionHandler` 已经覆盖了常见校验、JSON 解析和 `SseException` 场景。

## 7. 待确认项

- `WaveAndCircleCaptcha` 的绘图细节和字体策略在当前文档里不展开，后续如需定制样式再单独补充。
