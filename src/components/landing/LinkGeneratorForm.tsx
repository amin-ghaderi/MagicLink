'use client';

import { useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { buildExperienceUrl } from '@/lib/linkParams';
import { DEFAULT_EXPERIENCE, type ExperienceConfig } from '@/types/experience';

const FIELDS: Array<{
  key: keyof ExperienceConfig;
  label: string;
  placeholder: string;
  multiline?: boolean;
}> = [
  { key: 'question', label: 'سوال', placeholder: 'آیا با من قرار می‌ری؟ ❤️' },
  { key: 'yesLabel', label: 'متن دکمه بله', placeholder: 'بله 💖' },
  { key: 'noLabel', label: 'متن دکمه نه', placeholder: 'نه 🙈' },
  {
    key: 'successMessage',
    label: 'پیام موفقیت',
    placeholder: 'هورا! ❤️\nروز من رو ساختی.',
    multiline: true,
  },
];

export function LinkGeneratorForm() {
  const [form, setForm] = useState<ExperienceConfig>(DEFAULT_EXPERIENCE);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const base = typeof window !== 'undefined' ? window.location.origin : '';
    setGeneratedUrl(buildExperienceUrl(form, base));
    setCopied(false);
  }

  async function handleCopy() {
    if (!generatedUrl) return;
    await navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card id="generator" className="border-violet-300/20 bg-white/5">
      <CardHeader>
        <CardTitle className="text-2xl">ساخت لینک اختصاصی</CardTitle>
        <CardDescription>
          فیلدها را پر کنید و لینک خود را بسازید. هیچ چیزی ذخیره نمی‌شود — همه‌چیز داخل
          آدرس لینک است.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {FIELDS.map((field) => (
            <div key={field.key} className="space-y-2 text-right">
              <label htmlFor={field.key} className="block text-sm font-medium text-white/90">
                {field.label}
              </label>
              {field.multiline ? (
                <textarea
                  id={field.key}
                  rows={3}
                  required
                  maxLength={300}
                  value={form[field.key]}
                  onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  className="w-full resize-none rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
                />
              ) : (
                <input
                  id={field.key}
                  type="text"
                  required
                  maxLength={300}
                  value={form[field.key]}
                  onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
                />
              )}
            </div>
          ))}

          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-l from-pink-500 to-violet-600 text-base shadow-lg shadow-violet-500/25 hover:from-pink-400 hover:to-violet-500"
          >
            ساخت لینک
          </Button>
        </form>

        {generatedUrl && (
          <div className="mt-6 space-y-3 rounded-xl border border-violet-400/30 bg-violet-500/10 p-4">
            <p className="text-sm font-medium text-violet-200">لینک شما آماده است:</p>
            <p
              className="break-all rounded-lg bg-black/20 p-3 text-left text-xs text-white/80 ltr:dir-ltr"
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
