// Single-stroke icon set drawn for MUSE (1.6px stroke, 24px grid).
const glyphs = {
  ring: <><circle cx="12" cy="14" r="7" /><path d="M9.5 7.5 12 3l2.5 4.5" /></>,
  rings: <><circle cx="6" cy="12" r="3" /><circle cx="12" cy="12" r="3" /><circle cx="18" cy="12" r="3" /></>,
  signet: <><circle cx="12" cy="14" r="7" /><rect x="8.5" y="4" width="7" height="4" rx="1" /></>,
  solitaire: <><circle cx="12" cy="15" r="6" /><path d="m12 3 2 3-2 3-2-3z" /></>,
  band: <><circle cx="12" cy="13" r="7" /><circle cx="12" cy="13" r="4.5" /><path d="M12 6v1.5M12 18.5V20M5 13h1.5M17.5 13H19" /></>,
  clover: <><circle cx="12" cy="15" r="6" /><path d="M12 9c-1.5-2.5-3.5-2.5-3.5-.5s2 2 3.5.5c1.5 1.5 3.5 1.5 3.5-.5s-2-2-3.5-.5z" /></>,
  flower: <><circle cx="12" cy="15" r="6" /><path d="M12 9c0-3 2-5 5-5 0 3-2 5-5 5zM12 9c0-3-2-5-5-5 0 3 2 5 5 5z" /></>,
  pearl: <><circle cx="12" cy="15" r="6" /><circle cx="9" cy="7" r="2" /><circle cx="15" cy="7" r="2" /><circle cx="12" cy="4" r="1.5" /></>,
  earring: <><path d="M12 3v4" /><circle cx="12" cy="7" r="1" /><path d="M8 13a4 4 0 1 0 8 0 4 4 0 0 0-8 0z" /></>,
  drop: <><path d="M12 3v3" /><path d="M12 6c-3 4-3 7 0 11 3-4 3-7 0-11z" /><circle cx="12" cy="19" r="2" /></>,
  jhumka: <><path d="M12 3v4" /><path d="M7 11a5 5 0 0 1 10 0c0 3-2 5-5 8-3-3-5-5-5-8z" /><path d="m9 19 1 2M15 19l-1 2M12 20v2" /></>,
  tassel: <><path d="M12 2v4" /><circle cx="12" cy="7.5" r="1.5" /><path d="M9 9v12M12 9v13M15 9v12M10.5 9v10M13.5 9v10" /></>,
  bloom: <><circle cx="8" cy="10" r="2.5" /><circle cx="16" cy="10" r="2.5" /><circle cx="12" cy="16" r="2.5" /><path d="M12 3v5M12 13.5v-1" /></>,
  set: <><circle cx="8" cy="9" r="3" /><circle cx="16" cy="9" r="3" /><path d="M5 19c2-2 5-2 7 0 2-2 5-2 7 0" /></>,
  bracelet: <><ellipse cx="12" cy="12" rx="9" ry="6" /><ellipse cx="12" cy="12" rx="6" ry="3.5" /></>,
  bangles: <><ellipse cx="12" cy="9" rx="9" ry="4" /><path d="M3 12c0 2.2 4 4 9 4s9-1.8 9-4M3 15c0 2.2 4 4 9 4s9-1.8 9-4" /></>,
  handchain: <><circle cx="12" cy="5" r="2" /><path d="M12 7v5M12 12l-5 7M12 12l5 7" /><circle cx="7" cy="19" r="1" /><circle cx="17" cy="19" r="1" /></>,
  pendant: <><path d="M4 4c0 8 4 10 8 12 4-2 8-4 8-12" /><path d="M12 16v3" /><circle cx="12" cy="20.5" r="1.5" /></>,
  anklet: <><path d="M6 5v6a6 6 0 0 0 12 0V5" /><path d="M12 17v2" /><path d="M12 22s-2.5-1.6-2.5-3.4a1.4 1.4 0 0 1 2.5-.9 1.4 1.4 0 0 1 2.5.9c0 1.8-2.5 3.4-2.5 3.4z" /></>,
  heart: <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />,
  sparkle: <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />,
  diamond: <><path d="M6 3h12l4 6-10 12L2 9z" /><path d="M2 9h20M10 3l2 6 2-6" /></>,
  shield: <><path d="m12 3 7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6z" /><path d="m9 12 2 2 4-4" /></>,
  feather: <><path d="M20 4c-6 0-11 4-13 10l-3 6 6-3c6-2 10-7 10-13z" /><path d="m7 17 8-8" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  truck: <><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>,
  chat: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.1A8 8 0 1 1 21 12z" />,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  bag: <><path d="M6 8h12l1 13H5z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
  gift: <><rect x="3" y="9" width="18" height="12" rx="2" /><path d="M3 13h18M12 9v12M12 9c-2 0-4-1-4-3a2 2 0 0 1 4 0 2 2 0 0 1 4 0c0 2-2 3-4 3" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  ruler: <><rect x="3" y="8" width="18" height="8" rx="2" /><path d="M7 8v3M11 8v4M15 8v3M19 8v4" /></>,
  star: <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" fill="currentColor" stroke="none" />,
}

export default function Icon({ name, size = 24, strokeWidth = 1.6, className, style, ...rest }) {
  const glyph = glyphs[name] ?? glyphs.sparkle
  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {glyph}
    </svg>
  )
}


