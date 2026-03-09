import React, { useState } from 'react'
import { Content, Tab, TabsWrapper } from './index.styles';

export default function CustomTabs({ active, counts = {} }) {
  const [activeTab, setActiveTab] = useState("inprogress");

  const tabs = [
    { label: "Inprogress", count: counts.inprogress || 0, key: "inprogress" },
    { label: "Completed Orders", count: counts.completed || 0, key: "completed" },
    { label: "Cancelled", count: counts.cancelled || 0, key: "cancelled" },
  ];

  const handleChange = (tab) => {
    setActiveTab(tab.key)
    active(tab.key)
  }
  return (
    <div>
      <TabsWrapper>
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            active={activeTab === tab.key}
            onClick={() => { handleChange(tab) }}
          >
            {tab.label} ({tab.count})
          </Tab>
        ))}
      </TabsWrapper>
    </div>
  );
}
