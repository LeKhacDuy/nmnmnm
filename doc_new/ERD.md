# Near Me Data Model (Production)

## Entity-Relationship Diagram (ERD)
Sơ đồ cơ sở dữ liệu hiện tại (bao gồm cả bảng mới `user_profiles`).

```mermaid
erDiagram
    USERS ||--o| USER_PROFILES : "1-1 hồ sơ hành vi"
    USERS ||--o{ SESSIONS : "có thể khởi tạo"
    USERS ||--o{ REFRESH_TOKENS : "sở hữu"
    
    ZONES ||--o{ PLACES : "chứa"
    ZONES ||--o{ SESSIONS : "diễn ra tại"
    
    PLACES ||--o{ PLACE_TAGS : "được gắn"
    PLACES ||--o{ DECISION_CANDIDATES : "được gợi ý trong"
    PLACES ||--o{ ACCEPTS : "được chọn"
    PLACES ||--o{ FEEDBACK : "nhận được"
    
    SESSIONS ||--o{ DECISIONS : "phát sinh"
    SESSIONS ||--o{ ACCEPTS : "chốt lựa chọn"
    SESSIONS ||--o{ FEEDBACK : "để lại"
    
    DECISIONS ||--|{ DECISION_CANDIDATES : "chia ra thành (Top 3)"
    DECISIONS ||--o| ACCEPTS : "dẫn đến"
    DECISIONS ||--o| FEEDBACK : "nhận từ"

    USERS {
        uuid id PK
        string email
        string password_hash
        string display_name
        string provider
        string firebase_uid
    }

    USER_PROFILES {
        uuid user_id PK, FK
        string default_vehicle "walk/motorbike/car"
        smallint budget_preference "1/2/3"
        jsonb dietary_restrictions "[]"
        jsonb persona_tags "[]"
        int total_decisions
    }
    
    ZONES {
        uuid zone_id PK
        string name
        decimal center_lat
        decimal center_lng
        decimal radius_km
    }

    PLACES {
        uuid place_id PK
        uuid zone_id FK
        string name
        decimal lat
        decimal lng
        jsonb open_hours
        smallint speed_score
        smallint reliability_score
    }

    PLACE_TAGS {
        uuid id PK
        uuid place_id FK
        string tag_type "quick/chill/late/group/emergency"
    }

    SESSIONS {
        uuid session_id PK
        uuid user_id FK "nullable"
        uuid zone_id FK
        decimal lat
        decimal lng
        string device_type
    }

    DECISIONS {
        uuid decision_id PK
        uuid session_id FK
        string context_type "quick/chill..."
    }

    DECISION_CANDIDATES {
        uuid id PK
        uuid decision_id FK
        uuid place_id FK
        smallint rank "1-3"
        decimal score
        jsonb context_snapshot
    }

    ACCEPTS {
        uuid id PK
        uuid decision_id FK
        uuid session_id FK
        uuid place_id FK
        timestamp accepted_at
    }

    FEEDBACK {
        uuid id PK
        uuid session_id FK
        uuid place_id FK
        uuid decision_id FK
        string rating "good/neutral/bad"
    }
```

## Giải thích luồng
- Dữ liệu ở `user_profiles` được thu thập ngay khi user vào trang Profile.
- Khi user tìm kiếm, sinh ra bản ghi `sessions` và `decisions`.
- AI sử dụng `default_vehicle` và `budget_preference` để filter từ bảng `places`.
- Trả ra 3 quán lưu vào `decision_candidates`.
- Người dùng chọn quán nào, lưu vào `accepts`. Đóng vòng lặp.
