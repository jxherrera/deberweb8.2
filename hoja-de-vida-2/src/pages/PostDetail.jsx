import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import client from '../api/client';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        client.get(`/posts/${id}`).then(res => setPost(res.data)).finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><div className="loading-spinner"></div></div>;
    if (!post) return <p className="p-10 text-center text-red-500 font-bold">Post no encontrado.</p>;

    return (
        <div className="max-w-3xl mx-auto px-4 py-16">
            <Link to="/posts" className="btn-back">
                ← Volver al Blog
            </Link>
            <article>
                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-gray-900 dark:text-white">
                        {post.title}
                    </h1>
                    <div className="inline-block px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                        {post.date}
                    </div>
                </header>
                <div className="card-base p-8 md:p-12 prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {post.content}
                </div>
            </article>
        </div>
    );
};
export default PostDetail;