import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { Audio } from 'expo-av';

const API_KEY = 'da9f2717c62e383b0185f4f59627e44bcd62a508';

export default function BiblePassageSearch() {
  const [passage, setPassage] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { width } = useWindowDimensions();

  React.useEffect(() => {
    async function initAudio() {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
        });
      } catch (err) {
        console.error('Failed to initialize audio:', err);
      }
    }
    
    initAudio();
  }, []);

  const fetchPassage = async () => {
    if (!passage.trim()) {
      setError('Please enter a Bible passage');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.esv.org/v3/passage/html/?q=${encodeURIComponent(passage)}&include-verse-numbers=false&include-footnotes=false&include-headings=false`,
        {
          headers: {
            'Authorization': `Token ${API_KEY}`
          }
        }
      );

      const data = await response.json();
      if (data.passages && data.passages.length > 0) {
        setResult(data.passages[0]);
        // Also fetch the audio when we get the passage
        fetchAudio();
      } else {
        setError('Passage not found');
      }
    } catch (err) {
      setError('Failed to fetch passage');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAudio = async () => {
    try {
      // Unload any existing sound first
      if (sound) {
        await sound.unloadAsync();
      }

      const audioUrl = `https://audio.esv.org/hw/${encodeURIComponent(passage)}.mp3`;
      
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: false }
      );
      
      setSound(newSound);
    } catch (err) {
      console.error('Error loading audio:', err);
      setError('Failed to load audio');
    }
  };

  const handlePlayPause = async () => {
    if (!sound) return;

    try {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    } catch (err) {
      console.error('Error playing audio:', err);
    }
  };

  React.useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={passage}
        onChangeText={setPassage}
        placeholder="Enter Bible passage (e.g., John 3:16)"
        placeholderTextColor="#666"
      />
      
      <TouchableOpacity 
        style={styles.button}
        onPress={fetchPassage}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Search</Text>
        )}
      </TouchableOpacity>

      <ScrollView style={styles.resultContainer}>
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          result && (
            <RenderHtml
              contentWidth={width}
              source={{ html: result }}
            />
          )
        )}
      </ScrollView>

      {sound && (
        <View style={styles.audioContainer}>
          <TouchableOpacity 
            style={styles.audioButton}
            onPress={handlePlayPause}
          >
            <Text style={styles.audioButtonText}>
              {isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    flex: 1,
    marginBottom: 80, // Add space for the audio player
  },
  error: {
    marginTop: 20,
    color: 'red',
    fontSize: 16,
  },
  audioContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: '#f0f0f0',
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  audioButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 25,
    width: 120,
    alignItems: 'center',
  },
  audioButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 