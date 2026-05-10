import os

html_path = "c:/Users/IVANAHMED32/Desktop/Phlebotomy_Trainer_Netlify_Deploy/index.html"
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

lenis_script = """
    <!-- Lenis Smooth Scroll -->
    <script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.19/bundled/lenis.min.js"></script>
    <script>
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        // Make sure anchor links work with Lenis
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#home') return;
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    lenis.scrollTo(target, { offset: -80 });
                }
            });
        });
    </script>
</body>
"""

if "lenis" not in content.lower():
    content = content.replace("</body>", lenis_script)
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Lenis added to index.html")
else:
    print("Lenis already in index.html")
