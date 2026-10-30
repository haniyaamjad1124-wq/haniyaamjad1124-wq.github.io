import React from "react";

/*
  One cat, drawn once. An original character in the spirit of matchbox-label
  illustration: round hunched body, big yellow eyes with slit pupils, a tiny
  orange nose, whiskers, a tail that curls up into a reversed question mark,
  one paw raised high. The viewBox leaves room on the right for the paw and
  above for the tail, so nothing is clipped. The outline layer is cream and
  only shown where the cat sits on a dark ground (see .shelf-cat).
*/
const TAIL = "M118 120 C150 118 164 96 154 76 C146 60 124 60 122 78";

export default function CatFigure({ className = "cat" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 184 150" aria-hidden="true" focusable="false">
      {/* outline layer, same shapes drawn thick in cream under the black */}
      <g className="cat-outline" fill="none" stroke="#f1ebda" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round">
        <path className="cat-tail-outline" d={TAIL} strokeWidth="21" />
        <path d="M30 150 C26 110 40 84 78 78 C118 72 136 100 138 150 Z" />
        <path d="M44 48 L50 14 L74 40 Z" />
        <path d="M116 48 L110 14 L86 40 Z" />
        <ellipse cx="80" cy="62" rx="40" ry="34" />
        <path d="M122 120 C134 104 142 88 146 76" strokeWidth="24" />
        <circle cx="148" cy="70" r="12" />
      </g>
      <path className="cat-tail" d={TAIL} fill="none" stroke="#17191d" strokeWidth="13" strokeLinecap="round" />
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
      {/* raised paw: starts at the shoulder and reaches up, so it stays visible when the cat only peeks */}
      <g className="cat-paw">
        <path d="M122 120 C134 104 142 88 146 76" fill="none" stroke="#17191d" strokeWidth="16" strokeLinecap="round" />
        <circle cx="148" cy="70" r="12" fill="#17191d" />
        <path d="M140 66 L142 60 M148 64 L148 57 M156 66 L154 60" stroke="#f1ebda" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
      </g>
    </svg>
  );
}
