import os
import sys
from PIL import Image, ImageDraw, ImageFont

def make_contact_sheet(category_dir, output_file, thumb_size=200, cols=5):
    files = [f for f in os.listdir(category_dir) if f.lower().endswith('.jpg') or f.lower().endswith('.jpeg') or f.lower().endswith('.png')]
    files.sort()
    
    if not files:
        print(f"No images in {category_dir}")
        return
        
    rows = (len(files) + cols - 1) // cols
    cell_width = thumb_size
    cell_height = thumb_size + 40  # extra space for text
    
    sheet_width = cols * cell_width
    sheet_height = rows * cell_height
    
    sheet = Image.new('RGB', (sheet_width, sheet_height), 'white')
    draw = ImageDraw.Draw(sheet)
    
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 12)
    except:
        font = ImageFont.load_default()
        
    for idx, f in enumerate(files):
        img_path = os.path.join(category_dir, f)
        try:
            img = Image.open(img_path)
            img.thumbnail((thumb_size, thumb_size))
            
            x = (idx % cols) * cell_width
            y = (idx // cols) * cell_height
            
            # Center image in cell
            img_x = x + (cell_width - img.width) // 2
            img_y = y + (thumb_size - img.height) // 2
            
            sheet.paste(img, (img_x, img_y))
            
            # Shorten filename to first 8 chars for readability (it's a UUID)
            text = f[:8]
            
            # Draw text
            text_x = x + 5
            text_y = y + thumb_size + 5
            draw.text((text_x, text_y), text, fill="black", font=font)
        except Exception as e:
            print(f"Error processing {img_path}: {e}")
            
    sheet.save(output_file, quality=85)
    print(f"Saved {output_file}")
    
    # Save the mapping of prefix to full UUID in a text file too, just in case
    with open(f"{output_file}.txt", "w") as mapfile:
        for f in files:
            mapfile.write(f"{f[:8]},{f}\n")

base_dir = "public/assets/categories"
categories = ["doors", "tv-consoles", "kitchen-cabinets-wine-racks", "beds"]

for cat in categories:
    d = os.path.join(base_dir, cat)
    if os.path.isdir(d):
        make_contact_sheet(d, f"{cat}_contact.jpg")
