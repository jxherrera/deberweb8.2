import { useEffect, useState } from 'react';
import client from '../api/client';

const Curriculum = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [p, exp, est, hab] = await Promise.all([
                    client.get('/perfil'), client.get('/experiencia'), client.get('/estudios'), client.get('/habilidades')
                ]);
                setData({ perfil: p.data, experiencia: exp.data, estudios: est.data, habilidades: hab.data });
            } catch (error) { console.error(error); } finally { setLoading(false); }
        };
        loadData();
    }, []);

    if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><div className="loading-spinner"></div></div>;
    if (!data) return <p className="p-10 text-center text-red-500">Error cargando datos.</p>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            {/* Header Simple */}
            <header className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-3 text-hero">{data.perfil.nombre}</h1>
                <p className="text-xl text-indigo-600 dark:text-indigo-400 font-medium mb-4">{data.perfil.titulo}</p>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{data.perfil.resumen}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <main className="lg:col-span-8 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">Experiencia</h2>
                        <div className="space-y-4">
                            {data.experiencia.map(item => (
                                <div key={item.id} className="card-experience">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.rol}</h3>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">{item.periodo}</span>
                                    </div>
                                    <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-2">{item.empresa}</p>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.descripcion}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">Educación</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {data.estudios.map(item => (
                                <div key={item.id} className="card-base p-5">
                                    <h3 className="font-bold text-gray-900 dark:text-white">{item.titulo}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{item.institucion}</p>
                                    <p className="text-xs text-gray-400 mt-2">{item.fecha}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                <aside className="lg:col-span-4">
                    <div className="card-base p-6 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Habilidades</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.habilidades.map(item => (
                                <span key={item.id} className="badge-skill">{item.nombre}</span>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};
export default Curriculum;