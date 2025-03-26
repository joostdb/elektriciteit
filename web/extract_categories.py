import os
import re

def extract_specific_content(input_file, output_dir, category, keywords):
    """
    Extract content related to specific keywords and save to category file
    """
    os.makedirs(output_dir, exist_ok=True)
    
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Create category file
    category_file = os.path.join(output_dir, f"{category}.txt")
    
    with open(category_file, 'w', encoding='utf-8') as f:
        f.write(f"# Informatie over {category}\n\n")
        
        for keyword in keywords:
            f.write(f"## Zoekresultaten voor '{keyword}'\n\n")
            
            # Search for content with the keyword
            pattern = re.compile(f"(.{{0,200}}{keyword}.{{0,200}})", re.IGNORECASE)
            matches = pattern.findall(content)
            
            if matches:
                for match in matches:
                    f.write(f"- {match.strip()}\n")
                f.write("\n")
            else:
                f.write(f"Geen specifieke informatie gevonden voor '{keyword}'\n\n")
    
    print(f"Categorie '{category}' opgeslagen in {category_file}")
    return category_file

# Definieer de categorieën en bijbehorende zoekwoorden
categories = {
    "draadsecties": ["draadsectie", "kabel", "geleider", "doorsnede", "mm²"],
    "veiligheidszones": ["veiligheidszone", "zone", "volume", "afstand", "badkamer", "douche"],
    "bescherming": ["bescherming", "differentieel", "aarding", "aardlekschakelaar", "zekering", "automaat"],
    "materialen": ["materiaal", "schakelaar", "stopcontact", "verdeelbord", "kabelgoot"],
    "installatiemethoden": ["installatie", "plaatsing", "montage", "bevestiging", "inbouw", "opbouw"],
    "keuring": ["keuring", "controle", "inspectie", "conformiteit", "gelijkvormigheidscontrole"]
}

# Hoofdfunctie
def main():
    input_file = "/home/ubuntu/arei_website/extracted_content/complete_text.txt"
    output_dir = "/home/ubuntu/arei_website/extracted_categories"
    
    category_files = []
    
    for category, keywords in categories.items():
        category_file = extract_specific_content(input_file, output_dir, category, keywords)
        category_files.append(category_file)
    
    # Maak een index bestand met links naar alle categorieën
    index_file = os.path.join(output_dir, "index.txt")
    with open(index_file, 'w', encoding='utf-8') as f:
        f.write("# AREI 2025 - Geëxtraheerde Categorieën\n\n")
        
        for category in categories.keys():
            f.write(f"- [{category.capitalize()}]({category}.txt)\n")
    
    print(f"Index bestand aangemaakt: {index_file}")

if __name__ == "__main__":
    main()
