import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Refresh } from '@mui/icons-material';

interface AppSimulatorProps {
  refreshTrigger?: number;
}

export const AppSimulator: React.FC<AppSimulatorProps> = ({ refreshTrigger = 0 }) => {
 const baseUrl = "https://course-booker.vercel.app";

  const [iframeSrc, setIframeSrc] = useState(baseUrl);
  const [iframeKey, setIframeKey] = useState(0);

  const handleRefresh = () => {
    const timestamp = Date.now();
    const separator = baseUrl.includes('?') ? '&' : '?';
    const newUrl = `${baseUrl}${separator}cb=${timestamp}`;

    setIframeSrc(newUrl);
    setIframeKey(prev => prev + 1);
  };

  useEffect(() => {
    if (refreshTrigger > 0) {
      handleRefresh();
    }
  }, [refreshTrigger]);

  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" justifyContent="space-between" width={375} mb={1}>
        <Typography variant="h6">App Simulator (Live)</Typography>
        <Box>
          <Button
            size="small"
            startIcon={<Refresh />}
            onClick={handleRefresh}
            sx={{ textTransform: 'none' }}
          >
            Reload
          </Button>
        </Box>
      </Box>

      <Box sx={{
        width: 375,
        height: 667,
        border: '12px solid #1c1c1c',
        borderRadius: '36px',
        overflow: 'hidden',
        position: 'relative',
        bgcolor: '#fff',
        boxShadow: '0px 20px 40px rgba(0,0,0,0.2)'
      }}>

        <Box sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 150, height: 24, bgcolor: '#1c1c1c', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, zIndex: 20 }} />

        <iframe
          key={iframeKey}
          src={iframeSrc}
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Mobile App"
          allow="cross-origin-isolated"
        />

        <Box sx={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 120, height: 5, bgcolor: '#000', borderRadius: 3, opacity: 0.3, zIndex: 30, pointerEvents: 'none' }} />
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{mt: 2}}>
        Powered by React Native Web
      </Typography>
    </Box>
  );
};