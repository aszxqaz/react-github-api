/**
 * Тип для репозитория, используемый на фронтенде.
 */
export type Repository = {
  id: string;
  name: string;
  description?: string;
  primaryLanguage?: Language;
  languages?: Language[];
  license?: string;
  forkCount: number;
  stargazerCount: number;
  updatedAt: string;
};

export type Language = {
  id: string;
  name: string;
};
