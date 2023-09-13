import { store } from "../redux/store";

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

interface booksSliceProps {
  initialState: initialStateType;
  action: any;
}

interface debounceProps {
  value: string;
  milliSeconds: number;
}
export interface KindBooksVolumesTotalItems {
  kind: string;
  totalItems: number;
  items: Item[];
}
interface initialStateType {
  books: Item[];
  isLoading: boolean;
  category: string;
  maxResults: number;
  inputText: string;
  sortBy: string;
  findedItems: number;
  page: number;
  inLastPage: boolean;
}

export interface Item {
  kind: Kind;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
  searchInfo?: SearchInfo;
}

export interface AccessInfo {
  country: Country;
  viewability: Viewability;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: TextToSpeechPermission;
  epub: Epub;
  pdf: PDF;
  webReaderLink: string;
  accessViewStatus: AccessViewStatus;
  quoteSharingAllowed: boolean;
}

export enum AccessViewStatus {
  None = "NONE",
  Sample = "SAMPLE",
}

export enum Country {
  Am = "AM",
}

export interface Epub {
  isAvailable: boolean;
}

export interface PDF {
  isAvailable: boolean;
  acsTokenLink?: string;
}

export enum TextToSpeechPermission {
  Allowed = "ALLOWED",
}

export enum Viewability {
  NoPages = "NO_PAGES",
  Partial = "PARTIAL",
}

export enum Kind {
  BooksVolume = "books#volume",
}

export interface SaleInfo {
  country: Country;
  saleability: Saleability;
  isEbook: boolean;
}

export enum Saleability {
  NotForSale = "NOT_FOR_SALE",
}

export interface SearchInfo {
  textSnippet: string;
}

export interface VolumeInfo {
  title: string;
  authors: string[];
  publishedDate: string;
  readingModes: ReadingModes;
  pageCount: number;
  printType: PrintType;
  maturityRating: MaturityRating;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary?: PanelizationSummary;
  imageLinks: ImageLinks;
  language: Language;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
  publisher?: string;
  description?: string;
  industryIdentifiers?: IndustryIdentifier[];
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  subtitle?: string;
}

export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

export interface IndustryIdentifier {
  type: Type;
  identifier: string;
}

export enum Type {
  Isbn10 = "ISBN_10",
  Isbn13 = "ISBN_13",
  Other = "OTHER",
}

export enum Language {
  En = "en",
  Es = "es",
}

export enum MaturityRating {
  NotMature = "NOT_MATURE",
}

export interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}

export enum PrintType {
  Book = "BOOK",
}

export interface ReadingModes {
  text: boolean;
  image: boolean;
}
export type {
  AppDispatch,
  RootState,
  booksSliceProps,
  debounceProps,
  initialStateType,
};
