const fs = require('fs');

let dashContent = fs.readFileSync('c:/Users/tduon/Desktop/Programs/ShelfSmart/src/pages/Dashboard.tsx', 'utf-8');

let code = `import React, { useState, useEffect, useMemo } from 'react';
import Icon from './Icon';
import logoImg from '../../Images/logo-icon.png';
import textImg from '../../Images/logo-text.png';

type Order = any;

const navItems = [
  { name: 'Dashboard', icon: 'home', path: '/', badge: 0 },
  { name: 'Inventory', icon: 'box', path: '/inventory', badge: 6 },
  { name: 'Suppliers', icon: 'truck', path: '/suppliers', badge: 0 },
  { name: 'Analytics', icon: 'chart', path: '/analytics', badge: 0 },
  { name: 'Settings', icon: 'gear', path: '/settings', badge: 0 },
];

const mockOrders = [
  { id: 1, status: 'In Transit', supplier_name: 'Fresh Farms', scheduled_date: new Date(Date.now() + 86400000).toISOString(), cost: 450.50 },
  { id: 2, status: 'Pending', supplier_name: 'Ocean Catch', scheduled_date: new Date(Date.now() + 172800000).toISOString(), cost: 890.00 }
];

const mockInventory = [
  { name: 'Atlantic Salmon', current_stock: 4, reorder_point: 10, capacity: 50, category: 'Proteins', daily_usage: 5 },
  { name: 'Ribeye Steak', current_stock: 45, reorder_point: 15, capacity: 60, category: 'Proteins', daily_usage: 10 },
  { name: 'Organic Kale', current_stock: 8, reorder_point: 20, capacity: 100, category: 'Produce', daily_usage: 15 },
  { name: 'Heavy Cream', current_stock: 2, reorder_point: 5, capacity: 20, category: 'Dairy', daily_usage: 4 },
  { name: 'Truffle Oil', current_stock: 12, reorder_point: 3, capacity: 15, category: 'Dry', daily_usage: 0.5 }
];

const mockDemandData = Array.from({ length: 14 }).map((_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  const isWeekend = d.getDay() === 0 || d.getDay() === 6;
  const base = isWeekend ? 350 : 150;
  return {
    date: d.toISOString().split('T')[0],
    predictedCustomers: base + Math.floor(Math.random() * 50) + (i === 4 ? 80 : 0),
    historicalBaseline: base,
    weather: 5,
    weatherDetail: { rawTemp: 72, precipType: 'none' },
    events: i === 4 ? 10 : 0,
    eventDetail: { activeEvents: i === 4 ? [{ name: 'Local Festival' }] : [] },
    trends: 0,
    trendDetail: { trendingItems: [] },
    promos: 0,
    promoDetail: { activePromos: [] }
  };
});

const ChevronExpand = ({ expanded }: { expanded: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

type ExpandedCard = null | 'guests' | 'critical' | 'arriving' | 'eod';

function DashboardInner() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [subTab, setSubTab] = useState<'transit' | 'scheduled' | 'drafting'>('transit');
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [eventType, setEventType] = useState('Promo');
  const [eventLabel, setEventLabel] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventDiscount, setEventDiscount] = useState('0');
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [demandData, setDemandData] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [chartRange, setChartRange] = useState('14D');
  const [expandedCard, setExpandedCard] = useState<ExpandedCard>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCard = (k: Exclude<ExpandedCard, null>) =>
    setExpandedCard((prev) => (prev === k ? null : k));

  useEffect(() => {
    setOrders(mockOrders);
    setInventory(mockInventory);
    setDemandData(mockDemandData);
    
    // Animate numbers
    const interval = setInterval(() => {
      setDemandData(prev => prev.map((d, i) => i === 0 ? { ...d, predictedCustomers: d.predictedCustomers + (Math.random() > 0.5 ? 2 : -2) } : d));
      setInventory(prev => prev.map((item, i) => i === 0 ? { ...item, current_stock: Math.max(0, item.current_stock + (Math.random() > 0.5 ? 1 : -1)) } : item));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

`;

let dashBody = dashContent.substring(dashContent.indexOf('const days = useMemo(() => {'));
dashBody = dashBody.replace(/<Link /g, '<a ');
dashBody = dashBody.replace(/<\/Link>/g, '</a>');
dashBody = dashBody.replace(/to=/g, 'href=');
dashBody = dashBody.replace(/<img src=\{logoImg\}[^>]*\/>/g, ''); // Remove the logo img in Dashboard header
dashBody = dashBody.substring(0, dashBody.lastIndexOf('}'));

code += dashBody + '\n}\n\n';

code += `
export default function LiveDashboardPreview() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePath, setActivePath] = useState('/');

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex" style={{ background: 'var(--color-canvas)', height: '600px', overflow: 'hidden', textAlign: 'left', borderRadius: '16px', border: '1px solid var(--line-soft)', boxShadow: '0 20px 40px -24px rgba(14,18,16,.18)' }}>
      {/* Sidebar */}
      <aside
        className="h-full flex flex-col z-50 transition-all duration-300"
        style={{
          width: isCollapsed ? 72 : 248,
          padding: isCollapsed ? '20px 10px' : 20,
          background: 'var(--color-canvas)',
          borderRight: '1px solid var(--line-soft)',
          flexShrink: 0
        }}
      >
        <div className="flex items-center gap-3 px-2 pt-1 mb-6">
          <img src={logoImg} alt="ShelfSmart" style={{ width: 30, height: 30, objectFit: 'contain' }} />
          {!isCollapsed && (
            <div className="fadein" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <img src={textImg} alt="ShelfSmart" style={{ width: 'auto', height: 16, objectFit: 'contain' }} />
              <div className="eyebrow" style={{ fontSize: 9, marginTop: 4 }}>
                v2.0 · S.M.A.R.T
              </div>
            </div>
          )}
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((n) => {
            const isActive = activePath === n.path;
            return (
              <button
                key={n.name}
                onClick={() => setActivePath(n.path)}
                title={isCollapsed ? n.name : ''}
                className="flex items-center justify-between"
                style={{
                  padding: isCollapsed ? '11px 0' : '11px 14px',
                  borderRadius: 14,
                  background: isActive ? 'var(--color-ink)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--color-ink-2)',
                  fontWeight: 500,
                  fontSize: 13,
                  transition: 'background .15s',
                  border: 'none',
                  cursor: 'pointer',
                  justifyContent: isCollapsed ? 'center' : 'space-between',
                }}
              >
                <span className="flex items-center gap-3" style={{ justifyContent: isCollapsed ? 'center' : 'flex-start' }}>
                  <Icon name={n.icon} s={17} />
                  {!isCollapsed && n.name}
                </span>
                {!isCollapsed && n.badge > 0 && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 999,
                      background: isActive ? 'var(--color-accent)' : 'var(--color-ink)',
                      color: '#fff',
                    }}
                  >
                    {n.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="btn btn-ghost mb-4"
          style={{
            justifyContent: 'center',
            padding: '8px',
            marginTop: 8,
          }}
        >
          <Icon name={isCollapsed ? 'chevron-right' : 'chevron-left'} s={15} />
          {!isCollapsed && <span style={{ fontSize: 11 }}>Collapse</span>}
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col" style={{ overflow: 'hidden', background: 'var(--color-bone)' }}>
        <header
          className="z-40 flex items-center gap-4"
          style={{
            padding: '12px 32px 12px 16px',
            background: 'var(--color-canvas)',
            borderBottom: '1px solid var(--line-soft)',
            flexShrink: 0
          }}
        >
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              className="input"
              placeholder="Search SKUs, suppliers, orders…"
              style={{ paddingLeft: 40, paddingRight: 16, paddingTop: 10, paddingBottom: 10, background: 'var(--color-paper)', borderRadius: 999, border: '1px solid var(--line-soft)', width: '100%', fontSize: 13 }}
            />
            <div
              style={{
                position: 'absolute',
                left: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-mute)',
              }}
            >
              <Icon name="search" s={15} />
            </div>
          </div>

          <button className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '999px', border: '1px solid var(--line-soft)', background: 'transparent', fontSize: 13 }}>
            <Icon name="cal" s={14} />
            {dateStr}
          </button>

          <button
            className="btn btn-ghost"
            style={{
              width: 40,
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              aspectRatio: '1',
              position: 'relative',
              border: '1px solid var(--line-soft)',
              background: 'transparent'
            }}
          >
            <Icon name="bell" s={15} />
            <span
              style={{
                position: 'absolute',
                top: 9,
                right: 11,
                width: 7,
                height: 7,
                borderRadius: 999,
                background: 'var(--color-accent)',
              }}
            />
          </button>
        </header>

        <main className="thin-scroll" style={{ padding: '16px 32px 40px 16px', overflowY: 'auto', flex: 1 }}>
          {activePath === '/' ? <DashboardInner /> : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-mute)' }}>
              Mocked view for {activePath}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('c:/Users/tduon/Desktop/Programs/ShelfSmart-Landing/src/components/LiveDashboardPreview.tsx', code);
