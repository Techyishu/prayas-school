
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://amlkydskhnqmhnndkaap.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtbGt5ZHNraG5xbWhubmRrYWFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0NjQzMjMsImV4cCI6MjA4MjA0MDMyM30.5Bwzw2c0s1T2k2zVUKBjGPczsNAmN1JRWH6u0_UKsxI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
