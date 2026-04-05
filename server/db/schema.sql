-- =============================================
-- NEAR ME — DATABASE SCHEMA
-- Behavior Decision System
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. USERS (Auth)
-- =============================================
CREATE TABLE IF NOT EXISTS users (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   VARCHAR(255),           -- NULL for Google-only users
    display_name    VARCHAR(100),
    photo_url       TEXT,
    phone           VARCHAR(20),
    provider        VARCHAR(20) NOT NULL DEFAULT 'email',  -- 'email' | 'google'
    firebase_uid    VARCHAR(128) UNIQUE,    -- Firebase UID for Google users
    is_active       BOOLEAN DEFAULT true,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_firebase_uid ON users(firebase_uid);

-- =============================================
-- 1.5. USER PROFILES (Hồ sơ cá nhân nâng cao)
-- =============================================
CREATE TABLE IF NOT EXISTS user_profiles (
    user_id              UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    default_vehicle      VARCHAR(20) DEFAULT 'motorbike' CHECK (default_vehicle IN ('walk', 'motorbike', 'car')),
    budget_preference    SMALLINT DEFAULT 2 CHECK (budget_preference BETWEEN 1 AND 3),
    dietary_restrictions JSONB DEFAULT '[]',
    persona_tags         JSONB DEFAULT '[]',
    total_decisions      INT DEFAULT 0,
    created_at           TIMESTAMPTZ DEFAULT NOW(),
    updated_at           TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 2. ZONES (Khu vực triển khai)
-- =============================================
CREATE TABLE IF NOT EXISTS zones (
    zone_id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            VARCHAR(100) NOT NULL,
    center_lat      DECIMAL(10, 7) NOT NULL,
    center_lng      DECIMAL(10, 7) NOT NULL,
    radius_km       DECIMAL(5, 2) NOT NULL DEFAULT 1.2,
    active          BOOLEAN DEFAULT true,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 3. PLACES (Địa điểm)
-- =============================================
CREATE TABLE IF NOT EXISTS places (
    place_id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            VARCHAR(200) NOT NULL,
    lat             DECIMAL(10, 7) NOT NULL,
    lng             DECIMAL(10, 7) NOT NULL,
    zone_id         UUID REFERENCES zones(zone_id),
    address         TEXT,
    phone           VARCHAR(20),
    google_maps_url TEXT,
    open_hours      JSONB,                  -- {"mon": "08:00-22:00", ...}
    walkable        BOOLEAN DEFAULT true,
    speed_score     SMALLINT DEFAULT 2 CHECK (speed_score BETWEEN 1 AND 3),
    reliability_score SMALLINT DEFAULT 3 CHECK (reliability_score BETWEEN 1 AND 5),
    active          BOOLEAN DEFAULT true,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_places_zone ON places(zone_id);
CREATE INDEX IF NOT EXISTS idx_places_active ON places(active);
CREATE INDEX IF NOT EXISTS idx_places_location ON places(lat, lng);

-- =============================================
-- 4. PLACE TAGS (Nhãn hành vi)
-- =============================================
CREATE TABLE IF NOT EXISTS place_tags (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    place_id        UUID NOT NULL REFERENCES places(place_id) ON DELETE CASCADE,
    tag_type        VARCHAR(20) NOT NULL CHECK (tag_type IN ('quick', 'chill', 'group', 'late', 'emergency'))
);

CREATE INDEX IF NOT EXISTS idx_place_tags_place ON place_tags(place_id);
CREATE INDEX IF NOT EXISTS idx_place_tags_type ON place_tags(tag_type);

-- =============================================
-- 5. SESSIONS (Phiên truy cập)
-- =============================================
CREATE TABLE IF NOT EXISTS sessions (
    session_id      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID REFERENCES users(id),  -- nullable (ẩn danh)
    lat             DECIMAL(10, 7),
    lng             DECIMAL(10, 7),
    device_type     VARCHAR(20),            -- 'mobile' | 'desktop'
    zone_id         UUID REFERENCES zones(zone_id),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    last_active_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_zone ON sessions(zone_id);

-- =============================================
-- 6. DECISIONS (Mỗi lần gợi ý)
-- =============================================
CREATE TABLE IF NOT EXISTS decisions (
    decision_id     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id      UUID NOT NULL REFERENCES sessions(session_id),
    context_type    VARCHAR(20) NOT NULL CHECK (context_type IN ('quick', 'chill', 'group', 'late', 'emergency')),
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_decisions_session ON decisions(session_id);

-- =============================================
-- 7. DECISION CANDIDATES (Training data — quan trọng nhất)
-- =============================================
CREATE TABLE IF NOT EXISTS decision_candidates (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    decision_id     UUID NOT NULL REFERENCES decisions(decision_id) ON DELETE CASCADE,
    place_id        UUID NOT NULL REFERENCES places(place_id),
    rank            SMALLINT NOT NULL CHECK (rank BETWEEN 1 AND 3),
    score           DECIMAL(6, 2) NOT NULL,
    context_snapshot JSONB                  -- snapshot tại thời điểm recommend
);

CREATE INDEX IF NOT EXISTS idx_dc_decision ON decision_candidates(decision_id);
CREATE INDEX IF NOT EXISTS idx_dc_place ON decision_candidates(place_id);

-- =============================================
-- 8. ACCEPTS (Lựa chọn thực tế)
-- =============================================
CREATE TABLE IF NOT EXISTS accepts (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    decision_id     UUID NOT NULL REFERENCES decisions(decision_id),
    session_id      UUID NOT NULL REFERENCES sessions(session_id),
    place_id        UUID NOT NULL REFERENCES places(place_id),
    accepted_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_accepts_decision ON accepts(decision_id);
CREATE INDEX IF NOT EXISTS idx_accepts_place ON accepts(place_id);

-- =============================================
-- 9. FEEDBACK (Phản hồi)
-- =============================================
CREATE TABLE IF NOT EXISTS feedback (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id      UUID NOT NULL REFERENCES sessions(session_id),
    place_id        UUID NOT NULL REFERENCES places(place_id),
    decision_id     UUID REFERENCES decisions(decision_id),
    rating          VARCHAR(10) NOT NULL CHECK (rating IN ('good', 'neutral', 'bad')),
    comment         TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_feedback_place ON feedback(place_id);
CREATE INDEX IF NOT EXISTS idx_feedback_session ON feedback(session_id);

-- =============================================
-- REFRESH TOKENS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash      VARCHAR(255) NOT NULL,
    expires_at      TIMESTAMPTZ NOT NULL,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user ON refresh_tokens(user_id);
