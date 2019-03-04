select posts.id as post_id, title, username, profile_pic
from posts 
inner join users on author_id = users.id
WHERE title ilike $1 AND author_id != $2;