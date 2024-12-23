let idioms = [];

// 加載JSON數據
const loadJSON = () => {
    fetch('dict_revised_2015_20240927.json')
        .then(response => response.json())
        .then(data => {
            // 假設每個條目有 "成語", "釋義", 和 "ID" 屬性
            idioms = data.map(row => ({
                idiom: row['字詞名'],
                definition: row['釋義'],
            }));
            console.log("已加載成語：", idioms);
        })
        .catch(error => console.error('讀取JSON文件出錯:', error));
};

// 根據輸入顯示匹配的結果
const showResults = () => {
    const inputs = [
        document.getElementById('input1').value,
        document.getElementById('input2').value,
        document.getElementById('input3').value,
        document.getElementById('input4').value
    ];

    // 檢查所有輸入框是否都為空
    if (inputs.every(input => input === "")) {
        document.getElementById('resultsTable').style.display = 'none';
        document.getElementById('statisticsText').style.display = 'none';

        // 如果輸入框為空，確保 h1 顯示
        const heading = document.querySelector('h1');
        heading.style.display = 'block'; // 顯示 h1

        const info = document.getElementById('info');
        info.style.display = 'block';

        return; // 如果都為空，則不顯示結果
    }

    // 篩選出符合條件的成語
    let filteredResults = idioms.filter(idiom => {
        // 檢查每個輸入框中的文字是否與成語相對應位置的字匹配
        return inputs.every((input, index) => {
            return input === "" || idiom.idiom[index] === input;
        });
    });

    // 顯示筆數統計
    const statisticsText = document.getElementById('statisticsText');
    statisticsText.textContent = `找到 ${filteredResults.length} 筆成語`;
    statisticsText.style.display = ''; // 顯示 span

    // 顯示表格
    const resultsBody = document.getElementById('resultsBody');
    const resultsTable = document.getElementById('resultsTable');
    resultsBody.innerHTML = ''; // 清空表格中的舊結果
    resultsTable.style.display = 'table'; // 顯示表格

    // 處理結果顯示：將成語和其釋義顯示在表格中
    filteredResults.forEach(idiom => {
        const definition = idiom.definition.split('\n')[0];

        // 創建超連結
        const link = `<a href="https://dict.revised.moe.edu.tw/search.jsp?md=1&word=${idiom.idiom}" target="_blank">${idiom.idiom}</a>`;

        const row = document.createElement('tr');
        row.innerHTML = `<td>${link}</td><td>${definition}</td>`;
        resultsBody.appendChild(row);
    });

    // 判斷 filteredResults 的長度，顯示或隱藏 h1
    const heading = document.querySelector('h1');
    if (filteredResults.length >= 1) {
        heading.style.display = 'none'; // 隱藏 h1
        info.style.display = 'none';
    } else {
        heading.style.display = 'block'; // 顯示 h1
        info.style.display = 'block';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const showInstructionsButton = document.getElementById('showInstructions');
    const instructionsBlock = document.getElementById('instructionsBlock');
    const closeInstructionsButton = document.getElementById('closeInstructions');

    if (!showInstructionsButton || !instructionsBlock || !closeInstructionsButton) {
        console.error("無法找到按鈕或操作說明區塊！");
        return;
    }

    // 點擊「操作說明」顯示區塊
    showInstructionsButton.addEventListener('click', (event) => {
        event.preventDefault(); // 阻止超鏈接的默認行為
        instructionsBlock.style.display = 'block'; // 顯示操作說明區塊
    });

    // 點擊「關閉」隱藏區塊
    closeInstructionsButton.addEventListener('click', (event) => {
        event.preventDefault(); // 阻止超鏈接的默認行為
        instructionsBlock.style.display = 'none'; // 隱藏操作說明區塊
    });
});

// 綁定輸入框的事件
document.getElementById('input1').addEventListener('input', showResults);
document.getElementById('input2').addEventListener('input', showResults);
document.getElementById('input3').addEventListener('input', showResults);
document.getElementById('input4').addEventListener('input', showResults);

// 頁面加載時自動加載 JSON
window.onload = loadJSON;
