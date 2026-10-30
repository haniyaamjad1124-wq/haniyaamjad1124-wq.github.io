import React from "react";

/*
  One cat, drawn once. An original character in the spirit of matchbox-label
  illustration: round hunched body, big yellow eyes with slit pupils, a tiny
  orange nose, whiskers, a curled tail, one paw raised. The viewBox leaves
  room on the right for the raised paw, so nothing is ever clipped.
  Parts carry class names so each use can animate them in CSS.
*/
export default function CatFigure({ className = "cat" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 184 150" aria-hidden="true" focusable="false">
      <path
        className="cat-tail"
        d="M118 118 C150 112 152 78 128 70 C118 67 112 76 118 84"
        fill="none"
        stroke="#17191d"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path className="cat-body" d="M30 150 C26 110 40 84 78 78 C118 72 136 100 138 150 Z" fill="#17191d" />
      <g className="cat-head">
        <path d="M44 48 L50 14 L74 40 Z" fill="#17191d" />
        <path d="M116 48 L110 14 L86 40 Z" fill="#17191d" />
        <path d="M54 44 L54 24 L68 40 Z" fill="#df5c2c" />
        <path d="M106 44 L106 24 L92 40 Z" fill="#df5c2c" />
        <ellipse cx="80" cy="62" rx="40" ry="34" fill="#17191d" />
        <g className="cat-eyes">
          <ellipse cx="65" cy="60" rx="10" ry="11" fill="#f5ca62" />
          <ellipse cx="95" cy="60" rx="10" ry="11" fill="#f5ca62" />
          <ellipse className="cat-pupil" cx="66" cy="61" rx="3.2" ry="8" fill="#17191d" />
          <ellipse className="cat-pupil" cx="96" cy="61" rx="3.2" ry="8" fill="#17191d" />
          <circle cx="69" cy="56" r="2" fill="#fff" />
          <circle cx="99" cy="56" r="2" fill="#fff" />
        </g>
        <path d="M76 73 L84 73 L80 79 Z" fill="#df5c2c" />
        <path d="M80 79 C80 84 74 86 71 83 M80 79 C80 84 86 86 89 83" fill="none" stroke="#f1ebda" strokeWidth="1.6" strokeLinecap="round" />
        <g stroke="#f1ebda" strokeWidth="1.4" strokeLinecap="round" opacity="0.9">
          <path d="M52 72 L30 68" />
          <path d="M52 77 L30 80" />
          <path d="M108 72 L130 68" />
          <path d="M108 77 L130 80" />
        </g>
      </g>
      <g className="cat-foot">
        <ellipse cx="60" cy="138" rx="13" ry="9" fill="#17191d" />
        <path d="M52 138 L52 132 M60 139 L60 132 M68 138 L68 132" stroke="#f1ebda" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
      </g>
      <g className="cat-paw">
        <path d="M128 128 C140 112 148 96 150 84" fill="none" stroke="#17191d" strokeWidth="16" strokeLinecap="round" />
        <circle cx="151" cy="80" r="12" fill="#17191d" />
        <path d="M143 76 L145 70 M151 74 L151 67 M159 76 L157 70" stroke="#f1ebda" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
      </g>
    </svg>
  );
}
