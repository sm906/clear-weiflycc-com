# 毅澄環保管理中心 V1

## 網域

clear.weiflycc.com

---

## 技術架構

- React
- Vite
- TypeScript
- TailwindCSS
- Hono
- Cloudflare Workers
- Cloudflare D1
- JWT Login

---

## 使用者角色

- admin
- manager
- leader
- employee

---

## 功能模組

- 登入頁
- Dashboard
- 員工管理
- 區域管理
- 排班管理
- 休假管理
- 國定假日管理
- 報表中心
- 系統設定

---

## 員工類型

- 固定區域
- 替班
- 機動
- 新進

---

## 員工狀態

- 在職
- 離職
- 留停

離職人員保留歷史資料

離職與留停不參與排班

---

## 區域管理規則

每區僅允許：

- 1 位主責人員

例外：

新進人員受訓期間

允許：

- 主責人員
- 新進人員

最多 2 人

---

## 休假規則

每月應休天數

=
當月星期六數量
+
當月星期日數量

每位員工：

可自選 3 天輪休

若未選滿：

由系統自動補足

若完全未送：

全部交由系統排定

---

## 國定假日規則

建立 holidays 資料表

連休計算：

- 國定假日
- 星期六
- 星期日
- 輪休

合併統計

超過連續 3 天：

建立警示

主管可強制核准

---

## 排班規則

優先順序：

1. 替班
2. 機動
3. 主管指定

---

## 區域補位規則

任何區域不得空班

主責人休假：

系統自動補位

順序：

替班
↓

機動
↓

主管處理

---

## Dashboard

顯示：

- 固定區域人數
- 替班人數
- 機動人數
- 總在職人數
- 待審核休假
- 今日代班
- 今日機動支援
- 空班區域

---

## 資料表

### users

- id
- username
- password_hash
- display_name
- role
- active
- created_at

### employees

- id
- employee_code
- name
- employee_type
- status
- mentor_id
- hire_date
- leave_date

### areas

- id
- area_code
- area_name
- active

### area_assignments

- id
- area_id
- primary_employee_id
- trainee_employee_id

### holidays

- id
- holiday_date
- holiday_name

### leave_requests

- id
- employee_id
- leave_date
- approved
- remark

### leave_exceptions

- id
- employee_id
- leave_date
- approved_by
- remark

### schedules

- id
- work_date
- area_id
- employee_id
- substitute_employee_id
- status

### system_rules

- id
- rule_key
- rule_value

### schedule_warnings

- id
- employee_id
- work_date
- warning_type
- message

---

## AutoScheduler

generateMonthlySchedule(
year,
month
)

流程：

1. 取得員工
2. 取得區域
3. 取得國定假日
4. 統計當月六日
5. 計算應休天數
6. 套用自選休假
7. 補足剩餘休假
8. 檢查國定假日
9. 檢查連續休假
10. 檢查區域空班
11. 優先派替班
12. 派機動支援
13. 建立主管處理清單
14. 產生建議班表

---

## 系統原則

所有自動產生結果：

為建議班表

主管：

可任意修改

可任意覆寫

最終班表：

由主管決定

---

## 專案結構

frontend/
backend/
database/

---

## 前端

React Router

頁面：

- Login
- Dashboard
- Employees
- Areas
- Holidays
- Leaves
- Schedules
- Reports
- Settings

---

## 後端

Hono API

JWT Authentication

REST API

---

## 資料庫

Cloudflare D1

---

## 部署

Cloudflare Pages

Cloudflare Workers

Cloudflare D1

---

## UI

繁體中文

手機優先

支援桌面版

TailwindCSS
