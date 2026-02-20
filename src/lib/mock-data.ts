import type { Profile, ArtistProfile, Artwork, ArtworkImage, ArtworkType } from '@/types/database';

// ============================================
// TYPES MOCKÉES
// ============================================

export interface MockArtist {
  profile: Profile;
  artistProfile: ArtistProfile;
}

export interface MockArtwork extends Artwork {
  images: ArtworkImage[];
  artist: MockArtist;
}

// ============================================
// ARTISTES
// ============================================

const now = new Date().toISOString();

export const mockArtists: MockArtist[] = [
  {
    profile: {
      id: 'artist-1',
      role: 'artist',
      email: 'claire.dubois@email.com',
      first_name: 'Claire',
      last_name: 'Dubois',
      phone: null,
      avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
      created_at: now,
      updated_at: now,
    },
    artistProfile: {
      id: 'artist-1',
      bio: 'Artiste peintre installée à Paris depuis 15 ans, Claire Dubois explore les frontières entre abstraction et figuration. Ses toiles, riches en textures et en couleurs profondes, interrogent notre rapport à la mémoire et au paysage intérieur. Exposée dans plusieurs galeries parisiennes et internationales.',
      website: 'https://clairedubois-art.fr',
      city: 'Paris',
      region: 'Île-de-France',
      art_types: ['painting'],
      portfolio_url: null,
      is_validated: true,
      created_at: now,
    },
  },
  {
    profile: {
      id: 'artist-2',
      role: 'artist',
      email: 'marc.lefebvre@email.com',
      first_name: 'Marc',
      last_name: 'Lefebvre',
      phone: null,
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      created_at: now,
      updated_at: now,
    },
    artistProfile: {
      id: 'artist-2',
      bio: 'Sculpteur et céramiste lyonnais, Marc Lefebvre travaille la terre et le bronze depuis plus de 20 ans. Ses sculptures organiques, inspirées par la nature et le mouvement, trouvent leur place aussi bien dans les espaces publics que les collections privées.',
      website: null,
      city: 'Lyon',
      region: 'Auvergne-Rhône-Alpes',
      art_types: ['sculpture', 'ceramic'],
      portfolio_url: null,
      is_validated: true,
      created_at: now,
    },
  },
  {
    profile: {
      id: 'artist-3',
      role: 'artist',
      email: 'sophie.martin@email.com',
      first_name: 'Sophie',
      last_name: 'Martin',
      phone: null,
      avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
      created_at: now,
      updated_at: now,
    },
    artistProfile: {
      id: 'artist-3',
      bio: 'Photographe d\'art basée à Marseille, Sophie Martin capture l\'essence de la lumière méditerranéenne à travers des tirages argentiques et numériques grand format. Son travail, entre documentaire poétique et abstraction, a été récompensé par plusieurs prix internationaux.',
      website: 'https://sophiemartin-photo.com',
      city: 'Marseille',
      region: 'Provence-Alpes-Côte d\'Azur',
      art_types: ['photography'],
      portfolio_url: null,
      is_validated: true,
      created_at: now,
    },
  },
  {
    profile: {
      id: 'artist-4',
      role: 'artist',
      email: 'thomas.roux@email.com',
      first_name: 'Thomas',
      last_name: 'Roux',
      phone: null,
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
      created_at: now,
      updated_at: now,
    },
    artistProfile: {
      id: 'artist-4',
      bio: 'Graveur et illustrateur bordelais, Thomas Roux pratique l\'eau-forte, la lithographie et la sérigraphie. Ses estampes mêlent univers onirique et précision technique, créant des oeuvres à la fois intimes et universelles. Membre de la Société des Peintres-Graveurs Français.',
      website: null,
      city: 'Bordeaux',
      region: 'Nouvelle-Aquitaine',
      art_types: ['engraving', 'painting'],
      portfolio_url: null,
      is_validated: true,
      created_at: now,
    },
  },
  {
    profile: {
      id: 'artist-5',
      role: 'artist',
      email: 'amina.benali@email.com',
      first_name: 'Amina',
      last_name: 'Benali',
      phone: null,
      avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
      created_at: now,
      updated_at: now,
    },
    artistProfile: {
      id: 'artist-5',
      bio: 'Artiste textile et tapissière installée à Toulouse, Amina Benali crée des tapisseries contemporaines qui tissent un dialogue entre traditions artisanales et art actuel. Ses oeuvres monumentales, riches en couleurs et en motifs géométriques, ornent des espaces publics dans toute la France.',
      website: 'https://aminabenali.art',
      city: 'Toulouse',
      region: 'Occitanie',
      art_types: ['tapestry', 'ceramic'],
      portfolio_url: null,
      is_validated: true,
      created_at: now,
    },
  },
];

// ============================================
// OEUVRES
// ============================================

function makeArtwork(
  id: string,
  artistId: string,
  title: string,
  description: string,
  artworkType: ArtworkType,
  technique: string,
  dimensions: string,
  yearCreated: number,
  artistPriceCents: number,
  commissionRate: number,
): Artwork {
  const commissionCents = Math.round(artistPriceCents * commissionRate);
  return {
    id,
    artist_id: artistId,
    title,
    description,
    artwork_type: artworkType,
    technique,
    dimensions,
    year_created: yearCreated,
    artist_price_cents: artistPriceCents,
    commission_rate: commissionRate,
    commission_cents: commissionCents,
    display_price_cents: artistPriceCents + commissionCents,
    status: 'published',
    rejection_reason: null,
    is_eligible: true,
    venue_id: null,
    created_at: now,
    updated_at: now,
  };
}

function makeImage(id: string, artworkId: string, url: string, isPrimary: boolean, order: number): ArtworkImage {
  return { id, artwork_id: artworkId, image_url: url, is_primary: isPrimary, sort_order: order, created_at: now };
}

const artworksData: Artwork[] = [
  // --- Claire Dubois (peinture) ---
  makeArtwork('aw-1', 'artist-1', 'Aurore sur les toits', 'Une composition abstraite aux tons chauds évoquant la lumière dorée du matin sur les toits parisiens. Les couches successives de peinture à l\'huile créent une profondeur saisissante, entre figuration et abstraction. Cette oeuvre capture l\'essence de ces instants fugaces où la ville s\'éveille dans une brume lumineuse.', 'painting', 'Huile sur toile', '120 × 80 cm', 2023, 800000, 0.15),
  makeArtwork('aw-2', 'artist-1', 'Les Fragments du silence', 'Grande toile expressionniste où les bleus profonds et les noirs se mêlent à des éclats de blanc et d\'or. Claire Dubois y explore le thème du silence intérieur, cette qualité de présence que seul l\'art peut matérialiser. La matière picturale, épaisse et texturée, invite à une contemplation prolongée.', 'painting', 'Acrylique et feuille d\'or sur toile', '150 × 120 cm', 2024, 1200000, 0.10),
  makeArtwork('aw-3', 'artist-1', 'Jardin d\'hiver', 'Peinture lumineuse inspirée des serres parisiennes, où la transparence du verre se mêle à la luxuriance végétale. Les verts émeraude et les reflets aquatiques créent un espace de sérénité et de respiration au coeur de l\'urbain.', 'painting', 'Technique mixte sur toile', '100 × 100 cm', 2022, 650000, 0.15),

  // --- Marc Lefebvre (sculpture, céramique) ---
  makeArtwork('aw-4', 'artist-2', 'L\'Envol', 'Sculpture en bronze patiné représentant une forme organique en mouvement ascendant. Cette pièce capture l\'élan vital, la tension entre l\'ancrage terrestre et l\'aspiration au ciel. Le bronze, travaillé avec une patine verte et dorée, joue avec la lumière pour créer des reflets changeants.', 'sculpture', 'Bronze patiné', '45 × 30 × 25 cm', 2023, 1800000, 0.10),
  makeArtwork('aw-5', 'artist-2', 'Terre promise', 'Ensemble de trois vases sculpturaux en grès émaillé, aux formes asymétriques et aux textures volcaniques. Chaque pièce est unique, façonnée à la main et cuite au four à bois. L\'émail craquelé dans des tons de terre et d\'ocre évoque les paysages arides et leur beauté brute.', 'ceramic', 'Grès émaillé, cuisson bois', '60 × 40 × 40 cm (ensemble)', 2024, 350000, 0.20),
  makeArtwork('aw-6', 'artist-2', 'Méridien', 'Sculpture monumentale en acier corten et laiton, conçue pour un espace extérieur ou un grand hall. Ses lignes épurées tracent dans l\'espace une courbe qui évoque un méridien terrestre, reliant symboliquement nord et sud, terre et ciel.', 'sculpture', 'Acier corten et laiton', '180 × 60 × 60 cm', 2021, 2500000, 0.10),

  // --- Sophie Martin (photographie) ---
  makeArtwork('aw-7', 'artist-3', 'Calanques, midi', 'Tirage photographique grand format capturant la lumière zénithale sur les falaises calcaires des calanques. L\'eau turquoise contraste avec la blancheur minérale de la roche. Tirage pigmentaire sur papier Hahnemühle, contrecollé sur aluminium, édition limitée à 8 exemplaires.', 'photography', 'Tirage pigmentaire sur Hahnemühle', '120 × 80 cm', 2023, 450000, 0.20),
  makeArtwork('aw-8', 'artist-3', 'Nocturne portuaire', 'Photographie noir et blanc du Vieux-Port de Marseille la nuit. Les reflets des lumières sur l\'eau créent une abstraction lumineuse, entre réalité documentaire et vision poétique. Tirage argentique baryte, contrecollé et encadré chêne naturel. Édition 5/12.', 'photography', 'Tirage argentique baryte', '90 × 60 cm', 2022, 280000, 0.20),

  // --- Thomas Roux (gravure, peinture) ---
  makeArtwork('aw-9', 'artist-4', 'Les Voyageurs immobiles', 'Suite de trois eaux-fortes sur cuivre, tirées à la main sur papier Arches. Ces gravures délicates représentent des silhouettes en attente, figures universelles du voyage et de la contemplation. La finesse du trait et les jeux d\'ombres créent une atmosphère onirique et intemporelle.', 'engraving', 'Eau-forte sur cuivre, papier Arches', '50 × 40 cm (×3)', 2024, 180000, 0.25),
  makeArtwork('aw-10', 'artist-4', 'Cartographie intérieure', 'Lithographie grand format mêlant cartographie imaginaire et paysage mental. Les lignes topographiques se transforment en veines, en rivières, en chemins de vie. Tirée en 15 exemplaires sur papier Rives BFK.', 'engraving', 'Lithographie, papier Rives BFK', '70 × 50 cm', 2023, 150000, 0.25),

  // --- Amina Benali (tapisserie, céramique) ---
  makeArtwork('aw-11', 'artist-5', 'Tissage d\'horizon', 'Tapisserie murale contemporaine tissée à la main en laine et soie naturelle. Les motifs géométriques inspirés de l\'architecture islamique dialoguent avec des formes abstraites modernes. Les teintes de bleu indigo, d\'or et de terre de Sienne créent une oeuvre à la fois apaisante et vibrante.', 'tapestry', 'Laine et soie, tissage main', '200 × 150 cm', 2024, 1500000, 0.10),
  makeArtwork('aw-12', 'artist-5', 'Géométries sacrées', 'Installation céramique composée de 12 carreaux émaillés formant un panneau mural. Chaque carreau est unique, décoré de motifs géométriques complexes en bleu cobalt et or sur fond blanc. L\'ensemble crée un jeu de rythme et de lumière qui transforme l\'espace.', 'ceramic', 'Faïence émaillée, bleu cobalt et or', '120 × 90 cm (panneau)', 2023, 420000, 0.20),
];

const artworkImages: Record<string, ArtworkImage[]> = {
  'aw-1': [
    makeImage('img-1a', 'aw-1', 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80', true, 0),
    makeImage('img-1b', 'aw-1', 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&q=80', false, 1),
    makeImage('img-1c', 'aw-1', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80', false, 2),
  ],
  'aw-2': [
    makeImage('img-2a', 'aw-2', 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80', true, 0),
    makeImage('img-2b', 'aw-2', 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80', false, 1),
    makeImage('img-2c', 'aw-2', 'https://images.unsplash.com/photo-1551913902-c92207136625?w=800&q=80', false, 2),
  ],
  'aw-3': [
    makeImage('img-3a', 'aw-3', 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80', true, 0),
    makeImage('img-3b', 'aw-3', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80', false, 1),
    makeImage('img-3c', 'aw-3', 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80', false, 2),
  ],
  'aw-4': [
    makeImage('img-4a', 'aw-4', 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800&q=80', true, 0),
    makeImage('img-4b', 'aw-4', 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=800&q=80', false, 1),
    makeImage('img-4c', 'aw-4', 'https://images.unsplash.com/photo-1544413164-5f1b361f5bfa?w=800&q=80', false, 2),
  ],
  'aw-5': [
    makeImage('img-5a', 'aw-5', 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80', true, 0),
    makeImage('img-5b', 'aw-5', 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80', false, 1),
    makeImage('img-5c', 'aw-5', 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800&q=80', false, 2),
  ],
  'aw-6': [
    makeImage('img-6a', 'aw-6', 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&q=80', true, 0),
    makeImage('img-6b', 'aw-6', 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80', false, 1),
  ],
  'aw-7': [
    makeImage('img-7a', 'aw-7', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', true, 0),
    makeImage('img-7b', 'aw-7', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', false, 1),
    makeImage('img-7c', 'aw-7', 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=800&q=80', false, 2),
  ],
  'aw-8': [
    makeImage('img-8a', 'aw-8', 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=800&q=80', true, 0),
    makeImage('img-8b', 'aw-8', 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?w=800&q=80', false, 1),
  ],
  'aw-9': [
    makeImage('img-9a', 'aw-9', 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?w=800&q=80', true, 0),
    makeImage('img-9b', 'aw-9', 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80', false, 1),
    makeImage('img-9c', 'aw-9', 'https://images.unsplash.com/photo-1561214078-f3247647fc5e?w=800&q=80', false, 2),
  ],
  'aw-10': [
    makeImage('img-10a', 'aw-10', 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=800&q=80', true, 0),
    makeImage('img-10b', 'aw-10', 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800&q=80', false, 1),
  ],
  'aw-11': [
    makeImage('img-11a', 'aw-11', 'https://images.unsplash.com/photo-1528396518501-b53b655eb9b3?w=800&q=80', true, 0),
    makeImage('img-11b', 'aw-11', 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80', false, 1),
    makeImage('img-11c', 'aw-11', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80', false, 2),
  ],
  'aw-12': [
    makeImage('img-12a', 'aw-12', 'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=800&q=80', true, 0),
    makeImage('img-12b', 'aw-12', 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80', false, 1),
  ],
};

// ============================================
// DONNÉES ASSEMBLÉES
// ============================================

const artistsById = Object.fromEntries(mockArtists.map((a) => [a.profile.id, a]));

export const mockArtworks: MockArtwork[] = artworksData.map((aw) => ({
  ...aw,
  images: artworkImages[aw.id] || [],
  artist: artistsById[aw.artist_id],
}));

// ============================================
// HELPERS
// ============================================

export function getArtworkById(id: string): MockArtwork | undefined {
  return mockArtworks.find((aw) => aw.id === id);
}

export function getPublishedArtworks(): MockArtwork[] {
  return mockArtworks.filter((aw) => aw.status === 'published');
}

export function getRelatedArtworks(id: string, limit = 3): MockArtwork[] {
  const artwork = getArtworkById(id);
  if (!artwork) return [];
  return mockArtworks
    .filter((aw) => aw.id !== id && (aw.artwork_type === artwork.artwork_type || aw.artist_id === artwork.artist_id))
    .slice(0, limit);
}

export const ARTWORK_TYPE_LABELS: Record<ArtworkType, string> = {
  painting: 'Peinture',
  sculpture: 'Sculpture',
  photography: 'Photographie',
  engraving: 'Gravure',
  tapestry: 'Tapisserie',
  ceramic: 'Céramique',
  other: 'Autre',
};
