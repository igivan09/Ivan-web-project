import sys

file_path = r'c:\Users\IVANAHMED32\Desktop\Phlebotomy_Trainer_Netlify_Deploy\style.css'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

content = "".join(lines)

# Target the start of the restoration section
start_marker = "/* --- RESTORATION: HERO & DARK THEME REFINEMENT --- */"
# Target the start of the registration modal section which survived
end_marker = ".reg-modal-container .modal-header { background: transparent;"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print(f"Error: Markers not found. start_idx: {start_idx}, end_idx: {end_idx}")
    sys.exit(1)

# The new content to insert
new_section = r'''/* --- RESTORATION: HERO & DARK THEME REFINEMENT --- */
.hero {
    background: #050A18 !important; /* Original Carbon Dark */
    position: relative;
    padding: 160px 0 100px;
    overflow: hidden;
    color: white;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 30%, rgba(0, 229, 255, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(37, 99, 235, 0.1) 0%, transparent 50%);
    pointer-events: none;
}

.hero-title {
    color: #FFFFFF !important;
    text-shadow: 0 0 20px rgba(0, 229, 255, 0.2);
}

.hero-subtitle {
    color: #E2E8F0 !important;
    max-width: 600px;
}

.badge {
    background: rgba(34, 211, 238, 0.1);
    color: var(--cyan-electric);
    border: 1px solid rgba(34, 211, 238, 0.3);
    padding: 6px 16px;
    border-radius: 99px;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

/* --- RESTORATION: SECTIONS --- */
section {
    position: relative;
    z-index: 1;
}

.bg-carbon {
    background-color: #050A18 !important;
}

/* --- RESTORATION: MODAL & FAB --- */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(5, 10, 24, 0.95);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    z-index: 10000;
    display: none;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.4s ease;
}

.modal-overlay.active {
    display: flex;
    opacity: 1;
}

.modal-container {
    background: #0A0F1E;
    border: 1px solid rgba(34, 211, 238, 0.25);
    border-radius: 24px;
    width: 92%;
    max-width: 650px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    z-index: 10001;
    color: #F1F5F9;
    box-shadow: 0 32px 64px rgba(0, 0, 0, 0.6);
    transform: translateY(20px);
    transition: transform 0.4s ease;
}

.modal-overlay.active .modal-container {
    transform: translateY(0);
}

.modal-header {
    background: rgba(15, 23, 42, 0.95) !important;
    border-bottom: 1px solid rgba(34, 211, 238, 0.15) !important;
    padding: 24px 32px !important;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    z-index: 10;
}

.modal-header h3 {
    color: #FFFFFF !important;
    margin: 0;
}

.modal-body {
    padding: 32px !important;
    color: #CBD5E1 !important;
    line-height: 1.8 !important;
}

.modal-body h3, .modal-body strong {
    color: #FFFFFF !important;
}

.modal-body a {
    color: var(--cyan-electric) !important;
    text-decoration: underline;
}

.fab-whatsapp {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #25D366;
    color: white;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4);
}

'''

final_content = content[:start_idx] + new_section + "\n" + content[end_idx:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(final_content)

print("Repair completed successfully.")
