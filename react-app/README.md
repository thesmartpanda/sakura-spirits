# Sakura Spirits — React App

React/TypeScript frontend for the Sakura Spirits Japanese whisky shop. Migrated from vanilla JS, backed by a Directus CMS API.

---

## Structure des dossiers

```
react-app/
├── src/
│   ├── App.tsx           # Routeur racine (BrowserRouter + routes)
│   ├── main.tsx          # Point d'entrée React
│   ├── index.css         # Variables CSS globales et reset
│   ├── assets/           # Images et SVG statiques
│   ├── components/       # Composants UI réutilisables
│   ├── contexts/         # Contextes React (AppProvider, CartContext)
│   ├── hooks/            # Hooks personnalisés
│   ├── lib/
│   │   └── directus.ts   # Client API, types raw/domain, fonctions de mapping
│   ├── pages/            # Composants de page (un par route)
│   └── test/
│       └── setup.ts      # Configuration vitest + testing-library
```

---

## Pages et routes

| Route | Composant | Contenu |
|---|---|---|
| `/` | `HomePage` | Hero, sélection vedette, bande philosophie, régions, newsletter |
| `/shop` | `ShopPage` | Filtre/tri, grille produits, drawer de dégustation, toast panier |
| `/reviews` | `ReviewsPage` | Notes de dégustation filtrables, formulaire de soumission |
| `/about` | `AboutPage` | Hero, valeurs, timeline, équipe |
| `/contact` | `ContactPage` | Infos de contact, formulaire, FAQ |

---

## Composants

### Layout

| Composant | Rôle |
|---|---|
| `Layout` | Shell commun — `<Nav>` + `<Outlet>` + `<Footer>` |
| `Nav` | Barre de navigation avec badge du nombre d'articles dans le panier |
| `Footer` | Pied de page avec liens de navigation |

### Partagés

| Composant | Rôle |
|---|---|
| `PageHero` | Bandeau hero réutilisable pour les pages internes (kicker, titre, sous-titre, accent torii) |
| `Reveal` | Wrapper `IntersectionObserver` — anime l'apparition au scroll |
| `SectionHeader` | Label + titre + corps optionnel en-tête de section |
| `ToriiAccent` | SVG décoratif torii positionné en absolu |

### Page d'accueil

| Composant | Rôle |
|---|---|
| `Hero` | Hero animé avec fleurs de sakura tombantes |
| `FeaturedSection` | Grille des 3 whiskies vedettes |
| `FeaturedCard` | Carte whisky dans la section vedette |
| `PhilosophyBand` | CTA de la marque vers la page About |
| `RegionsSection` | Grille des régions de whisky |
| `RegionCard` | Carte d'une région, lien filtré vers /shop |
| `NewsletterSection` | Formulaire d'inscription à la newsletter |

### Page boutique

| Composant | Rôle |
|---|---|
| `FilterBar` | Barre de filtres (distillerie) et de tri (prix, note) |
| `FilterChip` | Bouton pill individuel de filtre |
| `ShopGrid` | Grille de cartes produits |
| `WhiskyCard` | Carte produit — ajoute au panier, ouvre le drawer |
| `TastingDrawer` | Panneau latéral coulissant avec les notes complètes de dégustation |
| `FlavorBarRow` | Barre animée d'un arôme dans le profil de dégustation |
| `BottleSvg` | Illustration SVG de bouteille avec kanji |
| `CartToast` | Notification toast après ajout au panier (portal) |

### Page avis

| Composant | Rôle |
|---|---|
| `ScoreBand` | Bandeau légende des couleurs de score |
| `ScoreLegendItem` | Entrée individuelle de la légende |
| `ReviewsSidebar` | Sidebar de filtrage par distillerie et score minimum |
| `ReviewsList` | Liste de `ReviewCard` filtrée |
| `ReviewCard` | Carte de note de dégustation (nez/palais/finale dépliables) |
| `WriteReviewForm` | Formulaire de soumission d'un avis (status `draft`) |
| `StarPicker` | Sélecteur de note en étoiles interactif |
| `StarRating` | Affichage seul d'une note en étoiles |

### Page À propos

| Composant | Rôle |
|---|---|
| `AboutHero` | Section hero de la page About |
| `ValuesSection` | Affichage des valeurs de la marque |
| `ValueItem` | Entrée individuelle d'une valeur numérotée |
| `TimelineSection` | Timeline de l'histoire de la marque |
| `TimelineItem` | Entrée individuelle de la timeline |
| `TeamSection` | Grille des membres de l'équipe |
| `TeamCard` | Carte d'un membre de l'équipe |

### Page contact

| Composant | Rôle |
|---|---|
| `ContactInfo` | Adresse, téléphone, email |
| `InfoBlock` | Ligne label + contenu dans ContactInfo |
| `ContactForm` | Formulaire de contact (POST vers Directus) |
| `FaqSection` | Liste FAQ en accordéon |
| `FaqItem` | Question/réponse repliable individuelle |

---

## Hooks

### Persistance locale

| Hook | Signature | Usage |
|---|---|---|
| `useLocalStorage` | `(key, initialValue) → [value, setValue]` | État React persisté dans `localStorage` avec synchronisation cross-onglets via l'événement `storage` |

### Primitives réseau

| Hook | Signature | Usage |
|---|---|---|
| `useFetch<T>` | `(path \| null) → { data, loading, error }` | GET générique vers Directus. Passer `null` pour désactiver la requête. Annule via `AbortController` au démontage ou au changement de `path` |
| `useMutation<TData, TPayload>` | `(fn) → { submit, data, submitting, error }` | POST/PATCH/DELETE générique. Capture les erreurs dans l'état (pas de throw). Abandonne la requête en cours au démontage |

### Hooks de requête (construits sur `useFetch`)

| Hook | Retourne | Usage |
|---|---|---|
| `useWhiskies(query?)` | `{ whiskies, loading, error }` | Tous les whiskies publiés, mappés vers le type domaine `Whisky` |
| `useFeaturedWhiskies()` | `{ whiskies, loading, error }` | Whiskies en vedette (limite 3, flag `featured`) |
| `useWhiskyOptions()` | `{ options, loading, error }` | Paires `id + name` pour les selects (ex : formulaire d'avis) |
| `useReviews()` | `{ reviews, loading, error }` | Avis publiés triés par score décroissant, mappés vers `Review` |
| `useRegions()` | `{ regions, loading, error }` | Régions publiées triées |
| `useFaqs()` | `{ faqs, loading, error }` | FAQ publiées triées |
| `useTeamMembers()` | `{ members, loading, error }` | Membres d'équipe publiés triés |

### Hooks de mutation (construits sur `useMutation`)

| Hook | Retourne | Usage |
|---|---|---|
| `useSubmitReview()` | `{ submitReview, submitting, error, success }` | POST vers la collection `reviews` (status `draft`) |
| `useSubmitContact()` | `{ submitContact, submitting, error, success }` | POST vers `contact_submissions` |
| `useSubscribeNewsletter()` | `{ subscribe, submitting, error, success }` | POST vers `newsletter_subscribers` |

### Hooks d'état local

| Hook | Retourne | Usage |
|---|---|---|
| `useCart()` | `{ items, totalQty, totalPrice, addItem }` | Panier persisté dans `localStorage`. Exposé globalement via `CartContext` |
| `useShopPrefs()` | `{ prefs, setSort, setFilter }` | Filtre et tri de la boutique persistés entre les sessions |
| `useNewsletterStatus()` | `{ status, subscribe }` | Statut d'inscription newsletter (`idle` \| `subscribed`) persisté |

---

## Variables d'environnement

Créer un fichier `.env` à la racine de `react-app/` :

```env
VITE_DIRECTUS_URL=http://localhost:8055
VITE_DIRECTUS_TOKEN=your_static_token_here
```

| Variable | Description | Valeur par défaut |
|---|---|---|
| `VITE_DIRECTUS_URL` | URL de base de l'API Directus | `http://localhost:8055` |
| `VITE_DIRECTUS_TOKEN` | Token statique d'authentification Directus | Token de développement codé en dur dans `src/lib/directus.ts` |

> En production, toujours fournir ces deux variables via les secrets de l'environnement de déploiement.

---

## Commandes npm

```bash
# Développement
npm run dev          # Démarre le serveur de développement Vite (HMR)
npm run preview      # Prévisualise le build de production en local

# Build
npm run build        # Vérification TypeScript + build Vite (output: dist/)

# Qualité du code
npm run lint         # ESLint sur l'ensemble du projet

# Tests
npm run test         # Vitest en mode watch (développement)
npm run test:run     # Vitest en exécution unique (CI)
npm run test:ui      # Vitest avec interface visuelle dans le navigateur
```
