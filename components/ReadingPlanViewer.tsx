import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { readingPlan } from '../data/readingPlan';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const API_KEY = 'da9f2717c62e383b0185f4f59627e44bcd62a508';

const ReadingPlanViewer: React.FC = () => {
  const [passage, setPassage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const { width } = useWindowDimensions();

  const getCurrentReading = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    // For testing/demo - hardcode to Feb 18
    // const month = 2;
    // const day = 18;

    const reading = readingPlan.find(r => r.month === month && r.day === day);
    return reading?.passage || '';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const fetchPassage = async () => {
    const reading = getCurrentReading();
    if (!reading) return;

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://api.esv.org/v3/passage/html/?q=${encodeURIComponent(reading)}` +
        `&include-verse-numbers=false` +
        `&include-first-verse-numbers=true` +
        `&include-footnotes=false` +
        `&include-headings=false` +
        `&include-passage-references=false`,
        {
          headers: {
            'Authorization': `Token ${API_KEY}`
          }
        }
      );
      const data = await response.json();
      setPassage(data.passages[0] || 'No passage found');
    } catch (err) {
      setError('Failed to fetch passage');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;
    
    setPosition(status.positionMillis);
    setDuration(status.durationMillis ?? 0);
    setIsPlaying(status.isPlaying);
  };

  const playAudio = async () => {
    const reading = getCurrentReading();
    if (!reading) return;

    try {
      if (sound) {
        if (isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
        }
      } else {
        const audioUrl = `https://audio.esv.org/hw/${encodeURIComponent(reading)}.mp3`;
        
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: true },
          onPlaybackStatusUpdate
        );
        
        setSound(newSound);
      }
    } catch (err) {
      console.error('Failed to play audio:', err);
      setError('Failed to play audio');
    }
  };

  const seekAudio = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  const changeSpeed = async () => {
    if (sound) {
      const speeds = [1.0, 1.25, 1.5, 1.75, 2.0];
      const nextSpeed = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
      await sound.setRateAsync(nextSpeed, true);
      setPlaybackSpeed(nextSpeed);
    }
  };

  useEffect(() => {
    fetchPassage();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const currentReading = getCurrentReading();

  return (
    <ScrollView style={styles.container}>
      {/* Date Header */}
      <View style={styles.header}>
        <Text style={styles.dateText}>
          {formatDate(new Date())}
        </Text>
      </View>

      <View style={styles.content}>
        {/* Passage Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {currentReading}
          </Text>
        </View>

        {/* Audio Controls */}
        <View style={styles.audioContainer}>
          <View style={styles.audioControlsRow}>
            <TouchableOpacity 
              onPress={playAudio}
              style={styles.playButton}
            >
              <Ionicons 
                name={isPlaying ? "pause-circle" : "play-circle"} 
                size={32} 
                color="#374151"
              />
              <Text style={styles.playButtonText}>
                {isPlaying ? 'Pause' : 'Play'} Audio
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={changeSpeed}
              style={styles.speedButton}
            >
              <Text style={styles.speedButtonText}>
                {playbackSpeed}x
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.progressContainer}>
            <Text style={styles.timeText}>
              {formatTime(position)}
            </Text>
            <Slider
              style={styles.progressBar}
              minimumValue={0}
              maximumValue={duration}
              value={position}
              onSlidingComplete={seekAudio}
              minimumTrackTintColor="#374151"
              maximumTrackTintColor="#E5E7EB"
              thumbTintColor="#374151"
            />
            <Text style={styles.timeText}>
              {formatTime(duration)}
            </Text>
          </View>
        </View>

        {/* Passage Content */}
        {loading ? (
          <ActivityIndicator size="large" color="#374151" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <RenderHtml 
            contentWidth={width * 0.85}
            source={{ html: passage }}
            tagsStyles={{
              p: {
                fontSize: 16,
                lineHeight: 28,
                marginBottom: 16,
                color: '#374151',
                fontFamily: 'System',
              },
              sup: {
                display: 'none',
              },
            }}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    padding: 24,
  },
  titleContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111',
  },
  audioContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  audioControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  speedButton: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  speedButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 40,
    marginHorizontal: 8,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    width: 40,
    textAlign: 'center',
  },
  error: {
    color: '#ef4444',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default ReadingPlanViewer; 