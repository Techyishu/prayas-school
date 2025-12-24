import { createClient } from '@/lib/supabase-server';
import BlogClient from './blog-client';

export const revalidate = 60;

export default async function BlogPage() {
    const supabase = await createClient();
    const { data: blogPosts } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });

    return <BlogClient blogPosts={blogPosts || []} />;
}
