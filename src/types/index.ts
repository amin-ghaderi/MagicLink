import type { ComponentType } from 'react';

export type TemplateId =
  | 'date'
  | 'birthday'
  | 'anniversary'
  | 'friendship'
  | 'greeting'
  | 'custom';

export type AnimationType = 'fade' | 'slide' | 'confetti' | 'hearts' | 'none';

export interface LinkButton {
  label: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export interface LinkRecord {
  slug: string;
  template: TemplateId;
  title: string;
  subtitle?: string;
  name?: string;
  message?: string;
  image?: string;
  buttons?: LinkButton[];
  animation?: AnimationType;
  accent?: string;
}

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  description: string;
  emoji: string;
}

export interface TemplateProps {
  link: LinkRecord;
}

export type TemplateComponent = ComponentType<TemplateProps>;

export interface TemplateModule {
  id: TemplateId;
  Component: TemplateComponent;
}
