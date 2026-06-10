'use client';

import { useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUploader } from '@/components/media/ImageUploader';
import { buildLoveLetterUrl } from '@/lib/templates/loveLetterParams';
import { MEDIA_TEMPLATE_FOLDERS } from '@/lib/storage/types';
import { DEFAULT_LOVE_LETTER, type LoveLetterConfig } from '@/types/loveLetter';

export function LoveLetterForm() {
  const [form, setForm] = useState<LoveLetterConfig>(DEFAULT_LOVE_LETTER);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      const url = buildLoveLetterUrl(form, window.location.origin);
      setGeneratedUrl(url);
      setCopied(false);
    } catch (err) {
      console.error('Love letter URL generation failed:', err);
      setGeneratedUrl(null);
      setError('خطا در ساخت لینک. لطفاً دوباره تلاش کنید.');
    }
  }

  async function handleCopy() {
    if (!generatedUrl) return;
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('کپی لینک ممکن نشد. لینک را دستی انتخاب کنید.');
    }
  }

  return (
    <Card id="generator" className="border-rose-300/20 bg-white/5">
      <CardHeader>
        <CardTitle className="text-2xl">ساخت نامه عاشقانه</CardTitle>
        <CardDescription>
          نامه‌ات را بنویس و لینک اختصاصی بگیر. همه‌چیز داخل URL است — بدون ذخیره‌سازی.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Field
            id="recipientName"
            label="نام مخاطب"
            value={form.recipientName}
            placeholder="مثلاً سارا"
            onChange={(v) => setForm((p) => ({ ...p, recipientName: v }))}
          />
          <Field
            id="title"
            label="عنوان نامه"
            value={form.title}
            placeholder="نامه‌ای از ته دل 💌"
            onChange={(v) => setForm((p) => ({ ...p, title: v }))}
          />
          <div className="space-y-2 text-right">
            <label htmlFor="body" className="block text-sm font-medium text-white/90">
              متن نامه
            </label>
            <textarea
              id="body"
              rows={6}
              required
              maxLength={2500}
              value={form.body}
              onChange={(e) => setForm((p) => ({ ...p, body: e.target.value }))}
              placeholder="هر چیزی که از دل و جان می‌خوای بنویس..."
              className="w-full resize-none rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-400/50 focus:outline-none focus:ring-2 focus:ring-rose-400/30"
            />
          </div>
          <ImageUploader
            value={form.imageUrl}
            onChange={(url) => setForm((p) => ({ ...p, imageUrl: url }))}
            onUploadingChange={setImageUploading}
            templateFolder={MEDIA_TEMPLATE_FOLDERS.LOVE_LETTER}
            label="آپلود عکس"
            accent="rose"
            optional
          />
          <Field
            id="ctaLabel"
            label="متن دکمه پایانی"
            value={form.ctaLabel}
            placeholder="قلب من مال توئه 💖"
            onChange={(v) => setForm((p) => ({ ...p, ctaLabel: v }))}
          />

          {error && (
            <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={imageUploading}
            className="w-full bg-gradient-to-l from-rose-500 to-pink-600 text-base shadow-lg shadow-rose-500/25 hover:from-rose-400 hover:to-pink-500 disabled:opacity-60"
          >
            {imageUploading ? 'در حال آپلود عکس...' : 'ساخت لینک'}
          </Button>
        </form>

        {generatedUrl && (
          <div className="mt-6 space-y-3 rounded-xl border border-rose-400/30 bg-rose-500/10 p-4">
            <p className="text-sm font-medium text-rose-200">لینک نامهٔ شما:</p>
            <p
              className="break-all rounded-lg bg-black/20 p-3 text-left text-xs text-white/80"
              dir="ltr"
            >
              {generatedUrl}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="secondary" onClick={handleCopy}>
                {copied ? 'کپی شد! ✓' : 'کپی لینک'}
              </Button>
              <a
                href={generatedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: 'ghost' }))}
              >
                پیش‌نمایش
              </a>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Field({
  id,
  label,
  value,
  placeholder,
  required = true,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  required?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2 text-right">
      <label htmlFor={id} className="block text-sm font-medium text-white/90">
        {label}
      </label>
      <input
        id={id}
        type="text"
        required={required}
        maxLength={200}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-400/50 focus:outline-none focus:ring-2 focus:ring-rose-400/30"
      />
    </div>
  );
}
