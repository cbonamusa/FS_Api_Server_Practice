DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS forums;


CREATE TABLE forums (
 forum_id SERIAL PRIMARY KEY,
 name VARCHAR(255) UNIQUE,
 create_time TIMESTAMP DEFAULT NOW() 
);

CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    forum_id INTEGER  REFERENCES forums(forum_id),
    email VARCHAR(255),
    text TEXT,
    create_time TIMESTAMPF DEFAULT NOW(),
    last_modified TIMESTAMP
);