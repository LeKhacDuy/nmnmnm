# 📊 Near Me — Đánh giá Khả thi & Tiến độ Dự án

> Phân tích dựa trên **4 file spec trong `doc_new/`** đối chiếu với **codebase hiện tại**.
> Ngày đánh giá: 31/03/2026

---

## 1. Tổng quan

### Dự án muốn gì (theo doc_new)?

Near Me là một **Behavior Decision System** — hệ thống ra quyết định theo hành vi đời sống:
- **Discovery Layer**: SEO + GPS thu hút người dùng có nhu cầu thật
- **Decision Layer**: AI/Chatbot chọn **Top 3 địa điểm** phù hợp nhất trong <25 giây
- **Learning Loop**: Hệ thống tự học từ hành vi thực tế để thông minh hơn theo thời gian
- **Zone Strategy**: Triển khai theo khu vực, bắt đầu từ Hồ Con Rùa – Q1

### Hiện tại đang có gì?

Một **SPA frontend (Vite + React)** hoạt động như **cổng chuyển hướng nền tảng**:
- Người dùng tìm kiếm → redirect sang Google Maps, TikTok, ChatGPT, Shopee...
- Có GPS, i18n (vi/en), Firebase Auth, Location Modal
- **KHÔNG có**: Backend, Database, AI/Chatbot, Decision Engine, Feedback loop

---

## 2. Tiến độ chi tiết theo Module

### 🔍 Discovery Layer (SEO + GPS) — `~25%`

```
████████░░░░░░░░░░░░░░░░░░░░░░░░ 25%
```

| Hạng mục | Spec yêu cầu | Hiện tại | Gap |
|----------|---------------|----------|-----|
| GPS/Vị trí | ✅ Bật vị trí, session ẩn danh, bán kính | ✅ Có LocationContext, reverse geocode, radius selector | ✅ Khá tốt |
| Chọn khu vực thủ công | ✅ Quận/phường khi từ chối GPS | ✅ Có LocationModal với provinces/districts | ✅ Có |
| SEO pages (ngành) | ✅ Trang /an-uong, /spa, /nha-khoa... | ⚠️ Chỉ có CategoryPage generic | ❌ Thiếu nội dung SEO 300-500 chữ |
| SEO pages (khu vực) | ✅ Trang /quan-1, /phu-nhuan... | ❌ Không có | ❌ Thiếu hoàn toàn |
| Entity pages (địa điểm) | ✅ Trang riêng mỗi địa điểm | ❌ Không có | ❌ Thiếu hoàn toàn |
| Homepage Hero | ✅ "Không biết đi đâu?" + CTA | ⚠️ Có hero nhưng nội dung chưa đúng spec | ⚠️ Cần sửa |
| Intent Buttons | ✅ "Ăn nhanh", "Cafe ngồi lâu"... → mở chatbot | ❌ Không có | ❌ Thiếu |
| Decision Overlay | ✅ Hiện trên mọi trang ngành/khu vực | ❌ Không có | ❌ Thiếu |
| Floating "Hỏi Near Me" | ✅ Button luôn hiển thị | ❌ Không có | ❌ Thiếu |

---

### 🤖 Decision Layer (AI/Chatbot) — `~0%`

```
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  0%
```

| Hạng mục | Spec yêu cầu | Hiện tại | Gap |
|----------|---------------|----------|-----|
| Chatbot UI (Webchat) | ✅ Hộp chat trên web | ❌ Không có | ❌ **Cần xây mới** |
| AI Flow 6 bước | ✅ Context → Classify → Engine → Output → Action → Feedback | ❌ Không có | ❌ **Cần xây mới** |
| Thuật toán Top 3 | ✅ Score = distance + open_now + context + speed + reliability | ❌ Không có | ❌ **Cần xây mới** |
| Channel (Messenger/Zalo) | ✅ Webhook inbound/outbound | ❌ Không có | ⏳ Phase sau |
| Decision Overlay | ✅ CTA "Hỏi Near Me" trên mọi trang | ❌ Không có | ❌ Thiếu |
| Feedback sau 45-60 phút | ✅ Async question | ❌ Không có | ❌ **Cần backend** |

> [!CAUTION]
> **Decision Layer là sản phẩm chính** theo spec. Hiện tại = 0%. Đây là gap lớn nhất.

---

### ⚙️ Backend Services — `~0%`

```
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  0%
```

| Hạng mục | Spec yêu cầu | Hiện tại | Gap |
|----------|---------------|----------|-----|
| API Gateway | ✅ Rate limit, versioning, auth | ❌ Không có backend | ❌ **Cần xây mới** |
| Decision Engine | ✅ Stateless service, /recommend | ❌ Không có | ❌ **Cần xây mới** |
| Location Service | ✅ Zone detection, bán kính | ❌ Đang dùng Nominatim client-side | ❌ Cần server-side |
| Places Service | ✅ Cache 30s, danh sách ứng viên | ❌ Đang dùng static data files | ❌ **Cần xây mới** |
| Feedback Service | ✅ Async worker | ❌ Không có | ❌ **Cần xây mới** |
| 8 API Endpoints | ✅ /session/start, /recommend, /accept... | ❌ 0/8 endpoints | ❌ **Cần xây mới** |
| Redis session | ✅ TTL 24h, correlation_id | ❌ Không có | ❌ Cần setup |
| Queue/Worker | ✅ Feedback delay, retry webhook | ❌ Không có | ⏳ Phase sau |
| Fallback | ✅ Circuit breaker, Quick Finder | ❌ Không có | ⏳ Phase sau |

> [!IMPORTANT]
> Hiện tại app **100% client-side** (SPA + Firebase). Spec yêu cầu **full backend architecture** với PostgreSQL, Redis, Queue system. Đây là thay đổi kiến trúc lớn nhất.

---

### 🗄️ Data Model — `~5%`

```
██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  5%
```

| Hạng mục | Spec yêu cầu | Hiện tại | Gap |
|----------|---------------|----------|-----|
| PostgreSQL DB | ✅ 8 bảng | ❌ Chỉ có Firebase Firestore (cho auth) | ❌ **Cần setup** |
| Bảng `places` | ✅ Tọa độ, scores, giờ mở cửa | ⚠️ Có static data files (categories.js, locations.js) nhưng sai format | ❌ Cần migration |
| Bảng `place_tags` | ✅ quick/chill/group/late/emergency | ❌ Không có | ❌ Thiếu |
| Bảng `sessions` | ✅ Ẩn danh, GPS per session | ❌ Không lưu sessions | ❌ Thiếu |
| Bảng `decisions` | ✅ Mỗi lần gợi ý 3 nơi | ❌ Không có | ❌ Thiếu |
| Bảng `decision_candidates` | ✅ Training data cho AI | ❌ Không có | ❌ **Quan trọng nhất** |
| Bảng `accepts` | ✅ Lựa chọn thực tế | ❌ Không có | ❌ Thiếu |
| Bảng `feedback` | ✅ good/neutral/bad | ❌ Không có | ❌ Thiếu |
| Bảng `zones` | ✅ Khu vực triển khai | ❌ Không có | ❌ Thiếu |
| Data Hygiene rules | ✅ Tự động làm sạch | ❌ Không có | ⏳ Phase sau |
| Data Intake Pipeline | ✅ TikTok → Maps → FB | ❌ Không có | ⏳ Phase sau |
| Seed 30-80 địa điểm | ✅ Core Zone data | ❌ Static data không đúng format | ❌ **Cần nghiên cứu thực địa** |

---

### 📊 Metrics & Learning Loop — `~0%`

```
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  0%
```

| Hạng mục | Spec yêu cầu | Hiện tại |
|----------|---------------|----------|
| 7 Core KPIs | ✅ Repeat, Same-day, Decision Time... | ❌ Không track gì |
| Event Tracking | ✅ Structured JSON logs | ❌ Không có |
| Learning Loop | ✅ accept → feedback → update ranking | ❌ Không có |
| Dashboard | ✅ Metrics theo ngày | ❌ Không có |
| Alert system | ✅ Cảnh báo khi metrics giảm | ❌ Không có |

---

### 🗺️ Zone Strategy — `~0%`

```
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  0%
```

Spec yêu cầu Core Zone = Hồ Con Rùa (~1.2km). Hiện tại không có logic phân biệt zone.

---

### 🚀 Deployment & Infrastructure — `~40%`

```
█████████████░░░░░░░░░░░░░░░░░░░░ 40%
```

| Hạng mục | Hiện tại |
|----------|----------|
| Dockerfile | ✅ Multi-stage build (dev + prod) |
| docker-compose | ✅ Có |
| Nginx config | ✅ Có |
| VPS deployment | ✅ Đã deploy |
| 3 môi trường (dev/staging/prod) | ❌ Chỉ có 1 |
| DB migrations | ❌ Không có |
| Canary deploy | ❌ Không có |
| DB backup | ❌ Không có |

---

## 3. Tổng kết tiến độ

```
╔════════════════════════════════════════════════════╗
║  TIẾN ĐỘ TỔNG THỂ:        ~12-15%               ║
╠════════════════════════════════════════════════════╣
║  Discovery Layer (SEO+GPS)  ████████░░░░░░  25%   ║
║  Decision Layer (AI)        ░░░░░░░░░░░░░░   0%   ║
║  Backend Services           ░░░░░░░░░░░░░░   0%   ║
║  Data Model                 █░░░░░░░░░░░░░   5%   ║
║  Metrics & Learning         ░░░░░░░░░░░░░░   0%   ║
║  Zone Strategy              ░░░░░░░░░░░░░░   0%   ║
║  Deployment                 █████░░░░░░░░░  40%   ║
║  Frontend (tái sử dụng)     ██████░░░░░░░░  45%   ║
╚════════════════════════════════════════════════════╝
```

### Những gì tái sử dụng được (~45% frontend):
- ✅ GPS + LocationContext + reverse geocode
- ✅ Hệ thống i18n (LanguageContext)
- ✅ Firebase Auth (có thể dùng tạm)
- ✅ LocationModal + RadiusSelector
- ✅ Header/Footer framework
- ✅ Routing structure (React Router)
- ✅ CSS design system (~64KB đã viết)
- ✅ Docker + Nginx setup

### Những gì cần XÂY MỚI HOÀN TOÀN:
- ❌ **Backend server** (Node.js/Python)
- ❌ **PostgreSQL database** + 8 bảng
- ❌ **Redis** session store
- ❌ **Decision Engine** + thuật toán scoring
- ❌ **Chatbot UI** + AI Flow
- ❌ **8 API endpoints**
- ❌ **Feedback system** (async worker)
- ❌ **Metrics tracking** + dashboard
- ❌ **Seed data** 30-80 địa điểm thực tế

### Những gì cần XOÁ/THAY ĐỔI:
- 🔄 **Search page**: Đang redirect sang nền tảng khác → cần đổi thành Decision UI
- 🔄 **Platform redirect logic**: `platformHelper.js` — đây là concept cũ, spec không muốn redirect
- 🔄 **Static data files**: `categories.js`, `locations.js`... → chuyển sang DB

---

## 4. Đánh giá Khả thi

### ✅ Khả thi về mặt kỹ thuật: **7/10**

| Yếu tố | Đánh giá |
|---------|----------|
| Thuật toán Top 3 | ✅ Đơn giản (weighted scoring), không cần ML phức tạp |
| Backend architecture | ✅ Standard stack (Node/Express + PostgreSQL + Redis) |
| Chatbot flow | ✅ Rule-based đủ cho MVP, không cần GPT ngay |
| GPS + Zone | ✅ Đã có foundation tốt |
| Real-time feedback | ⚠️ Cần worker/scheduler |
| Learning loop | ⚠️ Cần data đủ lớn mới thấy hiệu quả |
| Scale multi-zone | ⚠️ Thiết kế tốt nhưng cần thời gian |

### ⚠️ Rủi ro chính

| Rủi ro | Mức độ | Giải thích |
|--------|--------|------------|
| **Seed data chất lượng** | 🔴 Cao | Cần khảo sát thực tế 30-80 địa điểm Core Zone, gán tag, verify giờ mở cửa. Không tự động được. |
| **Cold start problem** | 🔴 Cao | Decision Engine cần data hành vi để thông minh, nhưng ban đầu chưa có data. |
| **Đội 1 người** | 🔴 Cao | Full-stack + AI + data collection + SEO content = quá nhiều cho 1 người |
| **KPI tham vọng** | 🟡 Trung bình | Same-day return ≥ 20% là rất cao cho sản phẩm mới |
| **Cloud costs** | 🟢 Thấp | PostgreSQL + Redis + VPS ~$20-50/tháng cho MVP |

---

## 5. Lộ trình đề xuất — Bước tiếp theo

### Phase 1: Backend Foundation (Tuần 1-3)
> **Mục tiêu: API hoạt động + DB có seed data**

- [ ] Chọn backend stack (Node.js/Express hoặc Python/FastAPI)
- [ ] Setup PostgreSQL + tạo 8 bảng theo schema File #3
- [ ] Setup Redis cho sessions
- [ ] Implement 4 API endpoints cốt lõi:
  - `POST /v1/session/start`
  - `POST /v1/recommend`
  - `POST /v1/decision/accept`
  - `GET /v1/places/nearby`
- [ ] Khảo sát thực tế + seed 30-50 địa điểm Core Zone (Hồ Con Rùa)
- [ ] Implement Decision Engine v1 (weighted scoring)
- [ ] Docker-compose: thêm PostgreSQL + Redis containers

### Phase 2: Chatbot + Frontend Pivot (Tuần 4-6)
> **Mục tiêu: Chatbot hoạt động trên web**

- [ ] Xây Chatbot UI component (floating widget)
- [ ] Implement AI Flow 6 bước (rule-based)
- [ ] Sửa Homepage theo spec (Intent Buttons, Decision Overlay)
- [ ] Thêm Floating "Hỏi Near Me" button
- [ ] Connect frontend → backend API
- [ ] Xoá/ẩn platform redirect logic (giữ Quick Finder mode)

### Phase 3: Metrics + Feedback (Tuần 7-9)
> **Mục tiêu: Hệ thống tự học**

- [ ] Implement Event Tracking (structured logs)
- [ ] Implement Feedback Service (async worker, delay 45-60 phút)
- [ ] Implement Learning Loop (accept/reject → update reliability_score)
- [ ] Tạo Dashboard metrics cơ bản
- [ ] Implement Data Hygiene rules
- [ ] Thêm `POST /v1/feedback/submit` + `POST /v1/chat/message`

### Phase 4: SEO + Zone Expansion (Tuần 10-12)
> **Mục tiêu: Mở rộng nếu KPI đạt**

- [ ] Tạo SEO pages (trang ngành, trang khu vực)
- [ ] Viết SEO content 300-500 chữ/trang
- [ ] Implement Zone logic (trong/ngoài core)
- [ ] Setup staging environment
- [ ] Monitor KPIs 2-3 tuần liên tiếp
- [ ] Nếu đạt → seed zone tiếp theo

---

## 6. Khuyến nghị ngay bây giờ

> [!IMPORTANT]
> **Việc cần làm NGAY (tuần này):**
> 1. **Chọn backend stack** — Node.js/Express (vì đã quen JS) hay Python/FastAPI (tốt hơn cho AI sau này)?
> 2. **Setup PostgreSQL** locally + tạo schema 8 bảng
> 3. **Khảo sát thực tế** Hồ Con Rùa: đi thực địa, ghi chép 30-50 địa điểm, gán tag hành vi
> 4. **Quyết định chatbot approach**: Rule-based (nhanh, đủ MVP) hay dùng LLM API (mạnh hơn, tốn tiền)?

> [!WARNING]
> **Điều chỉnh kỳ vọng:**
> - Spec viết rất chi tiết và tham vọng → đúng hướng nhưng cần **12-16 tuần** cho MVP
> - Không nên vội bỏ platform redirect — giữ như **Quick Finder fallback** cho vùng ngoài Core Zone
> - Nên có **ít nhất 1 người nữa** (backend hoặc data) để đạt tiến độ hợp lý
