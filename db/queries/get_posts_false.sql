select posts.id as post_id, title, username, profile_pic
from posts 
inner join users on author_id = users.id
WHERE author_id != $1;