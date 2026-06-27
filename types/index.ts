export type ProjectType = 'voice' | 'podcast' | 'audiobook' | 'story' | 'video' | 'reel';
export type ProjectStatus = 'draft' | 'generating' | 'completed' | 'archived' | 'error';
export type EmotionType = 'happy' | 'sad' | 'calm' | 'excited' | 'dramatic' | 'inspirational' | 'spiritual' | 'corporate';
export type VoiceLanguage = 'urdu' | 'hindi' | 'english' | 'arabic';
export type MemberRole = 'owner' | 'admin' | 'editor' | 'viewer';
export type SubscriptionTier = 'free' | 'pro' | 'studio' | 'enterprise';

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  subscription_tier: SubscriptionTier;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  type: ProjectType;
  status: ProjectStatus;
  progress: number;
  duration?: number;
  file_url?: string;
  thumbnail_url?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Voice {
  id: string;
  name: string;
  language: VoiceLanguage;
  gender: 'male' | 'female' | 'neutral';
  provider: 'elevenlabs' | 'openai' | 'playht' | 'custom';
  preview_url?: string;
  avatar_url?: string;
  tags: string[];
  is_premium: boolean;
  is_cloned: boolean;
  stability: number;
  similarity: number;
  style: number;
}

export interface AudioGeneration {
  id: string;
  project_id: string;
  voice_id: string;
  text: string;
  ssml?: string;
  emotion: EmotionType;
  duration: number;
  file_url: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
}

export interface VoiceClone {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  sample_urls: string[];
  clone_id?: string;
  quality_score: number;
  status: 'uploading' | 'processing' | 'ready' | 'failed';
  provider: string;
  created_at: string;
}

export interface BrandKit {
  id: string;
  user_id: string;
  name: string;
  tone_description: string;
  preferred_voice_ids: string[];
  pronunciation_rules: PronunciationRule[];
  templates: string[];
  is_shared: boolean;
  created_at: string;
  updated_at: string;
}

export interface PronunciationRule {
  word: string;
  phonetic: string;
  language: VoiceLanguage;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  content: string;
  type: ProjectType;
  use_count: number;
  is_premium: boolean;
  is_featured: boolean;
  thumbnail_url?: string;
  created_at: string;
}

export interface TeamMember {
  id: string;
  workspace_id: string;
  user_id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: MemberRole;
  last_active: string;
  joined_at: string;
}

export interface ActivityItem {
  id: string;
  workspace_id: string;
  user_id: string;
  user_name: string;
  action: string;
  target: string;
  created_at: string;
}

export interface ApiKey {
  id: string;
  user_id: string;
  name: string;
  key: string;
  permissions: string[];
  last_used?: string;
  is_active: boolean;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  tier: SubscriptionTier;
  status: 'active' | 'cancelled' | 'past_due';
  current_period_start: string;
  current_period_end: string;
  price: number;
}

export interface ConversationScene {
  id: string;
  project_id: string;
  speaker_name: string;
  speaker_voice_id: string;
  text: string;
  emotion: EmotionType;
  order: number;
}

export interface PodcastSegment {
  id: string;
  speaker: string;
  voice_id: string;
  text: string;
  order: number;
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  order: number;
  narrator_voice_id?: string;
  duration_estimate?: number;
}

export interface SSMLNode {
  id: string;
  type: 'pause' | 'voice' | 'emotion' | 'pronunciation' | 'music' | 'sfx';
  label: string;
  properties: Record<string, any>;
  x: number;
  y: number;
  connections: string[];
}

export interface AnalyticsData {
  date: string;
  minutes_generated: number;
  synthesis_count: number;
  cloning_count: number;
  downloads: number;
}

export interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}

// Extended Subscription type matching DB schema
export interface Subscription {
  id: string;
  user_id: string;
  tier: SubscriptionTier;
  status: 'active' | 'canceled' | 'past_due' | 'pending';
  paddle_customer_id?: string;
  paddle_subscription_id?: string;
  plan_id?: string;
  current_period_start?: string;
  current_period_end?: string;
  trial_end?: string;
  cancel_at_period_end?: boolean;
  created_at: string;
  updated_at: string;
}

// Database type helpers
export type WorkspaceRole = 'admin' | 'editor' | 'viewer';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'pending';
