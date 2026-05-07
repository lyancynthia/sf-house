// ============================================================
// Property Types
// ============================================================
export interface Property {
  id: string;
  name: string;
  nameCn: string;
  description: string;
  descriptionCn: string;
  address: string;
  neighborhood: string;
  price: number; // monthly rent in USD
  deposit: number;
  available: boolean;
  moveInDate: string; // ISO date string
  images: string[];
  amenities: string[];
  amenitiesCn: string[];
  size: string; // e.g., "450 sqft"
  floor: number;
  petPolicy: string;
  petPolicyCn: string;
  featured?: boolean;
  note?: string; // special notes like availability date, pricing conditions
}

// ============================================================
// Booking Types
// ============================================================
export interface BookingData {
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  moveInDate: string;
  duration: number; // months
}

export interface LeaseResponse {
  success: boolean;
  leaseUrl?: string;
  message: string;
}

// ============================================================
// Lead / CRM Types
// ============================================================
export type LeadType = 'inquiry' | 'tour' | 'booking';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: LeadType;
  propertyId?: string;
  message?: string;
  preferredDate?: string;
  createdAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  type: 'inquiry' | 'tour';
  message?: string;
  preferredDate?: string;
}

export interface TourFormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  propertyId?: string;
  message?: string;
}

// ============================================================
// Chatbot Types
// ============================================================
export type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

export interface ChatState {
  isOpen: boolean;
  messages: Message[];
  suggestedAction?: 'listing' | 'tour' | 'booking';
}

export interface ChatApiRequest {
  message: string;
  history: Pick<Message, 'role' | 'content'>[];
}

export interface ChatApiResponse {
  response: string;
  suggestedAction?: 'listing' | 'tour' | 'booking';
  error?: string;
}

// ============================================================
// Lease Types
// ============================================================
export interface LeaseData {
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  propertyId: string;
  propertyName: string;
  propertyAddress: string;
  moveInDate: string;
  durationMonths: number;
  monthlyRent: number;
  deposit: number;
  leaseContent?: string;
}
