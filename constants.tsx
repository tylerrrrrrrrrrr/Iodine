
import { MCPackage } from './types';

export const INITIAL_PACKAGES: MCPackage[] = [
  {
    id: '1',
    name: 'Legendary Rank',
    description: 'The ultimate rank for the ultimate survivor. Stand out in the crowd with a golden nametag.',
    price: 49.99,
    category: 'Ranks',
    image: 'https://picsum.photos/seed/rank1/400/300',
    features: ['[Legend] Prefix', 'Priority Queue', 'Fly in Hub', '/nick command']
  },
  {
    id: '2',
    name: '10,000 SkyCoins',
    description: 'Boost your progress with a massive pouch of coins. Perfect for expanding your island.',
    price: 9.99,
    category: 'Coins',
    image: 'https://picsum.photos/seed/coins/400/300',
    features: ['Instant delivery', 'No cooldowns', 'Stackable']
  },
  {
    id: '3',
    name: 'Ender Crate Key x5',
    description: 'Unlock the mysteries of the end. Contains high-tier loot and rare artifacts.',
    price: 14.99,
    category: 'Keys',
    image: 'https://picsum.photos/seed/keys/400/300',
    features: ['Rare Enchantments', 'Custom Tools', 'Special Particles']
  },
  {
    id: '4',
    name: 'Dragon Wings',
    description: 'Majestic wings that flutter behind you. Purely cosmetic, purely awesome.',
    price: 19.99,
    category: 'Cosmetics',
    image: 'https://picsum.photos/seed/wings/400/300',
    features: ['Custom Model', 'Toggleable', 'Works in all worlds']
  }
];
