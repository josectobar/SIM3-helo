INSERT INTO users (username, password, profile_pic)
values(${username}, ${password}, ${profile_pic})
returning id, username, profile_pic