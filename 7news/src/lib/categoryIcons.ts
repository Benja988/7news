// lib/categoryIcons.ts
import {
  BookOpen,
  Camera,
  Code,
  Coffee,
  Gamepad2,
  Heart,
  Music,
  Zap,
  Settings,
  Globe,
  Edit3,
  Grid3X3
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export const getCategoryIcon = (name: string): LucideIcon => {
  const lowerName = name.toLowerCase();

  // World categories
  if (lowerName.includes('world') || lowerName.includes('africa') || lowerName.includes('asia') ||
      lowerName.includes('europe') || lowerName.includes('america') || lowerName.includes('oceania') ||
      lowerName.includes('middle east') || lowerName.includes('global')) {
    return Globe;
  }

  // Politics categories
  if (lowerName.includes('politics') || lowerName.includes('government') || lowerName.includes('election') ||
      lowerName.includes('policy') || lowerName.includes('analysis') || lowerName.includes('corruption')) {
    return BookOpen;
  }

  // Business categories
  if (lowerName.includes('business') || lowerName.includes('economy') || lowerName.includes('market') ||
      lowerName.includes('startup') || lowerName.includes('entrepreneurship') || lowerName.includes('finance') ||
      lowerName.includes('banking') || lowerName.includes('investment')) {
    return Zap;
  }

  // Technology categories
  if (lowerName.includes('technology') || lowerName.includes('ai') || lowerName.includes('artificial intelligence') ||
      lowerName.includes('gadgets') || lowerName.includes('software') || lowerName.includes('cybersecurity') ||
      lowerName.includes('internet') || lowerName.includes('social media')) {
    return Code;
  }

  // Sports categories
  if (lowerName.includes('sports') || lowerName.includes('football') || lowerName.includes('basketball') ||
      lowerName.includes('athletics') || lowerName.includes('tennis') || lowerName.includes('rugby') ||
      lowerName.includes('esports') || lowerName.includes('analysis')) {
    return Gamepad2;
  }

  // Entertainment categories
  if (lowerName.includes('entertainment') || lowerName.includes('movies') || lowerName.includes('music') ||
      lowerName.includes('tv') || lowerName.includes('streaming') || lowerName.includes('celebrities') ||
      lowerName.includes('culture') || lowerName.includes('fashion')) {
    return Music;
  }

  // Health categories
  if (lowerName.includes('health') || lowerName.includes('fitness') || lowerName.includes('nutrition') ||
      lowerName.includes('mental') || lowerName.includes('medicine') || lowerName.includes('public health')) {
    return Heart;
  }

  // Science categories
  if (lowerName.includes('science') || lowerName.includes('space') || lowerName.includes('environment') ||
      lowerName.includes('discoveries') || lowerName.includes('research') || lowerName.includes('climate')) {
    return Zap;
  }

  // Education categories
  if (lowerName.includes('education') || lowerName.includes('schools') || lowerName.includes('universities') ||
      lowerName.includes('learning') || lowerName.includes('skills') || lowerName.includes('student')) {
    return BookOpen;
  }

  // Environment categories
  if (lowerName.includes('environment') || lowerName.includes('wildlife') || lowerName.includes('nature') ||
      lowerName.includes('sustainability') || lowerName.includes('energy') || lowerName.includes('resources')) {
    return Coffee; // Using coffee as a nature/environment icon
  }

  // Opinion/Editorial categories
  if (lowerName.includes('opinion') || lowerName.includes('editorial') || lowerName.includes('commentary') ||
      lowerName.includes('letters')) {
    return Edit3;
  }

  // Travel categories
  if (lowerName.includes('travel') || lowerName.includes('destinations') || lowerName.includes('adventure') ||
      lowerName.includes('tips')) {
    return Camera;
  }

  // Lifestyle categories
  if (lowerName.includes('lifestyle') || lowerName.includes('relationships') || lowerName.includes('food') ||
      lowerName.includes('drink') || lowerName.includes('home') || lowerName.includes('design') ||
      lowerName.includes('beauty')) {
    return Heart;
  }

  // Crime/Security categories
  if (lowerName.includes('crime') || lowerName.includes('security') || lowerName.includes('law') ||
      lowerName.includes('enforcement') || lowerName.includes('court') || lowerName.includes('cybercrime') ||
      lowerName.includes('safety')) {
    return Settings;
  }

  // Religion categories
  if (lowerName.includes('religion') || lowerName.includes('faith') || lowerName.includes('christianity') ||
      lowerName.includes('islam') || lowerName.includes('hinduism') || lowerName.includes('interfaith') ||
      lowerName.includes('religious')) {
    return BookOpen;
  }

  // Local/Regional categories
  if (lowerName.includes('local') || lowerName.includes('regional') || lowerName.includes('county') ||
      lowerName.includes('city') || lowerName.includes('community') || lowerName.includes('events')) {
    return Grid3X3;
  }

  // Breaking News categories
  if (lowerName.includes('breaking') || lowerName.includes('urgent') || lowerName.includes('live') ||
      lowerName.includes('trending')) {
    return Zap;
  }

  // Opinion Polls categories
  if (lowerName.includes('polls') || lowerName.includes('surveys') || lowerName.includes('predictions') ||
      lowerName.includes('data') || lowerName.includes('journalism')) {
    return BookOpen;
  }

  // Culture categories
  if (lowerName.includes('culture') || lowerName.includes('art') || lowerName.includes('literature') ||
      lowerName.includes('heritage') || lowerName.includes('photography')) {
    return Camera;
  }

  // Autos/Transport categories
  if (lowerName.includes('autos') || lowerName.includes('automotive') || lowerName.includes('electric') ||
      lowerName.includes('vehicles') || lowerName.includes('transport') || lowerName.includes('aviation')) {
    return Settings;
  }

  // Default fallback
  return BookOpen;
};