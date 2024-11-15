import pandas as pd
import json
import re

def clean_text(text):
    if isinstance(text, str):
        # 移除 _x000D_ 和其他类似的特殊字符
        text = re.sub(r'_x[0-9A-Fa-f]{4}_', '', text)
    return text

def xls_to_json(xls_file, json_file):
    # 读取Excel文件
    try:
        df = pd.read_excel(xls_file)
    except Exception as e:
        print(f"读取Excel文件时出错: {e}")
        return

    # 清理DataFrame中的每一列
    for column in df.columns:
        df[column] = df[column].apply(clean_text)

    # 将NaN替换为None，确保转换为JSON时不会出错
    df = df.where(pd.notna(df), None)

    # 将DataFrame转换为字典
    data = df.to_dict(orient='records')

    # 将字典写入JSON文件
    try:
        with open(json_file, 'w', encoding='utf-8') as json_f:
            json.dump(data, json_f, ensure_ascii=False, indent=4)
        print(f"成功将Excel转换为JSON文件: {json_file}")
    except Exception as e:
        print(f"写入JSON文件时出错: {e}")

# 使用例子
xls_file = 'database.xlsx'  # Excel文件路径
json_file = 'database.json'  # 输出的JSON文件路径

xls_to_json(xls_file, json_file)
