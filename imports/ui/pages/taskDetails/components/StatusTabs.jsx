import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function StatusTabs({ tab, onChange, isEditing }) {

  
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
        <Tabs variant="fullWidth" value={tab}
          onChange={(_, newValue) => {
            onChange(newValue)
          }} aria-label="basic tabs example">
          <Tab disabled={!isEditing} label="Cadastrada" />
          <Tab disabled={!isEditing} label="Em andamento" />
          <Tab disabled={!isEditing} label="Concluida" />
        </Tabs>
      </Box>
    </Box>
  );
}
