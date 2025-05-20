import React, { useState } from 'react'
import { Content, Tab, TabsWrapper } from './index.styles';

export default function CustomTabs() {
    const [activeTab, setActiveTab] = useState("inprogress");

  const tabs = [
    { label: "Inprogress", count: 0, key: "inprogress" },
    { label: "Completed Orders", count: 3, key: "completed" },
    { label: "Cancelled", count: 3, key: "cancelled" },
  ];
 return (
    <div>
      <TabsWrapper>
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            active={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label} ({tab.count})
          </Tab>
        ))}
      </TabsWrapper>
    </div>
  );
}
