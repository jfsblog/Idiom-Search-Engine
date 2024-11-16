import pandas as pd

# 讀取 Excel 檔案
input_file = "dict_revised_2015_20240927.xlsx"  # 替換為你的檔案名稱
output_file = "dict_revised_2015_20240927.json"  # 篩選後的輸出檔案名稱

# 使用欄位名稱讀取資料
columns_to_read = ['字詞名', '釋義']  # 根據實際欄位名稱
df = pd.read_excel(input_file, usecols=columns_to_read)

# 篩選「字詞名」的文字數量恰好等於 4 的資料
filtered_df = df[df['字詞名'].apply(lambda x: len(x) == 4)]

# 將篩選結果存成 JSON 檔案
filtered_df.to_json(output_file, orient='records', force_ascii=False, indent=4)

print(f"已成功將篩選結果儲存到 {output_file}")
