-- Create database (if not exists)
IF DB_ID('guideme') IS NULL
    CREATE DATABASE guideme;
GO
USE guideme;
GO

-- Users table (tourist & guide simplified)
CREATE TABLE [dbo].[users] (
    id INT IDENTITY(1,1) PRIMARY KEY,
    email NVARCHAR(255) NOT NULL UNIQUE,
    password_hash NVARCHAR(255) NOT NULL,
    full_name NVARCHAR(200) NOT NULL,
    role NVARCHAR(50) NOT NULL, -- 'TOURIST','GUIDE','ADMIN'
    phone NVARCHAR(50) NULL,
    created_at DATETIME2 DEFAULT SYSUTCDATETIME()
);

-- Tour packages table
CREATE TABLE [dbo].[tours] (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(200) NOT NULL,
    description NVARCHAR(MAX) NULL,
    price DECIMAL(10,2) NOT NULL,
    guide_id INT NULL, -- FK to users
    available_from DATE NULL,
    available_to DATE NULL,
    max_participants INT DEFAULT 10,
    created_at DATETIME2 DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Tours_Guide FOREIGN KEY (guide_id) REFERENCES users(id)
);

-- Booking table
CREATE TABLE [dbo].[bookings] (
    id INT IDENTITY(1,1) PRIMARY KEY,
    booking_ref NVARCHAR(100) NOT NULL UNIQUE,
    tourist_id INT NOT NULL,
    tour_id INT NOT NULL,
    booking_date DATE NOT NULL, -- chosen tour date
    guests_count INT NOT NULL DEFAULT 1,
    total_amount DECIMAL(10,2) NOT NULL,
    status NVARCHAR(50) NOT NULL DEFAULT 'PENDING', -- PENDING, CONFIRMED, CANCELLED
    created_at DATETIME2 DEFAULT SYSUTCDATETIME(),
    qr_code_data NVARCHAR(MAX) NULL, -- store QR payload or URL
    CONSTRAINT FK_Bookings_Tourist FOREIGN KEY (tourist_id) REFERENCES users(id),
    CONSTRAINT FK_Bookings_Tour FOREIGN KEY (tour_id) REFERENCES tours(id)
);

ALTER TABLE tours
ADD location VARCHAR(100);

ALTER TABLE tours
ADD start_date DATE NOT NULL DEFAULT GETDATE();

INSERT INTO users (email, password_hash, full_name, role, phone)
VALUES ('perera@example.com','$2a$10$EXAMPLEHASH','Janith Perera','Guide','+94-7xxxx')

INSERT INTO bookings (booking_ref, tourist_id, tour_id, booking_date, guests_count, total_amount, status, qr_code_data)
VALUES ('BOOK-20251024-0006', 3, 6, '2025-10-31', 6, 780.00, 'PENDING', 'BOOK-20250929-0006|tour:6|user:3');

-- Sample seed data
INSERT INTO users (email, password_hash, full_name, role, phone)
VALUES ('alice@example.com','$2a$10$EXAMPLEHASH','Alice Traveler','TOURIST','+94-7xxxx'),
       ('nimalguide@example.com','$2a$10$EXAMPLEHASH2','Nimal Guide','GUIDE','+94-7yyyy');

INSERT INTO tours (title, description, price, guide_id, available_from, available_to, max_participants)
VALUES ('Cultural Kandy Half-day', 'Visit Temple of Tooth and local markets', 45.00, 2, '2025-10-01', '2026-03-31', 12);

-- Example booking
INSERT INTO bookings (booking_ref, tourist_id, tour_id, booking_date, guests_count, total_amount, status, qr_code_data)
VALUES ('BOOK-20250929-0001', 1, 1, '2025-10-15', 2, 90.00, 'CONFIRMED', 'BOOK-20250929-0001|tour:1|user:1');
