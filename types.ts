export type StudioTab =
  | 'dashboard'
  | 'cartoon'
  | 'video'
  | 'comedy'
  | 'voice'
  | 'content'
  | 'viral'
  | 'history'
  | 'pricing'
  | 'settings';

export type ToolType = 'cartoon' | 'video' | 'comedy' | 'voice' | 'content' | 'viral';

// Feature 1: AI Cartoon Studio
export type CartoonStyle = '3d_cartoon' | 'anime' | 'realistic_cartoon' | 'children_animation';

export interface CartoonInput {
  characterDescription: string;
  style: CartoonStyle;
  mood: string;
  setting: string;
  aspectRatio: '1:1' | '9:16' | '16:9';
}

export interface CartoonOutput {
  title: string;
  imagePrompt: string;
  negativePrompt: string;
  artStyleSummary: string;
  lightingAndCamera: string;
  colorPalette: { name: string; hex: string }[];
  turnaroundDirections: {
    frontView: string;
    threeQuarterView: string;
    sideProfile: string;
  };
  recommendedEngines: string[];
}

// Feature 2: AI Video Studio
export type VideoGenre = 'comedy' | 'storytelling' | 'children' | 'advertising' | 'motivational';

export interface VideoInput {
  concept: string;
  genre: VideoGenre;
  duration: '15s' | '30s' | '60s' | '2-3m';
  pacing: string;
}

export interface VideoScene {
  sceneNumber: number;
  timecode: string;
  visual: string;
  audioDialogue: string;
  sfxMusic: string;
  cameraMovement: string;
}

export interface VideoOutput {
  title: string;
  logline: string;
  genre: string;
  duration: string;
  scenes: VideoScene[];
  aiVideoPrompt: string;
  productionNotes: string;
  suggestedAspectRatio: string;
  connectNotice: string;
}

// Feature 3: Nigerian Comedy Writer
export type ComedyLocation =
  | 'danfo'
  | 'compound'
  | 'mama_put'
  | 'church_event'
  | 'checkpoint'
  | 'hostel'
  | 'japa';

export type ComedyStyle =
  | 'street_smart'
  | 'sarcastic_parent'
  | 'ijgb'
  | 'village_meeting'
  | 'landlord_tenant'
  | 'genz_vs_boomer';

export type LanguageBlend = 'pidgin' | 'mixed' | 'nigerian_english';

export interface ComedyInput {
  premise: string;
  charactersCount: '1' | '2' | '3-4';
  location: ComedyLocation;
  comedyStyle: ComedyStyle;
  languageBlend: LanguageBlend;
  duration: '30s' | '1min' | '3min';
}

export interface ComedyCharacter {
  name: string;
  nickname: string;
  roleQuirk: string;
}

export interface ComedyDialogueLine {
  speaker: string;
  direction?: string;
  line: string;
  sfxCue?: string;
}

export interface ComedyOutput {
  title: string;
  settingDescription: string;
  characters: ComedyCharacter[];
  script: ComedyDialogueLine[];
  punchlineSecret: string;
  viralTagline: string;
}

// Feature 4: AI Voice Studio
export type VoiceDialect =
  | 'pidgin_street'
  | 'pidgin_aunty'
  | 'naija_corporate'
  | 'naija_hypeman'
  | 'standard_warm'
  | 'standard_dramatic';

export interface VoiceInput {
  dialogueText: string;
  dialect: VoiceDialect;
  tone: string;
  pace: 'Slow' | 'Normal' | 'Fast & Hype';
}

export interface PhoneticGuideItem {
  term: string;
  pronunciation: string;
  meaning: string;
}

export interface VoiceOutput {
  title: string;
  formattedScriptWithSSML: string;
  cleanText: string;
  deliveryNotes: string;
  phoneticGuide: PhoneticGuideItem[];
  suggestedSettings: {
    stability: string;
    clarity: string;
    styleExaggeration: string;
    recommendedVoiceType: string;
  };
  audioIntegrationNotice: string;
}

// Feature 5: Content Creator
export interface ContentInput {
  topic: string;
  platform: 'all' | 'tiktok' | 'youtube' | 'instagram' | 'facebook';
  tone: string;
}

export interface ContentHook {
  hook: string;
  retentionScore: string;
  whyItWorks: string;
}

export interface ContentOutput {
  hooks: ContentHook[];
  youtubeTitles: string[];
  youtubeDescription: string;
  tiktokCaption: string;
  facebookPost: string;
  hashtags: {
    trending: string[];
    niche: string[];
    broad: string[];
  };
}

// Feature 6: Viral Idea Studio
export interface ViralInput {
  niche: 'animation' | 'comedy_skits' | 'relatable_hustle' | 'african_folklore' | 'tech_future_africa';
  targetAudience: string;
  format: string;
}

export interface ViralConcept {
  title: string;
  premise: string;
  threeSecondHook: string;
  plotTwist: string;
  viralTriggerReason: string;
  soundAudioRecommendation: string;
  estimatedEffort: string;
}

export interface ViralOutput {
  concepts: ViralConcept[];
  algorithmDisclaimer: string;
  distributionTip: string;
}

// Universal History Item
export interface HistoryRecord {
  id: string;
  tool: ToolType;
  title: string;
  timestamp: number;
  previewSnippet: string;
  inputSummary: string;
  fullData:
    | CartoonOutput
    | VideoOutput
    | ComedyOutput
    | VoiceOutput
    | ContentOutput
    | ViralOutput;
}

// User Settings
export interface UserSettings {
  creatorName: string;
  socialHandle: string;
  preferredDialect: LanguageBlend;
  themeAccent: 'purple' | 'cyan' | 'amber';
  soundEffectsEnabled: boolean;
  autoSaveToHistory: boolean;
}
