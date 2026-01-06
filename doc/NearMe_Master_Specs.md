# MASTER SPECIFICATION: PROJECT "NEAR ME" (GẦN TÔI)
---

## PHẦN 1: DANH MỤC NGÀNH DỊCH VỤ (FULL TOÀN QUỐC)
### I. NGUYÊN TẮC THIẾT KẾ
* [cite_start]**Ngôn ngữ:** Chỉ dùng tiếng Việt phổ thông, không dùng thuật ngữ chuyên môn[cite: 7].
* [cite_start]**Phân loại:** Theo nhu cầu tìm kiếm thực tế, không theo hành chính[cite: 8].
* [cite_start]**Cấu trúc:** Map về 1 trong 12 ngành lớn[cite: 10].

### II. CẤU TRÚC 12 NGÀNH LỚN & NGÀNH CON
1.  **ĂN UỐNG**
    * *Nhóm:* Quán ăn, Nhà hàng, Đồ ăn nhanh, Quán nhậu, Quán chay, Quán hải sản.
    * *Chi tiết:* Quán cơm, Quán phở, Bún – miến, Cơm tấm, Bánh mì, Lẩu – nướng, Hải sản tươi sống, Quán ăn gia đình.

2.  **CÀ PHÊ**
    * *Nhóm:* Cà phê, Trà sữa, Đồ uống.
    * *Chi tiết:* Quán cà phê, Cà phê máy, Cà phê take away, Trà sữa, Trà trái cây.

3.  **LÀM ĐẸP**
    * *Nhóm:* Spa, Salon tóc, Nail – mi.
    * *Chi tiết:* Spa chăm sóc da, Spa massage, Cắt tóc nam, Làm tóc nữ, Nail, Nối mi, Phun xăm thẩm mỹ.

4.  **Y TẾ**
    * *Nhóm:* Nha khoa, Phòng khám, Y tế tư nhân.
    * *Chi tiết:* Nha khoa tổng quát, Nha khoa thẩm mỹ, Phòng khám đa khoa, Phòng khám nhi, Phòng khám sản, Nhà thuốc.

5.  **KHÁCH SẠN**
    * *Nhóm:* Khách sạn, Nhà nghỉ.
    * *Chi tiết:* Khách sạn 1–5 sao, Nhà nghỉ bình dân, Khách sạn mini.

6.  **LƯU TRÚ**
    * *Nhóm:* Homestay, Căn hộ.
    * *Chi tiết:* Homestay, Căn hộ dịch vụ, Cho thuê ngắn ngày.

7.  **SỬA CHỮA**
    * *Nhóm:* Điện nước, Điện lạnh, Sửa đồ gia dụng.
    * *Chi tiết:* Sửa điện nước, Sửa máy lạnh, Sửa tủ lạnh, Sửa máy giặt, Sửa thiết bị gia đình.

8.  **CỨU HỘ**
    * *Nhóm:* Cứu hộ xe, Cứu hộ khẩn cấp.
    * *Chi tiết:* Cứu hộ xe máy, Cứu hộ ô tô, Vá xe lưu động, Kéo xe.

9.  **THỂ THAO**
    * *Nhóm:* Gym, Yoga, Thể hình.
    * *Chi tiết:* Phòng gym, Yoga, Fitness, Boxing.

10. **GIÁO DỤC**
    * *Nhóm:* Trung tâm học tập, Đào tạo kỹ năng.
    * *Chi tiết:* Trung tâm ngoại ngữ, Trung tâm tin học, Lớp học thêm, Trung tâm kỹ năng mềm.

11. **GIA ĐÌNH**
    * *Nhóm:* Dịch vụ nhà cửa, Dịch vụ cá nhân.
    * *Chi tiết:* Giặt ủi, Giúp việc, Dọn nhà, Sửa nhà nhỏ.

12. **DI CHUYỂN**
    * *Nhóm:* Thuê xe, Vận chuyển.
    * *Chi tiết:* Thuê xe máy, Thuê ô tô, Taxi, Xe công nghệ.

---

## PHẦN 2: MENU & GIAO DIỆN NGƯỜI DÙNG (UI/UX)
### I. NGUYÊN TẮC CỐT LÕI
* [cite_start]**Từ khóa gốc:** GẦN TÔI – GẦN ĐÂY – GẦN NHẤT[cite: 59].
* [cite_start]**Hiển thị:** Menu chỉ hiển thị 1 tầng duy nhất (ngang hàng), không dùng menu cây[cite: 64, 65].
* [cite_start]**Thời gian hiểu:** Người dùng cần ≤ 5 giây để hiểu và thao tác[cite: 62].

### II. CẤU TRÚC HEADER (NAV)
[cite_start]Chỉ bao gồm tối đa 7 tab sau[cite: 69, 70]:
1.  [cite_start]**[Gần tôi]:** Dùng GPS, ưu tiên kết quả quanh vị trí hiện tại[cite: 72].
2.  [cite_start]**[Gần đây]:** Dựa vào khu vực đang xem (không cần GPS)[cite: 73].
3.  [cite_start]**[Gần nhất]:** Sắp xếp theo khoảng cách tăng dần[cite: 74].
4.  [cite_start]**[Đang mở]:** Lọc theo thời gian thực[cite: 75].
5.  [cite_start]**[Khẩn cấp]:** Ưu tiên dịch vụ cần ngay (sửa chữa, y tế)[cite: 76].
6.  [cite_start]**[Dịch vụ]:** Mở danh sách 12 ngành lớn (dạng Icon Grid)[cite: 77, 95].
7.  [cite_start]**[Khu vực]:** Biến số gốc, áp dụng toàn hệ thống (Tỉnh/Quận/Khoảng cách)[cite: 78, 96].

---

## PHẦN 3: LOGIC CORE ENGINE (GẦN TÔI / GẦN ĐÂY / GẦN NHẤT)
### I. ĐỊNH NGHĨA LOGIC
1.  **GẦN TÔI (Near Me):**
    * [cite_start]Bắt buộc dùng GPS / Vị trí thực tế[cite: 188].
    * [cite_start]Ưu tiên khoảng cách thực (mét/km)[cite: 190].
2.  **GẦN ĐÂY (Nearby/Region):**
    * [cite_start]Dựa vào khu vực đang xem/đang chọn[cite: 193].
    * [cite_start]Không cần GPS, phù hợp Desktop hoặc người tắt định vị[cite: 194].
3.  **GẦN NHẤT (Closest - Sort):**
    * [cite_start]Là bộ lọc sắp xếp (Sort), không thay đổi phạm vi[cite: 200, 202].

### II. FLOW XỬ LÝ (RULE ENGINE)
* **Flow 1 (Bấm Gần Tôi):** Kiểm tra GPS. Có GPS -> Lấy tọa độ -> Radius 3km -> Sort khoảng cách. [cite_start]Không GPS -> Thông báo -> Chuyển sang logic "Gần đây" [cite: 207-215].
* **Flow 2 (Bấm Gần Đây):** Kiểm tra khu vực đang chọn. [cite_start]Nếu chưa chọn -> Gợi ý chọn Tỉnh/Quận -> Dùng tâm khu vực để lấy dữ liệu [cite: 216-220].
* [cite_start]**Flow 3 (Bấm Gần Nhất):** Giữ nguyên phạm vi, chỉ thay đổi thứ tự sắp xếp (Sort ASC theo distance) [cite: 222-224].

### III. LOGIC BÁN KÍNH
* [cite_start]**Các mức:** 1km (đi bộ), 3km (mặc định), 5km (mở rộng) [cite: 228-231].
* [cite_start]**Quy tắc:** Có GPS thì bán kính ưu tiên hơn ranh giới hành chính[cite: 233].

---

## PHẦN 4: MASTER UX/UI & INTENT ENGINE (NO BACKEND MODE)
### I. ĐỊNH VỊ SẢN PHẨM
[cite_start]NearMe là **Hệ thống dẫn đường theo ý định (Intent-Driven Gateway)**, không phải app danh sách địa điểm hay Google thu nhỏ[cite: 329]. [cite_start]Nhiệm vụ: Hiểu user muốn gì -> Dẫn đến nền tảng phù hợp[cite: 331, 332].

### II. CẤU TRÚC MÀN HÌNH 2 (KẾT QUẢ) - 4 NHÓM HIỂN THỊ
[cite_start]Chỉ hiển thị 4 nhóm sau, không hiển thị các nền tảng lẻ tẻ[cite: 358]:

1.  [cite_start]**🟦 NHÓM 1: AI SEARCH / TRỢ LÝ AI** [cite: 359]
    * *Vai trò:* Hỏi, so sánh, tổng hợp.
    * *Nền tảng:* ChatGPT, Google Gemini, Copilot, Perplexity.

2.  [cite_start]**🟩 NHÓM 2: BẢN ĐỒ & ĐỊA ĐIỂM** [cite: 367]
    * *Vai trò:* Quyết định đi ngay, chỉ đường.
    * *Nền tảng:* Google Maps (Core), Website chính thức.
    * [cite_start]*Lưu ý:* Các hành động Đặt bàn/Giao hàng nằm trong nhóm này[cite: 373].

3.  [cite_start]**🟥 NHÓM 3: SOCIAL & REVIEW (LUÔN CÓ)** [cite: 374]
    * *Vai trò:* Xem review, cảm xúc.
    * [cite_start]*Nền tảng bắt buộc:* TikTok, YouTube, Fanpage (Facebook) [cite: 377-380].

4.  [cite_start]**🟪 NHÓM 4: KHÁM PHÁ / MUA SẮM** [cite: 381]
    * *Vai trò:* Mua bán online, so sánh giá (Marketplace).

### III. LOGIC INTENT ENGINE
[cite_start]Công thức: `INTENT = ƯU_TIÊN( NÚT_BẤM, GPS, LOẠI_NHU_CẦU )`[cite: 400].
* Ví dụ: Cafe + Có GPS + Google -> Google Maps.
* [cite_start]Ví dụ: Cafe + Không GPS + TikTok -> TikTok Search[cite: 402, 403].

---

## PHẦN 5: HỆ KHU VỰC ĐỊA LÝ (GEOGRAPHY SYSTEM)
### I. CẤU TRÚC
[cite_start]`TỈNH/THÀNH PHỐ` -> `QUẬN/HUYỆN` -> `PHƯỜNG/XÃ` -> `BÁN KÍNH`[cite: 527].

### II. QUY TẮC HIỂN THỊ
* [cite_start]**Tỉnh/Thành:** Sử dụng chuẩn 63 tỉnh/thành phố hiện tại để phù hợp thói quen tìm kiếm (Hà Nội, TP.HCM, Đà Nẵng, Cần Thơ, Hải Phòng, v.v.)[cite: 515, 529].
* [cite_start]**Quận/Huyện:** Hiển thị tên phổ biến (Quận 1, Thủ Đức...), gộp huyện ít nhu cầu[cite: 597, 598].
* [cite_start]**Phường/Xã:** Ẩn mặc định, chỉ hiện khi zoom sâu[cite: 601].
* [cite_start]**Alias:** Hỗ trợ tìm kiếm tên cũ (Sài Gòn -> TP.HCM) ở backend[cite: 617].

### III. LOGIC BÁN KÍNH TRONG KHU VỰC
[cite_start]Khi có GPS, **Bán kính (1km, 3km, 5km)** được ưu tiên xử lý cao hơn ranh giới hành chính Quận/Huyện[cite: 611].