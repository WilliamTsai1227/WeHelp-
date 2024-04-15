import csv

# 定义数据
data = [
    ['Name', 'Age', 'City'],
    ['John', 25, 'New York'],
    ['Alice', 30, 'Los Angeles'],
    ['Bob', 28, 'Chicago']
]

# 指定 CSV 文件路径
csv_file_path = 'example.csv'

# 打开 CSV 文件并写入数据
with open(csv_file_path, mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(data)

print("CSV 文件已创建并写入数据。")