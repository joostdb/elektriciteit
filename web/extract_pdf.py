import PyPDF2
import os
import re

def extract_pdf_content(pdf_path, output_dir):
    """
    Extract text content from PDF and save to text files.
    Each chapter/section will be saved to a separate file.
    """
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Open the PDF file
    with open(pdf_path, 'rb') as file:
        # Create PDF reader object
        pdf_reader = PyPDF2.PdfReader(file)
        
        # Get number of pages
        num_pages = len(pdf_reader.pages)
        print(f"Totaal aantal pagina's: {num_pages}")
        
        # Extract table of contents first (if available)
        toc_text = "# Inhoudsopgave AREI 2025\n\n"
        
        # Extract text from each page
        all_text = ""
        for page_num in range(num_pages):
            page = pdf_reader.pages[page_num]
            text = page.extract_text()
            if text:
                all_text += text + "\n\n"
                print(f"Pagina {page_num+1}/{num_pages} verwerkt")
        
        # Save complete text for analysis
        with open(os.path.join(output_dir, "complete_text.txt"), "w", encoding="utf-8") as f:
            f.write(all_text)
        
        # Try to identify main sections based on patterns
        # This is a simple approach and might need refinement
        section_pattern = re.compile(r'(Deel|Hoofdstuk|Afdeling)\s+\d+[.:]\s+(.+?)(?=\n|$)')
        sections = section_pattern.findall(all_text)
        
        # Save identified sections
        sections_info = "# Geïdentificeerde secties in AREI 2025\n\n"
        for section_type, section_title in sections:
            sections_info += f"- {section_type}: {section_title.strip()}\n"
        
        with open(os.path.join(output_dir, "sections_overview.txt"), "w", encoding="utf-8") as f:
            f.write(sections_info)
        
        # Extract specific sections relevant for electricians
        relevant_keywords = [
            "draadsectie", "kabel", "veiligheidszone", "materiaal", "installatie", 
            "aansluiting", "spanning", "stroom", "differentieel", "aarding", 
            "equipotentiaal", "bescherming", "keuring", "controle", "huishoudelijk"
        ]
        
        # Search for content with relevant keywords
        relevant_content = "# Relevante inhoud voor elektrotechnische monteurs\n\n"
        for keyword in relevant_keywords:
            pattern = re.compile(f"(.{{0,100}}{keyword}.{{0,100}})", re.IGNORECASE)
            matches = pattern.findall(all_text)
            
            if matches:
                relevant_content += f"## Informatie over '{keyword}'\n\n"
                for match in matches:
                    relevant_content += f"- {match.strip()}\n"
                relevant_content += "\n"
        
        with open(os.path.join(output_dir, "relevant_content.txt"), "w", encoding="utf-8") as f:
            f.write(relevant_content)
        
        print("Extractie voltooid. Bestanden opgeslagen in:", output_dir)

if __name__ == "__main__":
    pdf_path = "/home/ubuntu/upload/AREI-Bijlage-Boek-1-installaties-op-laagspanning-en-op-zeer-lage-spanning-2025.pdf"
    output_dir = "/home/ubuntu/arei_website/extracted_content"
    extract_pdf_content(pdf_path, output_dir)
