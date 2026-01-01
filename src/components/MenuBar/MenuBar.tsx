import React, { useRef } from 'react';
import useStore from '../../store';
import './MenuBar.sass';

function MenuBar() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setNodes = useStore((state) => state.setNodes);
  const setEdges = useStore((state) => state.setEdges);
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  // 新建流程图
  const handleNew = () => {
    if (window.confirm('确定要新建流程图吗？当前未保存的内容将丢失。')) {
      setNodes([]);
      setEdges([]);
    }
  };

  // 打开文件
  const handleOpen = () => {
    fileInputRef.current?.click();
  };

  // 处理文件选择
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const data = JSON.parse(content);
          if (data.nodes && data.edges) {
            setNodes(data.nodes);
            setEdges(data.edges);
          } else {
            alert('文件格式不正确');
          }
        } catch (error) {
          alert('无法解析文件');
        }
      };
      reader.readAsText(file);
    }
    // 重置 input 以便可以再次选择同一文件
    event.target.value = '';
  };

  // 保存文件
  const handleSave = () => {
    const data = {
      nodes,
      edges,
      version: '1.0',
      timestamp: new Date().toISOString(),
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `flowchart-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 导出图片
  const handleExportImage = () => {
    const element = document.querySelector('.react-flow');
    if (!element) {
      alert('无法找到流程图元素');
      return;
    }

    // 简单实现：使用 canvas 绘制并导出
    // 注意：这只是一个基础实现，可能需要根据实际需求调整
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布大小
    const flowElement = element as HTMLElement;
    const rect = flowElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // 填充背景
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 导出为图片
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `flowchart-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 清空画布
  const handleClear = () => {
    if (window.confirm('确定要清空画布吗？所有节点和连线将被删除。')) {
      setNodes([]);
      setEdges([]);
    }
  };

  // 关于
  const handleAbout = () => {
    alert('React Flow Editor v1.0\n\n一个基于 React Flow 的流程图编辑器\n使用 pywebview + React 构建');
  };

  return (
    <div className="menu-bar">
      <div className="menu-group">
        <button className="menu-button">文件</button>
        <div className="menu-dropdown">
          <div className="menu-item" onClick={handleNew}>新建</div>
          <div className="menu-item" onClick={handleOpen}>打开</div>
          <div className="menu-item" onClick={handleSave}>保存</div>
          <div className="menu-item" onClick={handleExportImage}>导出图片</div>
        </div>
      </div>

      <div className="menu-group">
        <button className="menu-button">编辑</button>
        <div className="menu-dropdown">
          <div className="menu-item" onClick={handleClear}>清空画布</div>
        </div>
      </div>

      <div className="menu-group">
        <button className="menu-button">帮助</button>
        <div className="menu-dropdown">
          <div className="menu-item" onClick={handleAbout}>关于</div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default MenuBar;
