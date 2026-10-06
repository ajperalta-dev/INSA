import os
import urllib.request

os.makedirs('public/images', exist_ok=True)

images = {
    'hero_bg.jpg': 'https://static.wixstatic.com/media/0968ba_1f83d5fc2f064a2eb2ad334355c47515~mv2.jpg',
    'field_geo.jpg': 'https://static.wixstatic.com/media/0968ba_f2920e79ec914b08a9c18170c3dc7ac8~mv2.jpg',
    'outcrop.jpg': 'https://static.wixstatic.com/media/0968ba_eeb1f116d4f34eb0bd79157a1278a577~mv2.jpg',
    'landscape_1.jpg': 'https://static.wixstatic.com/media/0968ba_1542c2a2f1aa4f8b885a3dd7f63f7ce9~mv2.jpg',
    'paisaje_1.jpg': 'https://static.wixstatic.com/media/24536d_ab0d4bd350ca4ca2ae5f612a18513222f002.jpg',
    'paisaje_2.jpg': 'https://static.wixstatic.com/media/24536d_d7181f2005fc4ab39a71299a96b31a78f002.jpg',
    'paisaje_3.jpg': 'https://static.wixstatic.com/media/24536d_1ae2a93795804191b8c244ba9b591256f002.jpg',
    'infra_1.jpg': 'https://static.wixstatic.com/media/c90373ff459948b98454f973581ee5a9.jpg',
    'infra_2.jpg': 'https://static.wixstatic.com/media/72600a7027374bb4ab31308d0feffec3.jpeg',
    'infra_3.jpg': 'https://static.wixstatic.com/media/8ec2f7b62e7648f1b2589af18ff47a1c.jpg',
    'prop_1.jpg': 'https://static.wixstatic.com/media/47c8b082b2ab4e959860179e3ca6ef18.jpg',
    'prop_2.jpg': 'https://static.wixstatic.com/media/43fe78e395e94309947e29851874917f.jpeg',
    'prop_3.jpg': 'https://static.wixstatic.com/media/12be01e610354662bdd9b1508b849215.jpg',
    'ciudad_1.jpg': 'https://static.wixstatic.com/media/b9fb2dc195bb43ebb4f2002573bf075d.jpeg',
    'ciudad_2.jpg': 'https://static.wixstatic.com/media/b7680f5367c94a749f07d65c029d490f.jpeg',
    'ciudad_3.jpg': 'https://static.wixstatic.com/media/08646e0f028c44f0b3e1d2df01088d28.jpeg',
}

headers = {'User-Agent': 'Mozilla/5.0'}

for name, url in images.items():
    filepath = os.path.join('public/images', name)
    if not os.path.exists(filepath):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as resp, open(filepath, 'wb') as f:
                f.write(resp.read())
            print(f'Downloaded {name} ({os.path.getsize(filepath)} bytes)')
        except Exception as e:
            print(f'Error downloading {name}: {e}')
    else:
        print(f'{name} already exists')
