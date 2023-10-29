import csv
import sqlite3

# CSV file path
csv_file_path = r"H:\Shared drives\repos\database\SQLite\relationship-assembly-material-clean.csv"

# SQLite database path
db_path = "buildsystems.db"

# SQLite table name
table_name = "layer"

# Connect to SQLite Database
conn = sqlite3.connect(db_path)
db = conn.cursor()

# This part is to create the table in the db. It is a comment because I had to also add FOREIGN KEY manually
# # Open CSV file with semicolon delimiter to read headers
# with open(csv_file_path, 'r', newline='', encoding='utf-8') as csv_file:
#     csv_reader = csv.reader(csv_file, delimiter=';')
#     headers = next(csv_reader)  # Read the first row as headers

#     # Create the table based on CSV headers
#     create_table_query = f"CREATE TABLE IF NOT EXISTS {table_name} ({', '.join([f'{header} TEXT' for header in headers])})"
#     db.execute(create_table_query)
#     conn.commit()

# Read CSV and insert data into SQLite table
with open(csv_file_path, 'r', newline='', encoding='utf-8') as csv_file:
    csv_reader = csv.DictReader(csv_file, delimiter=";")  # Read rows as dictionaries based on headers

    for row in csv_reader:
        # Prepare column names and values for insertion
        columns = ', '.join(row.keys())
        values = ', '.join(['?'] * len(row))
        
        # Insert data into SQLite table
        insert_query = f"INSERT INTO {table_name} ({columns}) VALUES ({values})"
        print(insert_query)
        db.execute(insert_query, list(row.values()))
    conn.commit()

# Close Connection
conn.close()

print("Data transfer complete!")
