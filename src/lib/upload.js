import { supabase } from './supabase.js';

const RULES = {
  image: { types: ['image/webp', 'image/png', 'image/jpeg'], ext: /\.(webp|png|jpe?g)$/i },
  pdf: { types: ['application/pdf'], ext: /\.pdf$/i },
};
const MAX_BYTES = 10 * 1024 * 1024;

// Checks type + size in the browser (the bucket enforces the same rules),
// then uploads to the public "media" bucket and returns its URL.
export async function uploadMedia(file, kind) {
  if (!supabase) throw new Error('Supabase is not configured.');
  const rule = RULES[kind];
  if (!rule || !rule.types.includes(file.type) || !rule.ext.test(file.name)) {
    throw new Error(kind === 'pdf' ? 'Please choose a PDF file.' : 'Please choose a WebP, PNG or JPEG image.');
  }
  if (file.size > MAX_BYTES) throw new Error('File is larger than 10 MB.');

  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-').replace(/^-+|-+$/g, '');
  const path = `${kind}/${Date.now()}-${safeName}`;
  const { error } = await supabase.storage
    .from('media')
    .upload(path, file, { contentType: file.type, cacheControl: '3600', upsert: false });
  if (error) throw new Error(error.message);
  return supabase.storage.from('media').getPublicUrl(path).data.publicUrl;
}
