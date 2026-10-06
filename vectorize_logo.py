import cv2
import numpy as np

im = cv2.imread('insa_logo_original.png', cv2.IMREAD_UNCHANGED)
alpha = im[:, :, 3]
b = im[:, :, 0]
g = im[:, :, 1]
r = im[:, :, 2]

green_mask = (alpha > 128) & (g > 100) & (g > r + 30) & (g > b + 30)
green_mask = green_mask.astype(np.uint8) * 255

blue_mask = (alpha > 128) & (~(green_mask > 0)) & (b > 20)
blue_mask = blue_mask.astype(np.uint8) * 255

contours_g, _ = cv2.findContours(green_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_TC89_KCOS)
contours_b, _ = cv2.findContours(blue_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_TC89_KCOS)

main_g = [c for c in contours_g if cv2.contourArea(c) > 500]
main_b = [c for c in contours_b if cv2.contourArea(c) > 100]

def contour_to_svg_path(contour, epsilon=0.5):
    approx = cv2.approxPolyDP(contour, epsilon, True)
    points = approx.reshape(-1, 2)
    d = f"M {points[0][0]:.2f} {points[0][1]:.2f}"
    for pt in points[1:]:
        d += f" L {pt[0]:.2f} {pt[1]:.2f}"
    d += " Z"
    return d

svg_g_paths = [contour_to_svg_path(c, 0.4) for c in main_g]
svg_b_paths = [contour_to_svg_path(c, 0.3) for c in main_b]

print(f"Generated {len(svg_g_paths)} green paths and {len(svg_b_paths)} blue paths")

# Generate SVG
width, height = im.shape[1], im.shape[0]
svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">
  <g fill="#73bc49">
'''
for p in svg_g_paths:
    svg_content += f'    <path d="{p}" />\n'
svg_content += '''  </g>
  <g fill="#0e3048">
'''
for p in svg_b_paths:
    svg_content += f'    <path d="{p}" />\n'
svg_content += '''  </g>
</svg>'''

with open('test_logo.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)
print("Saved test_logo.svg")
