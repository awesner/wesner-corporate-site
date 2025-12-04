import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Fab,
  Paper,
  TextField,
  IconButton,
  Typography,
  CircularProgress,
  Avatar,
  Grow
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import { useTranslations } from 'next-intl';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWidget() {
  const router = useRouter();
  const t = useTranslations('chatWidget');

  const [sessionId] = useState(() => 'sess-' + Math.random().toString(36).substr(2, 9));
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: t('greeting') }
  ]);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'assistant') {
      setMessages([{ role: 'assistant', content: t('greeting') }]);
    }
  }, [router.locale]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowWelcome(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowWelcome(false);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages,
          locale: router.locale,
          sessionId: sessionId
        }),
      });

      const data = await response.json();

      const botMessage: Message = {
        role: 'assistant',
        content: data.reply || t('errorConnection')
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: 'assistant', content: t('errorSend') }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 30, right: 30, zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <Grow in={showWelcome && !isOpen}>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            maxWidth: 250,
            cursor: 'pointer',
            bgcolor: 'white',
            borderRadius: 2,
            position: 'absolute',
            bottom: 60,
            right: 60,
            zIndex: 1001,
            mb: 0
          }}
          onClick={toggleChat}
        >
          <IconButton
            size="small"
            sx={{ position: 'absolute', top: 2, right: 2, width: 20, height: 20 }}
            onClick={(e) => {
              e.stopPropagation();
              setShowWelcome(false);
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" fontWeight="bold">👋 {t('header')}</Typography>
          </Box>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {t('welcomeBubble')}
          </Typography>
        </Paper>
      </Grow>

      <Grow in={isOpen} style={{ transformOrigin: 'bottom right' }}>
        <Paper
          elevation={4}
          sx={{
            width: 350,
            height: 500,
            mb: 2,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: 2
          }}
        >
          <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SmartToyIcon />
              <Typography variant="subtitle1" fontWeight="bold">{t('header')}</Typography>
            </Box>
            <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, p: 2, overflowY: 'auto', bgcolor: '#f5f5f5', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  gap: 1
                }}
              >
                {msg.role === 'assistant' && (
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                    <SmartToyIcon fontSize="small" />
                  </Avatar>
                )}
                <Paper
                  sx={{
                    p: 1.5,
                    maxWidth: '80%',
                    bgcolor: msg.role === 'user' ? 'primary.light' : 'white',
                    color: msg.role === 'user' ? 'white' : 'text.primary',
                    borderRadius: 2
                  }}
                >
                  <Box
                    sx={{
                      fontSize: '0.875rem',
                      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                      lineHeight: 1.5,
                      '& p': { m: 0, mb: 1 },
                      '& p:last-child': { mb: 0 },
                      '& ul, & ol': { m: 0, mb: 1, pl: 2.5 },
                      '& li': { mb: 0.5 },
                      '& strong': { fontWeight: 700 },
                      '& h1, & h2, & h3, & h4': {
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        m: 0,
                        mb: 1,
                        mt: 1
                      },
                      '& a': { color: 'inherit', textDecoration: 'underline' }
                    }}
                  >
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </Box>
                </Paper>
              </Box>
            ))}
            {isLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', ml: 5 }}>
                <CircularProgress size={20} />
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          <Box sx={{ p: 2, bgcolor: 'white', borderTop: '1px solid #eee', display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder={t('placeholder')}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              multiline
              maxRows={2}
            />
            <IconButton color="primary" onClick={handleSend} disabled={!input.trim() || isLoading}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Grow>

      <Fab
        color="primary"
        aria-label="chat"
        onClick={toggleChat}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </Fab>
    </Box>
  );
}