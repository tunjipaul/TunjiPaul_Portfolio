CREATE DATABASE portfolio_db;

CREATE TABLE IF NOT EXISTS about (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    image_url VARCHAR(255),
    skills JSON,
    education VARCHAR(255)
);

INSERT INTO about (title, content, image_url, skills, education)
VALUES (
    'About Me',
    'By day, I''m an AI Developer building intelligent, scalable solutions. By night, I''m an analyst of politics and governance, an occasional writer, and a public speaker on topics that matter.',
    '',
    '["HTML","CSS","JavaScript","React","Python","FastAPI"]',
    'B.Eng, Mechatronics Engineering (GMNSE)'
)
ON CONFLICT DO NOTHING;