
export type PackageCategory = 'Ranks' | 'Coins' | 'Keys' | 'Cosmetics';

export interface MCPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  category: PackageCategory;
  image: string;
  features: string[];
}
