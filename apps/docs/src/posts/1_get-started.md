---
title: 🏃‍♂️ Get Started
description: 請遵照以下步驟以開始使用！
date: '2024-10-10'
published: true
---

- `<project_name>` 代表你的專案名稱，你可以自己改成想要的名字

## 前置作業 Prerequisite

請先確定你已經安裝以下軟體

- Git
- Bun
- Pocketbase (optional)

## 安裝 Installation

```shell title="in your terminal"
git clone https://github.com/2enter-studio/project-starter <project_name>
cd <project_name>
rm -rf ./.git
bun install
cp .env.example .env
```

## 設置 Setup

請更改下列檔案的內容

```json title="/package.json"
{
    ...
	"name": "<project_name>",
    ...
}
```

## 開始開發 Start Developing

```shell title="in your terminal"
bun run dev
```
