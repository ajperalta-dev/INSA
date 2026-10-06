import cv2
import numpy as np
from scipy.interpolate import splprep, splev

def extract_and_smooth():
    im = cv2.imread('insa_logo_original.png', cv2.IMREAD_UNCHANGED)
    alpha = im[:, :, 3]
    b = im[:, :, 0]
    g = im[:, :, 1]
    r = im[:, :, 2]

    green_mask = ((alpha > 128) & (g > 100) & (g > r + 30) & (g > b + 30)).astype(np.uint8) * 255
    blue_mask = ((alpha > 128) & (~(green_mask > 0)) & (b > 20)).astype(np.uint8) * 255

    contours_g, _ = cv2.findContours(green_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    contours_b, _ = cv2.findContours(blue_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

    main_g = [c for c in contours_g if cv2.contourArea(c) > 500]
    main_b = [c for c in contours_b if cv2.contourArea(c) > 100]

    # Calculate center of mass to center everything in a neat 200x200 canvas
    all_mask = (green_mask | blue_mask)
    M = cv2.moments(all_mask)
    cx = M['m10'] / M['m00']
    cy = M['m01'] / M['m00']

    # Target center in 200x200 box: (100, 100)
    dx = 100.0 - cx
    dy = 100.0 - cy

    def contour_to_smooth_path(contour, s_factor=8.0, num_points=70):
        c = contour.reshape(-1, 2).astype(float)
        # Shift to center
        c[:, 0] += dx
        c[:, 1] += dy

        if not np.allclose(c[0], c[-1]):
            c = np.vstack([c, c[0]])
        mask = np.ones(len(c), dtype=bool)
        mask[1:] = np.any(c[1:] != c[:-1], axis=1)
        c = c[mask]
        
        tck, u = splprep([c[:, 0], c[:, 1]], s=s_factor, per=True)
        u_fine = np.linspace(0, 1, num_points)
        pts = np.array(splev(u_fine, tck)).T
        
        # Build SVG path with cubic beziers for ultra-smooth rendering
        # Approximating polygon with smooth quadratic/cubic bezier segments
        d = f"M {pts[0,0]:.2f} {pts[0,1]:.2f}"
        for i in range(1, len(pts)-1):
            d += f" L {pts[i,0]:.2f} {pts[i,1]:.2f}"
        d += " Z"
        return d

    svg_g = [contour_to_smooth_path(c, s_factor=8.0, num_points=75) for c in main_g]
    svg_b = [contour_to_smooth_path(c, s_factor=4.0, num_points=55) for c in main_b]

    return svg_g, svg_b

svg_g, svg_b = extract_and_smooth()

# 1. ISOTIPO (solo símbolo)
isotipo_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="insaGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7ec850"/>
      <stop offset="100%" stop-color="#62b539"/>
    </linearGradient>
    <linearGradient id="insaBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#143e5c"/>
      <stop offset="100%" stop-color="#0a2538"/>
    </linearGradient>
  </defs>
  <g id="insa-symbol">
    <!-- Hojas verdes (Ciclo / Naturaleza / Medio Ambiente) -->
    <g fill="url(#insaGreenGrad)">
      <path d="{svg_g[0]}" />
      <path d="{svg_g[1]}" />
      <path d="{svg_g[2]}" />
    </g>
    <!-- Arcos azul petróleo (Ingeniería / Geología / Dinamismo) -->
    <g fill="url(#insaBlueGrad)">
      <path d="{svg_b[0]}" />
      <path d="{svg_b[1]}" />
      <path d="{svg_b[2]}" />
    </g>
  </g>
</svg>'''

with open('isotipo.svg', 'w', encoding='utf-8') as f:
    f.write(isotipo_svg)

# 2. LOGO (Solo el Logotipo Tipográfico "INSA")
logo_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 80" width="260" height="80">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@800;900&amp;display=swap');
      .insa-text {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-weight: 800;
        font-size: 64px;
        fill: #0d283c;
        letter-spacing: 4px;
      }
      .insa-sub {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-weight: 600;
        font-size: 11px;
        fill: #14b8a6;
        letter-spacing: 6px;
      }
    </style>
  </defs>
  <text x="5" y="58" class="insa-text">INSA</text>
  <text x="6" y="75" class="insa-sub">CONSULTORA</text>
</svg>'''

with open('logo.svg', 'w', encoding='utf-8') as f:
    f.write(logo_svg)

# 3. ISOLOGO (Símbolo + Tipografía INSA integrada horizontal)
isologo_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 120" width="460" height="120">
  <defs>
    <linearGradient id="isologoGreen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7ec850"/>
      <stop offset="100%" stop-color="#62b539"/>
    </linearGradient>
    <linearGradient id="isologoBlue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#143e5c"/>
      <stop offset="100%" stop-color="#0a2538"/>
    </linearGradient>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;800;900&amp;display=swap');
      .text-insa {{
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        font-weight: 800;
        font-size: 68px;
        fill: #0d283c;
        letter-spacing: 3px;
      }}
      .text-consultora {{
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        font-weight: 600;
        font-size: 14px;
        fill: #0f766e;
        letter-spacing: 7px;
      }}
    </style>
  </defs>
  <!-- Símbolo escalado a 100x100 en posición (10, 10) -->
  <g transform="translate(10, 10) scale(0.5)">
    <g fill="url(#isologoGreen)">
      <path d="{svg_g[0]}" />
      <path d="{svg_g[1]}" />
      <path d="{svg_g[2]}" />
    </g>
    <g fill="url(#isologoBlue)">
      <path d="{svg_b[0]}" />
      <path d="{svg_b[1]}" />
      <path d="{svg_b[2]}" />
    </g>
  </g>
  <!-- Texto institucional -->
  <text x="125" y="75" class="text-insa">INSA</text>
  <text x="128" y="98" class="text-consultora">CONSULTORA</text>
</svg>'''

with open('isologo.svg', 'w', encoding='utf-8') as f:
    f.write(isologo_svg)

# 4. ISOLOGOTIPO COMPLETO (Versión corporativa con descriptor de áreas: Geología • Medio Ambiente • Ingeniería)
isologotipo_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 140" width="540" height="140">
  <defs>
    <linearGradient id="corpGreen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7ec850"/>
      <stop offset="100%" stop-color="#5fb236"/>
    </linearGradient>
    <linearGradient id="corpBlue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#144161"/>
      <stop offset="100%" stop-color="#092538"/>
    </linearGradient>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&amp;display=swap');
      .c-title {{
        font-family: 'Inter', system-ui, sans-serif;
        font-weight: 900;
        font-size: 64px;
        fill: #0c263a;
        letter-spacing: 4px;
      }}
      .c-sub {{
        font-family: 'Inter', system-ui, sans-serif;
        font-weight: 700;
        font-size: 13px;
        fill: #0f766e;
        letter-spacing: 6.5px;
      }}
      .c-desc {{
        font-family: 'Inter', system-ui, sans-serif;
        font-weight: 500;
        font-size: 11px;
        fill: #526574;
        letter-spacing: 1.5px;
      }}
    </style>
  </defs>
  <!-- Símbolo -->
  <g transform="translate(15, 12) scale(0.58)">
    <g fill="url(#corpGreen)">
      <path d="{svg_g[0]}" />
      <path d="{svg_g[1]}" />
      <path d="{svg_g[2]}" />
    </g>
    <g fill="url(#corpBlue)">
      <path d="{svg_b[0]}" />
      <path d="{svg_b[1]}" />
      <path d="{svg_b[2]}" />
    </g>
  </g>
  <!-- Textos -->
  <text x="145" y="70" class="c-title">INSA</text>
  <text x="147" y="92" class="c-sub">CONSULTORA</text>
  <line x1="147" y1="102" x2="520" y2="102" stroke="#e2e8f0" stroke-width="1.5" />
  <text x="147" y="119" class="c-desc">GEOLOGÍA  •  MEDIO AMBIENTE  •  INGENIERÍA</text>
</svg>'''

with open('isologotipo.svg', 'w', encoding='utf-8') as f:
    f.write(isologotipo_svg)

# 5. Versión Dark / Invertida (para fondos oscuros slate-900 / slate-950)
isologo_dark_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 120" width="460" height="120">
  <defs>
    <linearGradient id="darkGradGreen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8ce358"/>
      <stop offset="100%" stop-color="#6ec740"/>
    </linearGradient>
    <linearGradient id="darkGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;800;900&amp;display=swap');
      .text-insa-dark {{
        font-family: 'Inter', system-ui, sans-serif;
        font-weight: 800;
        font-size: 68px;
        fill: #f8fafc;
        letter-spacing: 3px;
      }}
      .text-sub-dark {{
        font-family: 'Inter', system-ui, sans-serif;
        font-weight: 600;
        font-size: 14px;
        fill: #2dd4bf;
        letter-spacing: 7px;
      }}
    </style>
  </defs>
  <g transform="translate(10, 10) scale(0.5)">
    <g fill="url(#darkGradGreen)">
      <path d="{svg_g[0]}" />
      <path d="{svg_g[1]}" />
      <path d="{svg_g[2]}" />
    </g>
    <g fill="url(#darkGradCyan)">
      <path d="{svg_b[0]}" />
      <path d="{svg_b[1]}" />
      <path d="{svg_b[2]}" />
    </g>
  </g>
  <text x="125" y="75" class="text-insa-dark">INSA</text>
  <text x="128" y="98" class="text-sub-dark">CONSULTORA</text>
</svg>'''

with open('isologo_dark.svg', 'w', encoding='utf-8') as f:
    f.write(isologo_dark_svg)

print("Generated all SVGs: isotipo.svg, logo.svg, isologo.svg, isologotipo.svg, isologo_dark.svg")
