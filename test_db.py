import pymysql

try:
    # Mencoba koneksi ke MySQL
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='',
        database='mydb'
    )
    
    print("Berhasil terhubung ke database!")
    
    # Mencoba membuat cursor dan menjalankan query
    with connection.cursor() as cursor:
        cursor.execute("SHOW TABLES")
        tables = cursor.fetchall()
        print("\nTabel yang ada di database:")
        for table in tables:
            print(f"- {table[0]}")
    
    connection.close()
    
except Exception as e:
    print(f"Error: {str(e)}") 