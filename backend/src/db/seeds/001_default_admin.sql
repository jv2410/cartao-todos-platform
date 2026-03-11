-- Seed 001: Default Admin User
-- Creates a default admin user with username "admin" and password "100101"
-- Password is bcrypt hashed with cost factor 12
-- force_password_change is set to TRUE (user must change password on first login)

-- Insert default admin user (idempotent - only inserts if username doesn't exist)
INSERT INTO users (username, password_hash, force_password_change)
VALUES (
  'admin',
  -- bcrypt hash of "100101" with cost factor 12
  -- Generated with: bcrypt.hash('100101', 12)
  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMeshLWx7xfKVqNXPxY6rXKMCy',
  TRUE
)
ON CONFLICT (username) DO NOTHING;
