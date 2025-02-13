import json

# Define input and output file paths
input_file = "a.txt"  # Change this to your actual file
output_file = "iata_codes.json"

data_dict = {}

# Read the input file and process lines
with open(input_file, "r", encoding="utf-8") as file:
    for line in file:
        words = line.strip().split()
        if len(words) >= 2:  # Ensure the line has at least two words
            key = words[0]
            value = words[1]
            data_dict[key] = value

# Write the dictionary to a JSON file
with open(output_file, "w", encoding="utf-8") as json_file:
    json.dump(data_dict, json_file, indent=4, ensure_ascii=False)

print(f"JSON file '{output_file}' created successfully!")
