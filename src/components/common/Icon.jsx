import {
  Award,
  BadgeCheck,
  Banknote,
  Briefcase,
  CalendarClock,
  CheckCircle2,
  CircleDollarSign,
  Clock,
  Code2,
  Copy,
  CreditCard,
  FileCheck2,
  FileText,
  Globe2,
  Handshake,
  Languages,
  LayoutDashboard,
  LifeBuoy,
  Monitor,
  Palette,
  PenLine,
  Presentation,
  RefreshCw,
  Rocket,
  Ruler,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  Users,
  Wand2,
  Wrench,
} from 'lucide-react'

/**
 * Centralised icon registry. Content files reference icons by name so that a
 * missing icon never crashes the page.
 */
export const iconRegistry = {
  award: Award,
  badge: BadgeCheck,
  banknote: Banknote,
  briefcase: Briefcase,
  calendar: CalendarClock,
  check: CheckCircle2,
  clock: Clock,
  code: Code2,
  copy: Copy,
  creditCard: CreditCard,
  document: FileText,
  fileCheck: FileCheck2,
  globe: Globe2,
  handshake: Handshake,
  languages: Languages,
  layout: LayoutDashboard,
  lifeBuoy: LifeBuoy,
  monitor: Monitor,
  palette: Palette,
  pen: PenLine,
  presentation: Presentation,
  refresh: RefreshCw,
  rocket: Rocket,
  ruler: Ruler,
  send: Send,
  shield: ShieldCheck,
  sparkles: Sparkles,
  target: Target,
  timer: Timer,
  trend: TrendingUp,
  users: Users,
  wand: Wand2,
  wrench: Wrench,
  money: CircleDollarSign,
}

/**
 * Renders a Lucide icon by name. Unknown names fall back to a document icon
 * so a typo in a content file can never break a page.
 */
export default function Icon({ name, size = 24, strokeWidth = 1.75, className, ...rest }) {
  const IconComponent = iconRegistry[name] ?? FileText

  return (
    <IconComponent
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    />
  )
}
