import { AnniversaryTemplate } from '@/templates/AnniversaryTemplate';
import { BirthdayTemplate } from '@/templates/BirthdayTemplate';
import { CustomTemplate } from '@/templates/CustomTemplate';
import { DateTemplate } from '@/templates/DateTemplate';
import { FriendshipTemplate } from '@/templates/FriendshipTemplate';
import { GreetingTemplate } from '@/templates/GreetingTemplate';
import type { TemplateComponent, TemplateId, TemplateModule } from '@/types';

const registry = new Map<TemplateId, TemplateModule>([
  ['date', { id: 'date', Component: DateTemplate }],
  ['birthday', { id: 'birthday', Component: BirthdayTemplate }],
  ['anniversary', { id: 'anniversary', Component: AnniversaryTemplate }],
  ['friendship', { id: 'friendship', Component: FriendshipTemplate }],
  ['greeting', { id: 'greeting', Component: GreetingTemplate }],
  ['custom', { id: 'custom', Component: CustomTemplate }],
]);

export function getTemplate(templateId: TemplateId): TemplateComponent | null {
  return registry.get(templateId)?.Component ?? null;
}

export function hasTemplate(templateId: string): templateId is TemplateId {
  return registry.has(templateId as TemplateId);
}
