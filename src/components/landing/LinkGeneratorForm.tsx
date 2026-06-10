'use client';

import { useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { buildExperienceUrl, createExperienceConfig } from '@/lib/linkParams';
import { THEME_LIST } from '@/lib/themes';
import { DEFAULT_EXPERIENCE, type ExperienceConfig, type ThemeId } from '@/types/experience';

type FormFields = Omit<ExperienceConfig, 'seed'>;

const FIELDS: Array<{
  key: keyof FormFields;
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
  const [form, setForm] = useState<FormFields>({
    question: DEFAULT_EXPERIENCE.question,
    yesLabel: DEFAULT_EXPERIENCE.yesLabel,
    noLabel: DEFAULT_EXPERIENCE.noLabel,
    successMessage: DEFAULT_EXPERIENCE.successMessage,
    theme: DEFAULT_EXPERIENCE.theme,
  });
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      const config = createExperienceConfig(form);
      const base = window.location.origin;
      const url = buildExperienceUrl(config, base);
      setGeneratedUrl(url);
      setCopied(false);
    } catch (err) {
      console.error('Link generation failed:', err);
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
    <Card id="generator" className="border-violet-300/20 bg-white/5">
      <CardHeader>
        <CardTitle className="text-2xl">ساخت لینک اختصاصی</CardTitle>
        <CardDescription>
          تم را انتخاب کنید، فیلدها را پر کنید و لینک کوتاه خود را بگیرید. هیچ چیزی
          ذخیره نمی‌شود.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-3">
            <span className="block text-sm font-medium text-white/90">تم</span>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {THEME_LIST.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, theme: theme.id as ThemeId }))}
                  className={cn(
                    'rounded-xl border px-3 py-3 text-sm font-medium transition-all',
                    form.theme === theme.id
                      ? 'border-violet-400/60 bg-violet-500/25 text-white shadow-lg shadow-violet-500/20'
                      : 'border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10',
                  )}
                >
                  {theme.label} {theme.emoji}
                </button>
              ))}
            </div>
          </div>

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
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, [field.key]: e.target.value }))
                  }
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
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, [field.key]: e.target.value }))
                  }
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
                />
              )}
            </div>
          ))}

          {error && (
            <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          )}

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
