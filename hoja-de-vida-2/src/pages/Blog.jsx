import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../api/client';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        client.get('/posts').then(res => setPosts(res.data)).finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><div className="loading-spinner"></div></div>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="mb-10 border-b border-gray-200 dark:border-gray-700 pb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog Técnico</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Artículos y tutoriales.</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map(post => (
                    /* AQUÍ: Quitamos la barra de colores y dejamos solo la tarjeta limpia */
                    <article key={post.id} className="card-blog group">
                        <div className="p-6 flex-1 flex flex-col">
                            <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">{post.date}</p>
                            <Link to={`/posts/${post.id}`} className="block mb-3">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                                    {post.title}
                                </h2>
                            </Link>
                            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-6 flex-1">
                                {post.content.substring(0, 100)}...
                            </p>
                            <Link to={`/posts/${post.id}`} className="btn-primary">
                                Leer más
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};
export default Blog;