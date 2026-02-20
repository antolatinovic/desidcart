'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Image, TrendingUp, MessageSquare, CreditCard, 
  User, FileText, ShoppingBag, Building2, Users, BarChart3, MapPin,
  LogOut, ChevronLeft 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const navGroups: Record<string, { label: string; items: { label: string; href: string; icon: any }[] }> = {
  '/dashboard/artiste': {
    label: 'Espace Artiste',
    items: [
      { label: 'Dashboard', href: '/dashboard/artiste', icon: LayoutDashboard },
      { label: 'Mes œuvres', href: '/dashboard/artiste/oeuvres', icon: Image },
      { label: 'Mes ventes', href: '/dashboard/artiste/ventes', icon: TrendingUp },
      { label: 'Messages', href: '/dashboard/artiste/messages', icon: MessageSquare },
      { label: 'Mon profil', href: '/dashboard/artiste/profil', icon: User },
      { label: 'Abonnement', href: '/dashboard/artiste/abonnement', icon: CreditCard },
    ],
  },
  '/dashboard/entreprise': {
    label: 'Espace Entreprise',
    items: [
      { label: 'Dashboard', href: '/dashboard/entreprise', icon: LayoutDashboard },
      { label: 'Mes achats', href: '/dashboard/entreprise/achats', icon: ShoppingBag },
      { label: 'Documents fiscaux', href: '/dashboard/entreprise/documents', icon: FileText },
      { label: 'Messages', href: '/dashboard/entreprise/messages', icon: MessageSquare },
      { label: 'Mon profil', href: '/dashboard/entreprise/profil', icon: User },
    ],
  },
  '/dashboard/admin': {
    label: 'Administration',
    items: [
      { label: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
      { label: 'Utilisateurs', href: '/dashboard/admin/utilisateurs', icon: Users },
      { label: 'Œuvres', href: '/dashboard/admin/oeuvres', icon: Image },
      { label: 'Commandes', href: '/dashboard/admin/commandes', icon: ShoppingBag },
      { label: 'Lieux', href: '/dashboard/admin/lieux', icon: MapPin },
      { label: 'Statistiques', href: '/dashboard/admin/statistiques', icon: BarChart3 },
    ],
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Déterminer quel groupe de nav afficher
  const activeGroup = Object.keys(navGroups).find((prefix) => pathname.startsWith(prefix));
  const nav = activeGroup ? navGroups[activeGroup] : null;

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-cream-100 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-cream-300">
        {/* Logo */}
        <div className="p-6 border-b border-cream-200">
          <Link href="/" className="flex items-center gap-2">
            <ChevronLeft size={16} className="text-primary-400" />
            <span className="text-lg font-serif font-bold text-primary-800">
              Defisc<span className="text-gold">Art</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        {nav && (
          <nav className="flex-1 p-4">
            <p className="text-xs font-semibold text-primary-400 uppercase tracking-wider mb-3 px-3">
              {nav.label}
            </p>
            <ul className="space-y-1">
              {nav.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors',
                        isActive
                          ? 'bg-gold-50 text-gold-700 font-medium'
                          : 'text-primary-500 hover:bg-cream-200 hover:text-primary-700'
                      )}
                    >
                      <item.icon size={18} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {/* Logout */}
        <div className="p-4 border-t border-cream-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded text-sm text-primary-400 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
          >
            <LogOut size={18} />
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
