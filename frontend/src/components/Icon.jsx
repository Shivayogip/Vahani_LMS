import { T } from "../theme";

const Icon = ({ name, size=18, color="currentColor", sw=1.6 }) => {
  const s = { width:size, height:size, display:"block", flexShrink:0 };
  const p = { fill:"none", stroke:color, strokeWidth:sw, strokeLinecap:"round", strokeLinejoin:"round" };
  const icons = {
    home:       <><path {...p} d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path {...p} d="M9 21V12h6v9"/></>,
    scholars:   <><circle {...p} cx="12" cy="8" r="4"/><path {...p} d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></>,
    grid:       <><rect {...p} x="3" y="3" width="7" height="7" rx="1"/><rect {...p} x="14" y="3" width="7" height="7" rx="1"/><rect {...p} x="3" y="14" width="7" height="7" rx="1"/><rect {...p} x="14" y="14" width="7" height="7" rx="1"/></>,
    file:       <><path {...p} d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline {...p} points="14 3 14 8 19 8"/><line {...p} x1="9" y1="13" x2="15" y2="13"/><line {...p} x1="9" y1="17" x2="13" y2="17"/></>,
    book:       <><path {...p} d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path {...p} d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></>,
    cal:        <><rect {...p} x="3" y="4" width="18" height="18" rx="2"/><line {...p} x1="16" y1="2" x2="16" y2="6"/><line {...p} x1="8" y1="2" x2="8" y2="6"/><line {...p} x1="3" y1="10" x2="21" y2="10"/><path {...p} d="M9 16l2 2 4-4"/></>,
    users:      <><path {...p} d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle {...p} cx="9" cy="7" r="4"/><path {...p} d="M23 21v-2a4 4 0 00-3-3.87"/><path {...p} d="M16 3.13a4 4 0 010 7.75"/></>,
    clock:      <><circle {...p} cx="12" cy="12" r="9"/><path {...p} d="M12 8v4l3 3"/></>,
    bar:        <><line {...p} x1="18" y1="20" x2="18" y2="10"/><line {...p} x1="12" y1="20" x2="12" y2="4"/><line {...p} x1="6" y1="20" x2="6" y2="14"/></>,
    dash:       <><rect {...p} x="3" y="3" width="9" height="9" rx="1"/><rect {...p} x="14" y="3" width="7" height="4" rx="1"/><rect {...p} x="14" y="10" width="7" height="11" rx="1"/><rect {...p} x="3" y="15" width="9" height="6" rx="1"/></>,
    logout:     <><path {...p} d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline {...p} points="16 17 21 12 16 7"/><line {...p} x1="21" y1="12" x2="9" y2="12"/></>,
    search:     <><circle {...p} cx="11" cy="11" r="8"/><line {...p} x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    bell:       <><path {...p} d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path {...p} d="M13.73 21a2 2 0 01-3.46 0"/></>,
    plus:       <><line {...p} x1="12" y1="5" x2="12" y2="19"/><line {...p} x1="5" y1="12" x2="19" y2="12"/></>,
    send:       <><line {...p} x1="22" y1="2" x2="11" y2="13"/><polygon {...p} points="22 2 15 22 11 13 2 9 22 2"/></>,
    bot:        <><rect {...p} x="3" y="11" width="18" height="10" rx="2"/><circle {...p} cx="9" cy="16" r="1" fill={color}/><circle {...p} cx="15" cy="16" r="1" fill={color}/><path {...p} d="M12 11V7"/><path {...p} d="M8 7h8"/></>,
    x:          <><line {...p} x1="18" y1="6" x2="6" y2="18"/><line {...p} x1="6" y1="6" x2="18" y2="18"/></>,
    chevD:      <polyline {...p} points="6 9 12 15 18 9"/>,
    chevU:      <polyline {...p} points="6 15 12 9 18 15"/>,
    chevL:      <polyline {...p} points="15 6 9 12 15 18"/>,
    mail:       <><rect {...p} x="2" y="4" width="20" height="16" rx="2"/><path {...p} d="M2 7l10 7 10-7"/></>,
    star:       <polygon {...p} points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    check:      <polyline {...p} points="20 6 9 17 4 12"/>,
    info:       <><circle {...p} cx="12" cy="12" r="9"/><line {...p} x1="12" y1="10" x2="12" y2="16"/><circle {...p} cx="12" cy="7" r="0.8" fill={color}/></>,
    warn:       <><path {...p} d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line {...p} x1="12" y1="9" x2="12" y2="13"/></>,
    upload:     <><path {...p} d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline {...p} points="17 8 12 3 7 8"/><line {...p} x1="12" y1="3" x2="12" y2="15"/></>,
    video:      <><polygon {...p} points="23 7 16 12 23 17 23 7"/><rect {...p} x="1" y="5" width="15" height="14" rx="2"/></>,
    doc:        <><path {...p} d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline {...p} points="14 2 14 8 20 8"/></>,
    pencil:     <><path {...p} d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path {...p} d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    eye:        <><path {...p} d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle {...p} cx="12" cy="12" r="3"/></>,
    trend:      <><polyline {...p} points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline {...p} points="16 7 22 7 22 13"/></>,
    cog:        <><circle {...p} cx="12" cy="12" r="3"/><path {...p} d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    grad:       <><path {...p} d="M22 10v6M2 10l10-5 10 5-10 5z"/><path {...p} d="M6 12v5c3 3 9 3 12 0v-5"/></>,
    arrowR:     <><line {...p} x1="5" y1="12" x2="19" y2="12"/><polyline {...p} points="12 5 19 12 12 19"/></>,
  };
  return <svg viewBox="0 0 24 24" style={s} xmlns="http://www.w3.org/2000/svg">{icons[name]||icons.home}</svg>;
};

export default Icon;
