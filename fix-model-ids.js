/**
 * 自定义模型ID修复脚本
 * 使用方法：在浏览器控制台（F12）中复制粘贴此脚本并运行
 *
 * 修复内容：
 * 1. mistralai/devstral-2-2512:free → mistralai/devstral-2512:free
 * 2. openai/gpt-5.1-codex-max → openai/gpt-5.1
 */

(function() {
    console.log('🔧 开始修复自定义模型ID...');

    // 获取当前的自定义模型配置
    const customModelsStr = localStorage.getItem('custom_models');
    if (!customModelsStr) {
        console.log('❌ 未找到自定义模型配置');
        return;
    }

    let customModels = JSON.parse(customModelsStr);
    console.log('📋 当前自定义模型:', Object.keys(customModels));

    let hasChanges = false;
    const fixes = [];

    // 修复1: mistralai/devstral-2-2512:free → mistralai/devstral-2512:free
    const oldDevstralId = 'mistralai/devstral-2-2512:free';
    const newDevstralId = 'mistralai/devstral-2512:free';

    if (customModels[oldDevstralId]) {
        console.log(`🔄 修复 Devstral 模型ID: ${oldDevstralId} → ${newDevstralId}`);

        // 复制配置到新ID
        customModels[newDevstralId] = {
            ...customModels[oldDevstralId],
            id: newDevstralId,
            name: 'Mistral: Devstral 2 2512 (free)'
        };

        // 删除旧ID
        delete customModels[oldDevstralId];
        hasChanges = true;
        fixes.push(`✅ Devstral: ${oldDevstralId} → ${newDevstralId}`);
    }

    // 修复2: openai/gpt-5.1-codex-max → openai/gpt-5.1
    const oldGPTId = 'openai/gpt-5.1-codex-max';
    const newGPTId = 'openai/gpt-5.1';

    if (customModels[oldGPTId]) {
        console.log(`🔄 修复 GPT-5.1 模型ID: ${oldGPTId} → ${newGPTId}`);

        // 复制配置到新ID
        customModels[newGPTId] = {
            ...customModels[oldGPTId],
            id: newGPTId,
            name: 'OpenAI: GPT-5.1'
        };

        // 删除旧ID
        delete customModels[oldGPTId];
        hasChanges = true;
        fixes.push(`✅ GPT-5.1: ${oldGPTId} → ${newGPTId}`);
    }

    if (!hasChanges) {
        console.log('ℹ️ 未发现需要修复的模型ID，可能已经修复过了');
        return;
    }

    // 保存修复后的配置
    localStorage.setItem('custom_models', JSON.stringify(customModels));
    console.log('💾 已保存修复后的模型配置');

    // 更新selected_models列表
    const selectedModelsStr = localStorage.getItem('selected_models');
    if (selectedModelsStr) {
        let selectedModels = JSON.parse(selectedModelsStr);
        console.log('📋 当前选中模型:', selectedModels);

        // 替换旧ID为新ID
        if (selectedModels.includes(oldDevstralId)) {
            selectedModels = selectedModels.map(id => id === oldDevstralId ? newDevstralId : id);
            console.log(`🔄 更新选中模型列表: ${oldDevstralId} → ${newDevstralId}`);
        }

        if (selectedModels.includes(oldGPTId)) {
            selectedModels = selectedModels.map(id => id === oldGPTId ? newGPTId : id);
            console.log(`🔄 更新选中模型列表: ${oldGPTId} → ${newGPTId}`);
        }

        localStorage.setItem('selected_models', JSON.stringify(selectedModels));
        console.log('💾 已更新选中模型列表');
    }

    // 更新model_usage_stats（如果有的话）
    const statsStr = localStorage.getItem('model_usage_stats');
    if (statsStr) {
        let stats = JSON.parse(statsStr);

        if (stats[oldDevstralId]) {
            stats[newDevstralId] = stats[oldDevstralId];
            delete stats[oldDevstralId];
            console.log(`🔄 迁移使用统计: ${oldDevstralId} → ${newDevstralId}`);
        }

        if (stats[oldGPTId]) {
            stats[newGPTId] = stats[oldGPTId];
            delete stats[oldGPTId];
            console.log(`🔄 迁移使用统计: ${oldGPTId} → ${newGPTId}`);
        }

        localStorage.setItem('model_usage_stats', JSON.stringify(stats));
        console.log('💾 已更新使用统计');
    }

    // 输出修复摘要
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 修复完成！');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    fixes.forEach(fix => console.log(fix));
    console.log('\n📌 修复后的模型列表:', Object.keys(customModels));
    console.log('\n⚠️ 请刷新页面（F5）以应用更改');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // 提示用户刷新
    if (confirm('✅ 模型ID已修复！\n\n点击"确定"刷新页面应用更改')) {
        location.reload();
    }
})();
