# How to contribute

## Bootstrap

1. `npm run bootstrap`

## Devlopment and test
1. `npm watch`
2. `npm test:unit`: 单元测试

## Commit and Merge Request

1. `npm run changeset`: 更新 chagneset，Master 分支发包的时候会消费
1. `git-cz`

## Document
1. `npm run doc:api`: 构建 API 文档
2. `npm run doc:serve`: 启动本地文档服务
3. `npm run cov`: 构建单元测试覆盖率文档

## Build and publish
1. `npm run build`: 构建资源
2. `npm run version`: 消费 Changeset，升级版本
3. `npm run publish`: 发布 NPM