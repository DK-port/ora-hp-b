"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import LogoType from "@/components/LogoType";
import { usePathname } from "next/navigation";

const navLinks = [
  { href:"/cast",    label:"CAST" },
  { href:"/system",  label:"SYSTEM" },
  { href:"/gallery", label:"GALLERY" },
  { href:"/access",  label:"ACCESS" },
  { href:"/news",    label:"NEWS" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isTop = pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const showDark = scrolled || !isTop;

  return (
    <>
      <header style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100,
        height:"var(--header-h)",
        display:"flex", alignItems:"center", padding:"0 64px",
        background: showDark ? "rgba(14,14,14,0.95)" : "transparent",
        borderBottom: showDark ? "1px solid var(--color-border-dk)" : "none",
        backdropFilter: showDark ? "blur(12px)" : "none",
        transition:"background 0.5s ease, border-color 0.5s ease",
      }}>
        <Link href="/" aria-label="O-RA ～TOKYO～ トップへ" style={{
          display:"inline-flex", color: showDark ? "var(--color-gold)" : "#fff",
          flexShrink:0, transition:"color 0.5s",
        }}><LogoType size={28} /></Link>

        <nav style={{ display:"flex", gap:44, margin:"0 auto" }} className="hdr-nav">
          {navLinks.map(({href,label}) => (
            <Link key={href} href={href} style={{
              fontFamily:"var(--font-display)", fontSize:11, letterSpacing:"0.35em",
              color: pathname===href ? "var(--color-gold)"
                   : showDark ? "var(--color-muted-dk)"
                   : "rgba(255,255,255,0.7)",
              transition:"color 0.3s",
            }}>{label}</Link>
          ))}
        </nav>

        <button onClick={()=>setMenuOpen(v=>!v)} aria-label="メニュー" className="hdr-ham" style={{
          display:"none", flexDirection:"column", gap:6,
          background:"none", border:"none", cursor:"pointer", padding:4,
          marginLeft:"auto", marginRight:16,
        }}>
          {[0,1,2].map(i=>(
            <span key={i} style={{
              display:"block", width:24, height:1,
              background: showDark ? "var(--color-text-dark)" : "#fff",
              transition:"all 0.3s",
              transform: menuOpen && i===0 ? "translateY(7px) rotate(45deg)"
                       : menuOpen && i===2 ? "translateY(-7px) rotate(-45deg)" : "none",
              opacity: menuOpen && i===1 ? 0 : 1,
            }}/>
          ))}
        </button>

        <Link href="#" style={{
          fontFamily:"var(--font-display)", fontSize:11, letterSpacing:"0.25em",
          background:"var(--color-gold)", color:"var(--color-dark)",
          padding:"11px 24px", flexShrink:0, transition:"background 0.3s",
        }}>LINE 予約</Link>
      </header>

      {menuOpen && (
        <nav style={{
          position:"fixed", top:"var(--header-h)", left:0, right:0, zIndex:99,
          background:"rgba(14,14,14,0.97)", borderBottom:"1px solid var(--color-border-dk)",
          padding:"36px 28px", display:"flex", flexDirection:"column", gap:28,
        }}>
          {navLinks.map(({href,label})=>(
            <Link key={href} href={href} onClick={()=>setMenuOpen(false)} style={{
              fontFamily:"var(--font-display)", fontSize:14, letterSpacing:"0.3em",
              color:"var(--color-muted-dk)", paddingBottom:14, borderBottom:"1px solid #222",
            }}>{label}</Link>
          ))}
          <Link href="#" style={{
            textAlign:"center", background:"var(--color-gold)", color:"var(--color-dark)",
            fontFamily:"var(--font-display)", fontSize:11, letterSpacing:"0.25em", padding:"12px 24px",
          }}>LINE 予約</Link>
        </nav>
      )}

      <style>{`
        @media(max-width:768px){
          .hdr-nav{display:none!important;}
          .hdr-ham{display:flex!important;}
          header{padding:0 28px!important;}
        }
      `}</style>
    </>
  );
}
