select title, img, content, username, profile_pic
from posts 
inner join users on author_id = users.id
WHERE posts.id = $1;