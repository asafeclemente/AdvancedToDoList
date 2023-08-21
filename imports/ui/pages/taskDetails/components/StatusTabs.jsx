import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function StatusTabs({ tab, onChange, isEditing }) {

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
        <Tabs variant="fullWidth" value={tab ? tab : 0}
          onChange={(_, newValue) => {
            onChange(newValue)
          }} aria-label="basic tabs example">
          <Tab label="Cadastrada" />
          <Tab disabled={tab == 2} label="Em andamento" />
          <Tab disabled={tab == 0} label="Concluida" />
        </Tabs>
      </Box>
    </Box>
  );
}
