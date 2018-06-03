import * as store from './postsStore';
import * as redditService from '../../services/reddit';

export async function fetchPosts(topicUrl) {
    const posts = await redditService.getPosts(topicUrl);
    const posts2 = await redditService.getPosts(topicUrl);
    const posts3 = await redditService.getPosts(topicUrl);
    await Promise.all([posts, posts2, posts3]);
    store.setters.setPosts(posts);
}
