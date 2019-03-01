select posts.id as post_id, title, img, content, author_id, username
from posts 
inner join users on author_id = users.id
WHERE title like ${search}`%` AND author_id = ${author_id}